"use client";
import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR from "swr";
import { Container } from "@mui/material";
import SkeletonTable from "@/components/skeletonTable";

export interface iActivety {
  id: number;
  event: string;
  username: string;
  label_code: string;
  role: string;
  created_at: string;
}

interface iProps {
  // selectItem: (selectLabelInfo: iUser) => void;
}

const ActivitiesTable: FC<iProps> = () => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

  const { data: userData, error: userError } = useSWR(
    "/api/prisma/getActivties",
    fetcher
  );
  // const labelSelect = (id: number) => {
  //   // Trigger the parent callback with the selected label info
  //   const selectedInfo = userData.find((item: iUser) => item.id === id);

  //   if (selectedInfo) {
  //     prop.selectItem(selectedInfo); // Now this can access the correct label info
  //   }
  // };

  if (userError)
    return <Container>Failed to load: {userError.message}</Container>;

  if (!userData)
    return (
      <Container>
        <SkeletonTable columnCount={5}/>
      </Container>
    );
 
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, height: "auto",width:"auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "#bcbcbc80" }}>
            <TableCell align="center" sx={{ width: "auto", padding: 1 }}>
              Id
            </TableCell>
            <TableCell align="center" sx={{ width: "auto", padding: 1 }}>
              Label
            </TableCell>
            <TableCell align="center" sx={{ width: "auto", padding: 1 }}>
              Event
            </TableCell>
            <TableCell align="center" sx={{ width: "auto", padding: 1 }}>
              Create Date
            </TableCell>
            <TableCell align="center" sx={{ width: "100px", padding: 1 }}>
              User Name
            </TableCell>
            <TableCell align="center" sx={{ width: "100px", padding: 1 }}>
              Role
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData ? (
            userData.map((row: iActivety) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { background: "#bcbcbc40", cursor: "pointer" },
                }}
                // onClick={() => labelSelect(row.id)}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ width: "auto" }}
                >
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.label_code}</TableCell>
                <TableCell align="left"sx={{ width: "auto", }}>{row.event}</TableCell>
                <TableCell align="left">
                  {new Date(row.created_at).toLocaleDateString()+" -- "+new Date(row.created_at).toLocaleTimeString()}
                </TableCell>
                <TableCell align="left" sx={{ width: "auto", }}>
                  {row.username}
                </TableCell>
                <TableCell align="left" sx={{ width: "auto", }}>
                  {row.role}
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

export default ActivitiesTable;
