"use client";
import useSWR from "swr";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Container } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const AdminDashboard = () => {
  const { data, error } = useSWR("/api/getMyLabels", fetcher);

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

  if (error) return <Container>Failed to load: {error.message}</Container>;

  return (
    <Container>
      {!data ? <CircularProgress /> : <Typography variant="h2">Welcome to Dashboard</Typography>}
    </Container>
  );
};

export default AdminDashboard;
