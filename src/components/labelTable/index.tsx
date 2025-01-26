"use client";
import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR, { mutate } from "swr";
import { Container } from "@mui/material";
import SkeletonTable from "@/components/skeletonTable";
import { fetcher } from "@/utils/lib/fetcher";
import LabelLogo from "../logo";
import { iLabelInfo } from "@/type/labelType";

interface iTable {
  selectItem: (selectLabelInfo: iLabelInfo) => void;
  apiMyLabelUrl: string;
  isLabelUpdated: boolean;
}

const BarCodeInfoTable: FC<iTable> = (prop) => {
  const { data: labelData, error: labelError } = useSWR(
    prop.apiMyLabelUrl,
    fetcher
  );

  prop.isLabelUpdated && mutate(prop.apiMyLabelUrl);
  const labelSelect = (id: number) => {
    // Trigger the parent callback with the selected label info
    const selectedInfo = labelData.find((item: iLabelInfo) => item.id === id);
    if (selectedInfo) {
      prop.selectItem(selectedInfo); // Now this can access the correct label info
    }
  };

  if (labelError)
    return <Container>Failed to load: {labelError.message}</Container>;

  if (!labelData || !Array.isArray(labelData))
    return (
      <Container>
        <SkeletonTable />
      </Container>
    );

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        height: "auto",
        width: "100%",
        background: "#bcbcbc1A",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "#bcbcbc80" }}>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Id
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Item Code
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Logo
            </TableCell>
            <TableCell align="center" sx={{ width: "100px", padding: 1 }}>
              Product_EN
            </TableCell>
            <TableCell align="center" sx={{ width: "100px", padding: 1 }}>
              Product_ZH
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Weight
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Case
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Storage
            </TableCell>
            <TableCell align="center" sx={{ width: "75px", padding: 1 }}>
              Shelf Life
            </TableCell>
            <TableCell align="center" sx={{ width: "75px", padding: 1 }}>
              Case Gtin
            </TableCell>
            <TableCell align="center" sx={{ width: "150px", padding: 1 }}>
              Ingredient Information
            </TableCell>
            <TableCell align="center" sx={{ width: "150px", padding: 1 }}>
              Manufactured For
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Label Temp
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labelData && Array.isArray(labelData) ? (
            labelData.map((row: iLabelInfo) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { background: "#bcbcbc40", cursor: "pointer" },
                }}
                onClick={() => labelSelect(row.id)}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ width: "50px", padding: 1 }}
                >
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.item_code}</TableCell>
                <TableCell align="left">
                  <LabelLogo logo={row.logo} fontSize={18} />
                </TableCell>
                <TableCell align="left" sx={{ width: "50px" }}>
                  {row.product_name_en}
                </TableCell>
                <TableCell align="left" sx={{ width: "50px" }}>
                  {row.product_name_zh}
                </TableCell>
                <TableCell align="left" sx={{ padding: 1, width: "50px" }}>
                  {row.weight}
                </TableCell>
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.case_quantity} {row.case_unit}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "50px",
                    whiteSpace: "balance",
                    textWrap: "balance",
                    wordBreak: "break-word",
                    padding: 1,
                  }}
                >
                  {row.storage}
                </TableCell>
                <TableCell align="left" sx={{ padding: 1, width: "50px" }}>
                  {row.shelf_life} days
                </TableCell>
                <TableCell align="left" sx={{ width: "75px", padding: 1 }}>
                  {row.case_gtin}
                </TableCell>
                <TableCell align="left" sx={{ width: "250px", padding: 1 }}>
                  {row.ingredient&&row.ingredient.slice(0,75)+" ..."}
                </TableCell>
                <TableCell align="left" sx={{ width: "150px", padding: 1 }}>
                  {row.manufactured}
                </TableCell>
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.label_temp}
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

export default BarCodeInfoTable;
