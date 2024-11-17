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
import { colorTheme } from "@/theme";
import packageInfo from "../../../package.json";
import InactivityLogoutTimer from "@/utils/lib/autoLogout";

const SideBar = () => {
  const links = useMemo(
    () => ["", "add-new", "mylabels", "roles", "setting"],
    []
  );
  InactivityLogoutTimer();
  const pathname = usePathname();
  const { data: userData } = useSession();
  const version = packageInfo.version;
  const color = (link: string) => {
    if (pathname === "/dashboard" && link === "") {
      return "#000000"; // Black for dashboard with no link
    } else if (pathname === "/dashboard/" + link) {
      return "#000000"; // Black for dashboard with specific link
    } else {
      return "#bcbcbc"; // Gray for other cases
    }
  };

  return (
    <Container
      background={
        userData?.user.role === "admin"
          ? colorTheme.admin.main
          : colorTheme.user.main
      }
    >
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
      </MenuWrapper>
      <Button
        sx={{ width: "100%" }}
        onClick={() =>
          signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/signin` })
        }
      >
        Sign Out
      </Button>
      <Typography width="100%" textAlign="center" color="#bcbcbc">
        Version : {version}
      </Typography>
    </Container>
  );
};

export default SideBar;
