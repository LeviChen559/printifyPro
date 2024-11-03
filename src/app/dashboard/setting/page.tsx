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
import bcrypt from "bcryptjs";

const Setting = () => {
  // Log the data to check its structure
  const { data: session, update } = useSession();

  const [formData, setFormData] = useState<iUpdateFormData>({
    email: "",
    password: "",
    name: "",
  });
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);

  const updateUserData = async (event: React.FormEvent, formData: iUpdateFormData) => {
    event.preventDefault();
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
        setDataUpdate(true);
        const updatedUser = res.data.data;
        if (session) {
          await update({
            ...session,
            user: {
              ...session.user,
              email: updatedUser.email,
              name: updatedUser.name,
            },
          });
        }
        setTimeout(() => {
          setDataUpdate(false);
        }, 1000);
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
        onSubmit={(event) => updateUserData(event,formData)}
      />
    </Container>
  );
};

export default Setting;
