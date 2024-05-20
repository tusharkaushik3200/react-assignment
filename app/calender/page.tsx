"use client";
import EventCalendar from "@/components/EventCalendar";
import { Stack } from "@mui/material";
import React from "react";

export default function Calender() {
  return (
    <Stack  direction="column" flexWrap="wrap">
      <EventCalendar/>
    </Stack>
  );
}
