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
import { Container, Box } from "@mui/material";
import SkeletonTable from "@/components/skeletonTable";
import { fetcher } from "@/utils/lib/fetcher";
import LabelLogo from "../logo";
import { iLabelInfo } from "@/type/labelType";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
  const [sortType, setSortType] = React.useState<{
    type: string;
    order: "asc" | "desc";
  }>({ type: "id", order: "asc" });

  prop.isLabelUpdated && mutate(prop.apiMyLabelUrl);
  const labelSelect = (id: number) => {
    // Trigger the parent callback with the selected label info
    const selectedInfo = labelData.find((item: iLabelInfo) => item.id === id);
    if (selectedInfo) {
      prop.selectItem(selectedInfo); // Now this can access the correct label info
    }
  };

  const labelSort = (type: string, order: "asc" | "desc") => {
    if (!labelData || !Array.isArray(labelData)) return [];

    if (order === "desc") {
      const sortedData = [...labelData].sort((a: iLabelInfo, b: iLabelInfo) => {
        switch (type) {
          case "id":
            return b.id - a.id;
          case "item_code":
            return b.item_code.localeCompare(a.item_code);
          case "product_name_en":
            return b.product_name_en.localeCompare(a.product_name_en);
          case "product_name_zh":
            return b.product_name_zh.localeCompare(a.product_name_zh);
          default:
            return 0; // No sorting if unknown type
        }
      });
      return sortedData;
    } else {
      const sortedData = [...labelData].sort((a: iLabelInfo, b: iLabelInfo) => {
        switch (type) {
          case "id":
            return a.id - b.id;
          case "item_code":
            return a.item_code.localeCompare(b.item_code);
          case "product_name_en":
            return a.product_name_en.localeCompare(b.product_name_en);
          case "product_name_zh":
            return a.product_name_zh.localeCompare(b.product_name_zh);
          default:
            return 0; // No sorting if unknown type
        }
      });
      return sortedData;
    }
  };

  const handleSort = (type: string) => {
    setSortType((prev) => ({
      type,
      order: prev.type === type && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  console.log("sortType", sortType);

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
            <TableCell align="center" onClick={() => handleSort("id")}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={0.5}
              >
                Id
                {sortType.type === "id" ? (
                  <ArrowDropDownIcon fontSize="small" />
                ) : (
                  <ArrowRightIcon fontSize="small" />
                )}
              </Box>
            </TableCell>
            <TableCell
              align="left"
              sx={{ width: "90px", padding: 1, cursor: "pointer" }}
              onClick={() => handleSort("item_code")}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={0.5}
              >
                Item Code
                {sortType.type === "item_code" ? (
                  <ArrowDropDownIcon fontSize="small" />
                ) : (
                  <ArrowRightIcon fontSize="small" />
                )}
              </Box>
            </TableCell>
            <TableCell align="center" sx={{ width: "50px", padding: 1 }}>
              Logo
            </TableCell>
            <TableCell
              align="left"
              sx={{ width: "100px", padding: 1, cursor: "pointer" }}
              onClick={() => handleSort("product_name_en")}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={0.5}
              >
                Product_EN
                {sortType.type === "product_name_en" ? (
                  <ArrowDropDownIcon fontSize="small" />
                ) : (
                  <ArrowRightIcon fontSize="small" />
                )}
              </Box>
            </TableCell>
            <TableCell
              align="left"
              sx={{ width: "100px", padding: 1, cursor: "pointer" }}
              onClick={() => handleSort("product_name_zh")}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={0.5}
              >
                Product_ZH
                {sortType.type === "product_name_zh" ? (
                  <ArrowDropDownIcon fontSize="small" />
                ) : (
                  <ArrowRightIcon fontSize="small" />
                )}
              </Box>
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Weight
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Case
            </TableCell>
            <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
              Storage
            </TableCell>
            <TableCell align="left" sx={{ width: "75px", padding: 1 }}>
              Shelf Life
            </TableCell>
            <TableCell align="left" sx={{ width: "75px", padding: 1 }}>
              Case Gtin
            </TableCell>
            <TableCell align="left" sx={{ width: "150px", padding: 1 }}>
              Manufactured For
            </TableCell>
            <TableCell align="left" sx={{ width: "70px", padding: 1 }}>
              Label Temp
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labelSort(sortType.type, sortType.order) &&
          Array.isArray(labelSort(sortType.type, sortType.order)) ? (
            labelSort(sortType.type, sortType.order).map((row: iLabelInfo) => (
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
                <TableCell align="left" sx={{ padding: 1 }}>
                  {row.item_code}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    padding: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LabelLogo logo={row.logo} />
                </TableCell>
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
                  {row.product_name_en}
                </TableCell>
                <TableCell align="left" sx={{ width: "50px", padding: 1 }}>
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
                {/* <TableCell align="left" sx={{ width: "250px", padding: 1 }}>
                  {row.ingredient&&row.ingredient.slice(0,75)+" ..."}
                </TableCell> */}
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
