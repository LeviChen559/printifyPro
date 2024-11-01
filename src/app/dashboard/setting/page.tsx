"use client";

import React, { useState } from "react";
import { useSession,signOut } from "next-auth/react";
import { Container } from "../style";
import UserCard from "@/components/userCard";
import UserUpdeForm from "@/section/updateUserForm";
import { iUpdateFormData } from "@/app/type";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import bcrypt  from'bcryptjs';
import { useRouter } from "next/navigation";

const Setting = () => {
  // Log the data to check its structure
  const { data: session, update } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<iUpdateFormData>({
    email: "",
    password: "",
    name: "",
  });
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);


  const updateUserData = async (formData: iUpdateFormData) => {
    let hashedPassword;
  // Only hash the password if it is provided
  if (formData.password) {
    hashedPassword = await bcrypt.hash(formData.password, 10);
  }
    try {
      
      // Send API request to update the user data
      const res = await axios.patch("/api/prisma/updateUser", {
        id: session?.user.id,
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
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
        await signOut();
        router.push("/signin")
      } else {
        console.error("Update failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (dataUpdate) {
    return (
      <Container>
        <CircularProgress />
        <Typography>User data updated successfully!</Typography>
      </Container>
    );
  }
  if (!session) {
    return (
      <Container>
        <CircularProgress />
        <Typography>No access - You need to sign in first!</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <UserCard
        role={session.user.role}
        name={session.user.name}
        email={session.user.email as string}
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
