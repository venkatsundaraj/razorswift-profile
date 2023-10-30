import { Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: 1.25,
  textTransform: "capitalize",
  fontFamily: theme.typography.body1,
  [theme.breakpoints.up("md")]: {
    fontSize: "20px",
  },
}));

function ExtraParagraphHeading({ children, ...props }) {
  return (
    <Paragraph variant="body2" {...props}>
      {children}
    </Paragraph>
  );
}

export default ExtraParagraphHeading;
