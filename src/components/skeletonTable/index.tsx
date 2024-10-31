import { TableRow, TableCell ,Table, TableBody} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function TableSkeletonRow() {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="center" sx={{ width: "50px" }}>
        <Skeleton variant="text" width={30} height={20} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width="80%" height={20} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width="90%" height={20} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width="70%" height={20} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width="60%" height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px" }}>
        <Skeleton variant="text" width={30} height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px" }}>
        <Skeleton variant="text" width={30} height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px" }}>
        <Skeleton variant="text" width={30} height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px", whiteSpace: "normal", wordWrap: "break-word" }}>
        <Skeleton variant="text" width="90%" height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px" }}>
        <Skeleton variant="text" width={30} height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px" }}>
        <Skeleton variant="text" width="90%" height={20} />
      </TableCell>
      <TableCell align="left" sx={{ width: "50px" }}>
        <Skeleton variant="text" width={70} height={20} />
      </TableCell>
    </TableRow>
  );
}

export default function TableSkeleton({ rowCount = 10 }) {
  return (
    <Table>
      <TableBody>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableSkeletonRow key={index} />
      ))}
    </TableBody>
    </Table>
  );
}