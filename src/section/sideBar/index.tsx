"use client";
import React, { useMemo } from "react";
import { Container, MenuWrapper } from "./style";
import { Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { kanit } from "@/theme";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const links = useMemo(
    () => ["", "add-new", "mylabels", "roles", "setting"],
    []
  );
  const pathname = usePathname();
  const { data: userData } = useSession();

  const color = (link: string) => {
    if (pathname === "/dashboard" && !pathname.includes(link)) {
      return "#000000"; // Black for dashboard with no link
    } else if (pathname === "/dashboard/" + link) {
      return "#000000"; // Black for dashboard with specific link
    } else {
      return "#bcbcbc"; // Gray for other cases
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 1,
          margin: "16px 0",
        }}
      >
        <LocalPrintshopIcon />{" "}
        <Typography variant="h5" fontFamily={kanit.style.fontFamily}>
          Printify Pro
        </Typography>
      </Box>
      <MenuWrapper>
        {links.map((link: string, index: number) => (
          <Link
            href={
              userData?.user.role === "user"
                ? index === 2
                  ? "/dashboard/" + link
                  : ""
                : "/dashboard/" + link
            }
            key={index}
          >
            <Typography
              variant="body1"
              sx={{
                paddingLeft: 1,
                textTransform: "capitalize",
                color: color(link),
              }}
            >
              {index === 0 ? "Dashboard" : link}
            </Typography>
          </Link>
        ))}
        <Button
          onClick={() =>
            signOut({ callbackUrl: "https://pritify-pro.vercel.appsignin" })
          }
        >
          Sign Out
        </Button>
      </MenuWrapper>
    </Container>
  );
};

export default SideBar;
