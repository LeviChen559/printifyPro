import { TableRow, TableCell, Table, TableBody } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const TableSkeletonRow = ({ columnCount }: { columnCount: number }) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {Array.from({ length: columnCount }).map((_, index) => (
        <TableCell key={index} align="center">
          <Skeleton variant="text" width={30} height={20} />
        </TableCell>
      ))}
    </TableRow>
  );
};

export const SkeletonTable = ({ rowCount = 10, columnCount = 10 }) => {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, index) => (
          <TableSkeletonRow key={index} columnCount={columnCount} />
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
