import styled from '@emotion/styled';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

const FillButton = styled(Link)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.4, 1.6),
  border: '1px solid #A62973',
  textDecoration: 'none',
  lineHeight: '27px',
  background: 'transparent',
  textTransform: 'inherit',
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

const NavButton = function ({ children, href, ...props }) {
  return (
    <FillButton {...props} href={href} component={NextLink}>
      {children}
    </FillButton>
  );
};

export default NavButton;
