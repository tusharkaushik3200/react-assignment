import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  Stack,
  TableFooter,
  TablePagination,
} from "@mui/material";

// Define the props interface
interface CustomTableProps {
  action?: string;
  cols: string[];
  onPageChange: ({ rows, page }: { rows: number; page: number }) => void;
  data: any[];
  isCheckbox?: boolean;
  actionComp?: (row: any) => React.ReactNode;
  count: number;
  handleCheckbox?: (id: any) => void;
  checkboxData?: any[];
  removeAllChecked?: () => void;
}

// Utility function to capitalize the first letter of each word
const capitalize = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const CustomTable: React.FC<CustomTableProps> = ({
  action = "Action",
  cols,
  onPageChange,
  data,
  isCheckbox = false,
  actionComp,
  count,
  handleCheckbox,
  checkboxData = [],
  removeAllChecked,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage((page) => {
      onPageChange({ rows: rowsPerPage, page: newPage });
      return newPage;
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage((page) => {
      onPageChange({ rows: newRowsPerPage, page: 0 });
      return newRowsPerPage;
    });
    setPage(0);
  };

  const rows = data.map((item) => {
    return [
      // First element of the array is to show data in the table rows
      cols.map((col) => item[col]),
      // Second element is for passing entire object which we get from get API i.e. data in the props
      { ...item },
    ];
  });

  return (
    <Box sx={{ marginBottom: "40px" }}>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0", overflowY: "scroll", maxHeight: "500px" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #DDDDDD" }}>
              {isCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={checkboxData.length > 0}
                    onChange={removeAllChecked}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
              )}
              {cols.map((column) => (
                <TableCell
                  align="left"
                  key={column}
                  sx={{ fontWeight: 600, color: "#6C7692", bgcolor: "#cafdca" }}
                >
                  {capitalize(column.split("_").join(" "))}
                </TableCell>
              ))}
              {actionComp && (
                <TableCell
                  align="left"
                  sx={{ fontWeight: 600, color: "#6C7692", bgcolor: "#cafdca" }}
                >
                  {action}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {isCheckbox && (
                  <TableCell padding="checkbox" align="left">
                    <Checkbox
                      color="primary"
                      checked={checkboxData.includes(row[1]?.id)}
                      onChange={() => handleCheckbox(row[1]?.id)}
                    />
                  </TableCell>
                )}
                {row[0].map((item: any, itemIndex: any) => (
                  <TableCell align="left" key={itemIndex}>
                    {item}
                  </TableCell>
                ))}
                {actionComp && (
                  <TableCell align="left" sx={{ minWidth: 200 }} width={200}>
                    {actionComp(row[1])}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        className="paginationSec"
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                sx={{
                  "& .MuiTablePagination-selectLabel": {
                    mb: 0.5,
                  },
                  "& .MuiTablePagination-displayedRows": {
                    mb: 0.5,
                  },
                  border: 0,
                }}
                count={count ?? data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Stack>
    </Box>
  );
};

export default CustomTable;
