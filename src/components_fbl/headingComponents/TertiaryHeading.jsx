import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: 1.05,
  fontSize: '18px',
  textTransform: 'capitalize',
  width: 'fit-content',
  fontWeight: 600,
  [theme.breakpoints.up('sm')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '28px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '40px',
  },
}));

function TertiaryHeading({ children, ...props }) {
  return (
    <Heading variant="p" {...props}>
      {children}
    </Heading>
  );
}

export default TertiaryHeading;
