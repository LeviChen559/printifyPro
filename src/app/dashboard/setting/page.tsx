"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Container } from "../style";
import UserCard from "@/components/userCard";
import UserUpdeForm from "@/section/updateUserForm";
import { iUpdateFormData } from "@/app/type";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import bcrypt  from'bcryptjs';
const Setting = () => {
  // Log the data to check its structure
  const { data: session, update } = useSession();

  const [formData, setFormData] = useState<iUpdateFormData>({
    email: "",
    password: "",
    name: "",
  });
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);


  const updateUserData = async (formData: iUpdateFormData) => {
    const hashPassword = await bcrypt.hash(formData.password, 10);
    try {
      // Send API request to update the user data
      const res = await axios.patch("/api/updateUser", {
        id: session?.user.id,
        name: formData.name,
        email: formData.email,
        password: formData.password&&hashPassword,
      });
  
      if (res.status === 200) {
        // Update the session with the latest data
        console.log("res.data", res.data.user[0]);
        const updatedUser = res.data.user[0];
            if (session) {
                await  update({
                  user: {
                    ...session.user,
                    email:updatedUser.email,
                    name:updatedUser.name,
                  }
                }) ;
            }
        // Set data update status to true and reset it after 2 seconds
        setDataUpdate(true);
        setTimeout(() => {
          setDataUpdate(false);
        }, 300);
      } else {
        console.error("Update failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  console.log("sessionName", session?.user.name);
  if (!session) {
    return (
      <Container>
        <CircularProgress />
        <Typography>No access - You need to sign in first!</Typography>
      </Container>
    );
  }
  if (dataUpdate) {
    return (
      <Container>
        <CircularProgress />
        <Typography>Updating...</Typography>
      </Container>
    );
  }

console.log("session", session);
  return (
    <Container>
      <UserCard
        role={session.user.role}
        name={session.user.name}
        email={session.user.email}
      />
      <UserUpdeForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => updateUserData(formData)}
      />
    </Container>
  );
};

export default Setting;
