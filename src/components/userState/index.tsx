import React from "react";
import { Typography, Box } from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";

const UserState = ({
  userData,
}: {
  userData: { user: { name: string; role: string } };
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        gap: 1,
      }}
    >
      {userData?.user.role === "admin" ? (
        <SupervisorAccountIcon />
      ) : (
        <PersonIcon />
      )}
      <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
        {userData?.user?.name + " / "}
      </Typography>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          textTransform: "capitalize",
        }}
      >
        {userData?.user.role}
      </Typography>
    </Box>
  );
};

export default UserState;
