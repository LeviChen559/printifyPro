"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";



const AdminDashboard = () => {
 

  // Log the data to check its structure
  const { status } = useSession();
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
      { <Typography variant="h2">Welcome to Dashboard</Typography>}
    </Container>
  );
};

export default AdminDashboard;
