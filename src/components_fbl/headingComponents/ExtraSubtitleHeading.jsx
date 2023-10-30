import { Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  display: "block",
  fontFamily: theme.typography.subtitle1,
}));

function ExtraSubtitleHeading({ children, ...props }) {
  return (
    <Paragraph variant="subtitle2" {...props}>
      {children}
    </Paragraph>
  );
}

export default ExtraSubtitleHeading;
