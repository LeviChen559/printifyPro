"use client";
import React, { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR, { mutate } from "swr";
import { Button, Container } from "@mui/material";
import SkeletonTable from "@/components/skeletonTable";
import { fetcher } from "@/utils/lib/fetcher";
import Checkbox from "@mui/material/Checkbox";
// import { useRouter } from "next/navigation";
import axios from "axios";

export interface iUser {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  created_at: string;
}

interface iProps {
  setDataUpdate: (dataUpdate: boolean) => void;
  handleUserUpdate: (id: number) => void;
  updateUserId?: number | null;
  setUpdateUserId: (id: number | null) => void;
  // selectItem: (selectLabelInfo: iUser) => void;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const UserTable: FC<iProps> = ({
  setDataUpdate,
  handleUserUpdate,
  updateUserId,
  setUpdateUserId,
}) => {
  // const router = useRouter();
  const [checked, setChecked] = useState<{ id: number; checked: boolean }>({
    id: -1,
    checked: false,
  });
  const { data: usersData, error: userError } = useSWR(
    "/api/prisma/getUsers",
    fetcher
  );
  const selectUpdate = (id: number) => {
    setUpdateUserId(id);

    handleUserUpdate(id);
  };
  const handleUserDelete = async (id: number) => {
    try {
      const res = await axios.delete("/api/prisma/modifyUser", {
        method: "DELETE",
        data: { id },
      });
      if (res.status === 200) {
        setTimeout(() => {
          setDataUpdate(true);
          mutate("/api/prisma/getUsers");
          setChecked({ id: -1, checked: false });
          window.location.reload();
        }, 1000);
        setTimeout(() => {
          setDataUpdate(false);
        }, 2000);
      } else {
        console.error("Failed to delete user:", res);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (userError)
    return <Container>Failed to load: {userError.message}</Container>;

  if (!usersData)
    return (
      <Container>
        <SkeletonTable columnCount={5} />
      </Container>
    );

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 2, height: "auto", width: "100%", maxWidth: 1200 }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "#bcbcbc80" }}>
            <TableCell
              align="center"
              sx={{ width: "20px", padding: 1 }}
            ></TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Id
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Email
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Name
            </TableCell>
            {/* <TableCell align="center" sx={{ width: "100px", padding: 1 }}>
              Password
            </TableCell> */}
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Role
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Create Date
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData ? (
            usersData.map((row: iUser) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { background: "#bcbcbc40", cursor: "pointer" },
                  background:
                    row.id === checked.id && checked.checked
                      ? "#bcbcbc40"
                      : "inherit",
                }}
              >
                <TableCell
                  align="center"
                  sx={{ width: "20px", padding: 1 }}
                  onClick={() => {
                    if (checked.id === row.id && checked.checked) {
                      setChecked({ id: -1, checked: false }); // Deselect if already checked
                    } else {
                      setChecked({ id: row.id, checked: true }); // Select this row
                    }
                  }}
                >
                  <Checkbox
                    {...label}
                    sx={{ padding: 0 }}
                    checked={checked.id === row.id && checked.checked}
                    onChange={() => {
                      if (checked.id === row.id && checked.checked) {
                        setChecked({ id: -1, checked: false }); // Deselect if already checked
                      } else {
                        setChecked({ id: row.id, checked: true }); // Select this row
                      }
                    }}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ width: "50px", padding: 1 }}
                >
                  {row.id}
                </TableCell>

                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.email}
                </TableCell>
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.name}
                </TableCell>
                {/* <TableCell align="left" sx={{ width: "200px",textWrap:"pretty",wordBreak:"break-all" }}>
                  <Typography>{row.password}</Typography>
                </TableCell> */}
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.role}
                </TableCell>

                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {new Date(row.created_at).toISOString().split("T")[0]}
                </TableCell>
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.id === checked.id && checked.checked ? (
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => {
                        // handle delete
                        handleUserDelete(checked.id);
                      }}
                    >
                      delete
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color={updateUserId === row.id ? "secondary" : "primary"}
                      size="small"
                      sx={{ color: updateUserId === row.id ? "#333" : "#fff" }}
                      onClick={() => {
                        // handle delete
                        selectUpdate(row.id);
                      }}
                    >
                      Update
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <SkeletonTable />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
