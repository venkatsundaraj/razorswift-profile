import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const ViewPortBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  padding: theme.spacing(4, 0),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowX: "hidden",
  backgroundColor: theme.palette.primaryPalette.white,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

function ViewportBoxComponent({ children, ...props }) {
  return (
    <ViewPortBox component="section" {...props}>
      {children}
    </ViewPortBox>
  );
}

export default ViewportBoxComponent;
