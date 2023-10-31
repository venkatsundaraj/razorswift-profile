import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '52px',
  lineHeight: 1.05,
  fontWeight: 'normal',
  width: 'fit-content',
  [theme.breakpoints.up('sm')]: {
    fontSize: '58px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '90px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '110px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '140px',
  },
}));

function ExtraSuperText({ children, ...props }) {
  return (
    <Heading variant="h1" {...props}>
      {children}
    </Heading>
  );
}

export default ExtraSuperText;
