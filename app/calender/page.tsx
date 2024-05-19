"use client";
import CustomTable from "@/components/CustomTable";
import EventCalendar from "@/components/EventCalendar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export default function Calender() {
  return (
    <Stack  direction="column" flexWrap="wrap">
      <EventCalendar/>
    </Stack>
  );
}
