import styled from '@emotion/styled';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

const FillButton = styled(Link)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  lineHeight: '27px',
  textTransform: 'inherit',
  textDecoration: 'none',
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

const PrimaryFillButton = function ({ children, ...props }) {
  return (
    <FillButton {...props} component={NextLink}>
      {children}
    </FillButton>
  );
};

export default PrimaryFillButton;
