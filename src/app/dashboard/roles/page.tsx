"use client";
import useSWR from "swr";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "../style";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import UserTable from "@/components/userTable";
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
  const {  error } = useSWR("/api/prisma/getUsers", fetcher);

  // Log the data to check its structure
  const { data:userData,status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

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
            <Skeleton
              variant="rectangular"
              sx={{ height: 100, width: "100%" }}
            />
          }
        >
          {userData ? (
            <UserState userData={userData} />
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100%" }} />
          )}
        </Suspense>
      <UserTable />
    </Container>
  );
};

export default AdminDashboard;
