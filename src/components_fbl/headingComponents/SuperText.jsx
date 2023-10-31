import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: 1.05,
  fontWeight: 'normal',
  fontSize: '46px',
  width: 'fit-content',
  [theme.breakpoints.up('md')]: {
    fontSize: '52px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '74px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '94px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '112px',
  },
}));

function SuperText({ children, ...props }) {
  return (
    <Heading variant="h2" {...props}>
      {children}
    </Heading>
  );
}

export default SuperText;
