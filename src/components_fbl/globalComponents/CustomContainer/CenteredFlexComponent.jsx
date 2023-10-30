import React from "react";
import { Stack } from "@mui/material";
import styled from "@emotion/styled";

const CenteredFlex = styled(Stack)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
}));

function CenteredFlexComponent({ children, ...props }) {
  return <CenteredFlex {...props}>{children}</CenteredFlex>;
}

export default CenteredFlexComponent;
