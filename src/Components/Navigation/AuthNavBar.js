import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';

import IMAGES from '@/imageComponents/ImagePaths';
import { Container, Link } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/system';
import { useState } from 'react';

const NavbarContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const NavbarLogo = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    // display: 'none',
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '28.96px',
  fontWeight: '700',

  fontFamily: 'Urbanist',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    // fontSize: '14px',
    // lineHeight: '25.34px',
    // fontWeight: '600',
    // display: 'none',
  },
}));
const NavTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '28.96px',
  fontWeight: '700',
  color: '#1D1D1D',
  fontFamily: 'Urbanist',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    // fontSize: '14px',
    // lineHeight: '25.34px',
    // fontWeight: '600',
    // display: 'none',
  },
}));

export const AuthNavbar = ({ text, linkText, workingFunctions }) => {
  const theme = useTheme();

  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.type === 'Tab' || event.type === 'Shift')
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  return (
    <NavbarContainer
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2),
          justifyContent: 'center',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavbarLogo>
            <NavbarLogoLink src={IMAGES?.LOGO} alt="logo" url={'/'} />
            {/* <CommonImage src={IMAGES?.LOGO} alt="logo" /> */}
          </NavbarLogo>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
        }}
      >
        <NavTypography>{text}</NavTypography>
        <NavLink
          underline="none"
          component="button"
          color="primary"
          onClick={workingFunctions}
        >
          {linkText}
        </NavLink>
      </Box>
    </NavbarContainer>
  );
};

export default AuthNavbar;
