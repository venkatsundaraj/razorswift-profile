import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: 1.05,
  fontSize: '24px',
  textTransform: 'capitalize',
  width: 'fit-content',
  fontWeight: 600,
  [theme.breakpoints.up('md')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '42px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '46px',
  },
}));

function SecondaryHeading({ children, ...props }) {
  return (
    <Heading variant="h3" {...props}>
      {children}
    </Heading>
  );
}

export default SecondaryHeading;
