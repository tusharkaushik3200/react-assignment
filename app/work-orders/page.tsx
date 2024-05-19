"use client";
import CustomTable from "@/components/CustomTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export default function Work() {
  const Action = (row: any) => {
    const { id } = row;
    return (
      <>
        <IconButton sx={{ p: "4px" }} color="primary">
          <MoreVertIcon />
        </IconButton>
      </>
    );
  };
  const [pagination, setPagination] = React.useState({ rows: 5, page: 0 });
  const handlePageChange = (data: any) => {
    setPagination(data);
  };
  const cols = [
    "Donor",
    "Panels",
    "Barcode",
    "Source",
    "Date",
    "Amount(s)",
    "Observed By",
    "Status",
  ];
  const tableData: any = [
    {
      Donor: "Jimmy TestingTon",
      Panels: "3 Panel,12 Panel U CUP",
      Barcode: "17878779",
      Source: "medicaid",
      Date: "07/18/2023",
      "Amount(s)": "0.00",
      "Observed By": "Chavan vishal",
      Status: "Unable to donate",
    },
    {
      Donor: "Jimmy TestingTon",
      Panels: "3 Panel,12 Panel U CUP",
      Barcode: "871271818",
      Source: "Self Pay",
      Date: "07/18/2023",
      "Amount(s)": "7.00",
      "Observed By": "Chavan vishal",
      Status: "Refused",
    },
    {
      Donor: "Jimmy TestingTon",
      Panels: "3 Panel,12 Panel U CUP",
      Barcode: "9283827326",
      Source: "Self Pay",
      Date: "07/18/2023",
      "Amount(s)": "0.00",
      "Observed By": "Chavan vishal",
      Status: "Duplicate/Error",
    },
    {
      Donor: "TestMishra Ramakrishna",
      Panels: "4 Panel,3 Panel",
      Barcode: "16771267",
      Source: "Self Pay",
      Date: "07/18/2023",
      "Amount(s)": "5.00",
      "Observed By": "Chavan vishal",
      Status: "Insufficient Donation",
    },
    {
      Donor: "TestMishra Ramakrishna",
      Panels: "BA, 4 Panel",
      Barcode: "1767467347",
      Source: "medicaid",
      Date: "07/18/2023",
      "Amount(s)": "5.00",
      "Observed By": "Chavan vishal",
      Status: "Approved",
    },
    {
      Donor: "Jimmy TestingTon",
      Panels: "3 Panel,12 Panel U CUP",
      Barcode: "17878779",
      Source: "medicaid",
      Date: "07/18/2023",
      "Amount(s)": "0.00",
      "Observed By": "Chavan vishal",
      Status: "Unable to donate",
    },
    {
      Donor: "Jimmy TestingTon",
      Panels: "3 Panel,12 Panel U CUP",
      Barcode: "17878779",
      Source: "medicaid",
      Date: "07/18/2023",
      "Amount(s)": "0.00",
      "Observed By": "Chavan vishal",
      Status: "Unable to donate",
    },
  ];
  return (
    <Stack direction="column" flexWrap="wrap">
      {" "}
      <Typography variant="h4">Work Orders</Typography>
      <CustomTable
        cols={cols}
        onPageChange={handlePageChange}
        data={tableData}
        actionComp={Action}
        count={tableData.length}
      />
    </Stack>
  );
}
