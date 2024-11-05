"use client";
import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR,{mutate} from "swr";
import { Container } from "@mui/material";
import SkeletonTable from "@/components/skeletonTable";

export interface iLabelInfo {
  id: number;
  item_code: string;
  product_name_en: string;
  product_name_zh: string;
  weight: number;
  weight_unit: string;
  case_quantity: number;
  case_unit: string;
  storage_requirements: string;
  shelf_life: string;
  case_gtin: string;
  ingredient_info: string;
}

interface iTable {
  selectItem: (selectLabelInfo: iLabelInfo ) => void;
  apiMyLabelUrl: string;
  isLabelUpdated:boolean;
}

const BarCodeInfoTable: FC<iTable> = (prop) => {

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

  const { data: labelData, error: labelError } = useSWR(
    prop.apiMyLabelUrl,
    fetcher
  );
  prop.isLabelUpdated&& mutate(prop.apiMyLabelUrl);
  const labelSelect = (id: number) => {
    // Trigger the parent callback with the selected label info
    const selectedInfo = labelData.find((item:iLabelInfo) => item.id === id);
    console.log("selectedInfo",selectedInfo)
    if (selectedInfo) {
      prop.selectItem(selectedInfo); // Now this can access the correct label info
    }
  };

  if (labelError)
    return <Container>Failed to load: {labelError.message}</Container>;

  if(!labelData) return <Container><SkeletonTable /></Container>

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2,height:"auto",width:"100%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "#bcbcbc80" }}>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Id
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Item Code
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
              Case Size
            </TableCell>
            <TableCell align="center" sx={{ width: "100px", padding: 1 }}>
              Storage
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Shelf Life
            </TableCell>
            <TableCell align="center" >Case Gtin</TableCell>
            <TableCell align="center" sx={{ width: "200px", padding: 1 }}>Ingredient Information</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labelData ? (
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
                  sx={{ width: "50px" }}
                >
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.item_code}</TableCell>
                <TableCell align="left">{row.product_name_en}</TableCell>
                <TableCell align="left">{row.product_name_zh}</TableCell>
                <TableCell align="left">{row.weight}  {row.weight_unit}</TableCell>
          
                <TableCell align="left" sx={{ width: "50px" }}>
                  {row.case_quantity}  {row.case_unit}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "100px",
                    whiteSpace: "balance",
                    textWrap: "balance",
                    wordBreak: "break-word",
                  }}
                >
                  {row.storage_requirements}
                </TableCell>
                <TableCell align="left" sx={{ }}>
                  {row.shelf_life}
                </TableCell>
                <TableCell align="left" sx={{width:"150px" }}>
                  {row.case_gtin}
                </TableCell>
                <TableCell align="left" sx={{ width:"150px" }}>
                  {row.ingredient_info}
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
