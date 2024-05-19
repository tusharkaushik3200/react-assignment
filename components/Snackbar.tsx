import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface MsgData {
  open: boolean;
  autoHideDuration?: number;
  severity?: "success" | "info" | "warning" | "error";
  message?: string;
}

interface CustomizedSnackbarsProps {
  setMsgData: (data: MsgData) => void;
  msgData: MsgData;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={20} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars: React.FC<CustomizedSnackbarsProps> = (props) => {
  const { setMsgData, msgData } = props;
  const {
    open = false,
    autoHideDuration = 4000,
    severity = "success",
    message = "This is a test message",
  } = msgData;

  const onClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setMsgData({ ...msgData, open: false });
  };

  return (
    <Stack spacing={6} sx={{ width: "200%" }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;