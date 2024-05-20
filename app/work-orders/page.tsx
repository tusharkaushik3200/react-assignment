"use client";
import CustomTable from "@/components/CustomTable";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomizedSnackbars from "@/components/Snackbar";

export default function Work() {
  const [snackbar, setSnackbar] = React.useState({
    message: "",
    severity: "success",
    open: false,
  });
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:3000/api/rollup", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const Action = (row: any) => {
    const { id } = row;
    return (
      <>
        <IconButton
          sx={{ p: "4px" }}
          color="primary"
          onClick={() => router.push(`/work-orders/${id}`)}
        >
          <Edit />
        </IconButton>
        <IconButton
          sx={{ p: "4px", color: "red" }}
          onClick={() => handleDelete(id)}
        >
          <Delete />
        </IconButton>
      </>
    );
  };

  const [pagination, setPagination] = useState({ rows: 5, page: 0 });

  const handlePageChange = (data: any) => {
    setPagination(data);
  };

  const cols = [
    "donor",
    "panels",
    "barcode",
    "source",
    "date",
    "amount",
    "observed_by",
    "status",
  ];

  const handleDelete = async (id: any) => {
    const response = await fetch(`http://localhost:3000/api/rollup/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await response.json();
    if (res.status) {
      setSnackbar({
        message: "Data deleted successfully.",
        severity: "success",
        open: true,
      });
    }
  };

  return (
    <>
      <CustomizedSnackbars msgData={snackbar} setMsgData={setSnackbar} />
      <Stack direction="column" flexWrap="wrap" gap={6} marginTop={4}>
        <Stack direction="row" gap={4}>
          <Typography variant="h4">Work Orders</Typography>
          <Button>
            <Link href="/work-orders-create">Create</Link>
          </Button>
        </Stack>
        <CustomTable
          cols={cols}
          onPageChange={handlePageChange}
          data={data}
          actionComp={Action}
          count={data.length}
        />
      </Stack>
    </>
  );
}
