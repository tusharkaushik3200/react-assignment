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
import { useParams } from "next/navigation";

interface FormData {
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

const CreateFuelStations: React.FC = () => {
  const params = useParams();
  const { id } = params;
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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://react-assignment-mocha.vercel.app/api/rollup/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        console.log(result);
        if (result.status) {
          setFormData({
            donor: result.data[0].donor,
            panels: result.data[0].panels,
            barcode: result.data[0].barcode,
            source: result.data[0].source,
            amount: result.data[0].amount,
            observed_by: result.data[0].observed_by,
            status: result.data[0].status,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors(newErrors);
  };

  const handleSave = async () => {
    const validationErrors: Errors = {};
    for (const key in formData) {
      if (!formData[key as keyof FormData]) {
        validationErrors[key as keyof Errors] = "This field is required";
      }
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await fetch(`https://react-assignment-mocha.vercel.app/api/rollup/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    if (res.status) {
      setSnackbar({
        message: "Data edited successfully.",
        severity: "success",
        open: true,
      });
    } else {
      setSnackbar({
        message: "Something went wrong.",
        severity: "error",
        open: true,
      });
    }
  };

  return (
    <Stack direction={"column"} gap={3}>
      <CustomizedSnackbars msgData={snackbar} setMsgData={setSnackbar} />
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
        <FormControl fullWidth variant="outlined" error={Boolean(errors.donor)}>
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
  );
};

export default CreateFuelStations;
