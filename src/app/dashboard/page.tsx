"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import ActivtiesTable from "@/components/activitiesTable";
import UserState from "@/components/userState";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";



const AdminDashboard = () => {
 

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
      <ActivtiesTable />
    </Container>
  );
};

export default AdminDashboard;
