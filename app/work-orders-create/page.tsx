"use client";
import CustomizedSnackbars from "@/components/Snackbar";
import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  id?: string;
  donor: string;
  panels: string;
  barcode: string;
  source: string;
  amount: string;
  observed_by: string;
  status: string;
}

interface Errors {
  donor?: string;
  panels?: string;
  barcode?: string;
  source?: string;
  amount?: string;
  observed_by?: string;
  status?: string;
}

export default function CreateWorkOrders() {
  const router = useRouter(); // Initialize the useRouter hook
  const [snackbar, setSnackbar] = React.useState({
    message: "",
    severity: "success",
    open: false,
  });
  const [formData, setFormData] = React.useState<FormData>({
    donor: "",
    panels: "",
    barcode: "",
    source: "",
    amount: "",
    observed_by: "",
    status: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSave = async () => {
    const validationErrors: Errors = {};
    for (const key in formData) {
      if (!formData[key as keyof FormData] && key != 'id') {
        validationErrors[key as keyof Errors] = "This field is required";
      }
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    formData.id = uuidv4(); // Add id to formData

    const response = await fetch("http://localhost:3000/api/rollup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    if (res.status) {
      setSnackbar({
        message: "Data added successfully.",
        severity: "success",
        open: true,
      });
      setTimeout(() => {
        setFormData({
          donor: "",
          panels: "",
          barcode: "",
          source: "",
          amount: "",
          observed_by: "",
          status: "",
        });
        router.push("/work-orders");
      }, 1500);
    } else {
      setSnackbar({
        message: "Something went wrong.",
        severity: "error",
        open: true,
      });
    }
  };

  return (
    <>
      <CustomizedSnackbars msgData={snackbar} setMsgData={setSnackbar} />
      <Stack direction={"column"} gap={3}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography className="page-title" variant="h5">
            Add Work Upload
          </Typography>
        </Stack>
        <Stack direction="row" gap={4}>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.donor)}
          >
            <OutlinedInput
              id="donor"
              name="donor"
              value={formData.donor}
              onChange={handleInputChange}
              placeholder="Donor"
            />
            {errors.donor && (
              <FormHelperText style={{ color: "red" }}>
                {errors.donor}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.panels)}
          >
            <OutlinedInput
              id="panels"
              name="panels"
              value={formData.panels}
              onChange={handleInputChange}
              placeholder="Panels"
            />
            {errors.panels && (
              <FormHelperText style={{ color: "red" }}>
                {errors.panels}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row" gap={4}>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.barcode)}
          >
            <OutlinedInput
              id="barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              placeholder="Barcode"
            />
            {errors.barcode && (
              <FormHelperText style={{ color: "red" }}>
                {errors.barcode}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.source)}
          >
            <OutlinedInput
              id="source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              placeholder="Source"
            />
            {errors.source && (
              <FormHelperText style={{ color: "red" }}>
                {errors.source}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row" gap={4}>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.amount)}
          >
            <OutlinedInput
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            {errors.amount && (
              <FormHelperText style={{ color: "red" }}>
                {errors.amount}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.observed_by)}
          >
            <OutlinedInput
              id="observed_by"
              name="observed_by"
              value={formData.observed_by}
              onChange={handleInputChange}
              placeholder="Observed By"
            />
            {errors.observed_by && (
              <FormHelperText style={{ color: "red" }}>
                {errors.observed_by}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row" gap={4}>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.status)}
          >
            <OutlinedInput
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              placeholder="Status"
            />
            {errors.status && (
              <FormHelperText style={{ color: "red" }}>
                {errors.status}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack direction="row">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
