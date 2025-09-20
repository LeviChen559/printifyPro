"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "../style";
import { AdminPage } from "./style";
import UserUpdateForm from "@/section/updateUserForm";
import { iUpdateFormData, USERTYPE } from "@/app/type";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import bcrypt from "bcryptjs";
import useSWR,{ mutate } from "swr";
import { useRouter } from "next/navigation";
import UserTable, { iUser } from "@/components/userTable";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import UserState from "@/components/userState";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const AdminDashboard = () => {
  // Log the data to check its structure
  const { data: session } = useSession();

  const [formData, setFormData] = useState<iUpdateFormData>({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);
  const [updateUserId, setUpdateUserId] = useState<number | null>(null);

  const addUserData = async (
    event: React.FormEvent,
    formData: iUpdateFormData
  ) => {
    event.preventDefault();
    let hashedPassword;
    // Only hash the password if it is provided
    if (formData.password) {
      hashedPassword = await bcrypt.hash(formData.password, 10);
    }
    try {
      // Send API request to update the user data
      const res = await axios.post("/api/prisma/modifyUser", {
        method: "POST",
        id: session?.user.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: hashedPassword,
      });
      // const updatedUser = res.data.data;
      // if (session) {
      //   await update({
      //     ...session,
      //     user: {
      //       ...session.user,
      //       email: updatedUser.email,
      //       name: updatedUser.name,
      //     },
      //   });
      // }
      if (res.status === 201) {
        // Update the session with the latest data
        setDataUpdate(true);
        setTimeout(() => {
          setDataUpdate(false);
          setFormData({ email: "", password: "", name: "", role: "" });
          router.refresh();
        }, 1000);
      } else {
        console.error("Update failed:", res);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const updateUserData = async (
    event: React.FormEvent,
    formData: iUpdateFormData
  ) => {
    event.preventDefault();
    let hashedPassword;
    // Only hash the password if it is provided
    if (formData.password) {
      hashedPassword = await bcrypt.hash(formData.password, 10);
    }
    try {
      // Send API request to update the user data
      const res = await axios.put("/api/prisma/modifyUser", {
        method: " PUT",
        id: updateUserId,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: hashedPassword,
      });
      // const updatedUser = res.data.data;
      // if (session) {
      //   await update({
      //     ...session,
      //     user: {
      //       ...session.user,
      //       email: updatedUser.email,
      //       name: updatedUser.name,
      //     },
      //   });
      // }
      if (res.status === 200) {
        // Update the session with the latest data
        setDataUpdate(true);
        mutate("/api/prisma/getUsers");
        setTimeout(() => {
          setDataUpdate(false);
          setFormData({ email: "", password: "", name: "", role: "" });
          setUpdateUserId(null);
        }, 1000);
      } else {
        console.error("Update failed:", res);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const { data: usersData, error } = useSWR("/api/prisma/getUsers", fetcher);

  // Log the data to check its structure
  const { data: userData, status } = useSession();
  const router = useRouter();

  const handleUserUpdate = (id: number) => {
    setUpdateUserId(id);
    // Find the user by ID from the fetched user data
    const userToUpdate =
      usersData && usersData.find((user: iUser) => user.id === id);
    if (userToUpdate) {
      setFormData({
        email: userToUpdate.email,
        password: "",
        name: userToUpdate.name,
        role: userToUpdate.role,
      });
    }
  };
  useEffect(() => {
    if (updateUserId === null) {
      setFormData({ email: "", password: "", name: "", role: "" });
    }
  }, [updateUserId]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

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

  if (session.user.role !== (USERTYPE.admin as string)) {
    return (
      <Container>
        <CircularProgress />
        <Typography>
          No access - You need to be an admin to view this page!
        </Typography>
      </Container>
    );
  }

  if (status === "loading") {
    return (
      <Container>
        <CircularProgress />
        <p>Checking authentication...</p>
      </Container>
    );
  }

  if (status === "unauthenticated") {
    return <Container>No access - You need to sign in first!</Container>;
  }

  if (error) return <Container>Failed to load: {error.message}</Container>;

  if (!userData) {
    return (
      <Container>
        <CircularProgress />
        <Typography>No access - You need to sign in first!</Typography>
      </Container>
    );
  }

  if (userData.user?.role !== "admin") {
    setTimeout(() => {
      router.push("/dashboard/mylabels");
    }, 1000);
    return (
      <Container>
        <Typography>
          No access - You need to be an admin to create labels!
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Suspense
        fallback={
          <Skeleton variant="rectangular" sx={{ height: 100, width: "100%" }} />
        }
      >
        {userData ? (
          <UserState userData={userData} />
        ) : (
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100%" }} />
        )}
      </Suspense>
      <AdminPage>
        <UserTable
          setDataUpdate={setDataUpdate}
          handleUserUpdate={handleUserUpdate}
          updateUserId={updateUserId}
          setUpdateUserId={setUpdateUserId}
        />
        {updateUserId===null  ? (
          <UserUpdateForm
            type="add"
            formData={formData}
            setFormData={setFormData}
            onSubmit={(event) => addUserData(event, formData)}
          />
        ) : (
          <UserUpdateForm
            type="update"
            formData={formData}
            setFormData={setFormData}
            setUpdateUserId={setUpdateUserId}
            onSubmit={(event) => updateUserData(event, formData)}
          />
        )}
      </AdminPage>
    </Container>
  );
};

export default AdminDashboard;
