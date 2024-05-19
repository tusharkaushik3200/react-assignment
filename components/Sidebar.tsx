"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FaceIcon from "@mui/icons-material/Face";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SummarizeIcon from "@mui/icons-material/Summarize";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";

interface SidebarItem {
  title: string;
  endpoint: string;
  icon: JSX.Element;
  userType?: string[];
  type?: string;
}

const sidebarData: SidebarItem[] = [
  {
    title: "Face Recognition",
    endpoint: "/",
    icon: <FaceIcon />,
  },
  {
    title: "Daily Visit",
    endpoint: "/",
    icon: <EventNoteIcon />,
  },
  {
    title: "Donate",
    endpoint: "/",
    icon: <EmergencyShareIcon />,
  },
  {
    title: "Work Orders",
    endpoint: "/work-orders",
    icon: <HomeWorkIcon />,
  },
  {
    title: "Reports",
    endpoint: "/",
    icon: <AssessmentIcon />,
  },
  {
    title: "Report History",
    endpoint: "/",
    icon: <SummarizeIcon />,
  },
  {
    title: "Test History",
    endpoint: "/",
    icon: <HistoryIcon />,
  },
  {
    title: "Calender Type",
    endpoint: "/calender",
    icon: <CalendarMonthIcon />,
  },
];

const HoveredList = styled(List)(({ theme, sx }: { theme: any; sx: any }) => ({
  position: "relative",
  top: 0,
  left: 0,
  height: "100vh",
  overflow: "auto",
  transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  boxShadow: "5px 4px 16px rgba(0,0,0,0.04)",
  overflowX: "hidden",
  ...sx,
}));

const StyledListItem = styled(ListItemButton)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255);
  color: black;

  &:hover,
  &.active {
    background: blue;
    color: black;

    & .listItemIcon {
      color: black;
    }
  }
`;

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <HoveredList
      className="sidebar"
      theme={theme}
      sx={{
        width: open ? "28%" : "7%",
        backgroundColor: "background.paper",
        color: "black",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        marginTop={2}
        alignItems="center"
        className="cursor-pointer"
      >
        <div onClick={() => setOpen(!open)}>
          <ArrowForwardIcon />
        </div>
      </Stack>
      {sidebarData.map((item, index) => (
        <ListItem key={index}>
          <Link href={item.endpoint} style={{ width: "100%" }}>
            <StyledListItem>
              <ListItemIcon className="listItemIcon">{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={item.title} />
              <ListItemIcon className="listItemIcon flex justify-end">
                <ArrowForwardIosIcon />
              </ListItemIcon>
            </StyledListItem>
          </Link>
        </ListItem>
      ))}
      <Divider />
    </HoveredList>
  );
};
