"use client";

import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: 1.05,
  fontSize: "32px",
  textTransform: "uppercase",
  width: "fit-content",
  [theme.breakpoints.up("md")]: {
    fontSize: "42px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "48px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "56px",
  },
}));

function PrimaryHeading({ children, ...props }) {
  return (
    <Heading variant="h2" {...props}>
      {children}
    </Heading>
  );
}

export default PrimaryHeading;
