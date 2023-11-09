import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,

  fontFamily: theme.typography.body1,
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '20px',
  },
}));

function ParagraphHeading({ children, ...props }) {
  return (
    <Paragraph variant="body1" {...props}>
      {children}
    </Paragraph>
  );
}

export default ParagraphHeading;
