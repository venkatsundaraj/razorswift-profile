import IMAGES from '@/imageComponents/ImagePaths';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AdminNavMenu from '../../menuPopOvers/AdminNavMenu';

const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#1D1D1D',
  fontWeight: 'bold',
  fontFamily: 'Urbanist',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavbarLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CustomMenuIconDrawer = styled(MenuIcon)(({ theme }) => ({
  cursor: 'pointer',
  display: 'none',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

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
  [theme.breakpoints.down('md')]: {},
}));
const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));
const NavBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const LinkData = [
    {
      id: '1',
      path: '/admindashboard',
      name: 'Assessment',
      value: 'Assessment',
    },
    {
      id: '2',
      path: '/assessmentrequest',
      name: 'Assessment Request',
      value: 'Assessment Request',
    },
  ];
  const [alignment, setAlignment] = useState(LinkData[0].value);
  //   const [component, setComponent] = useState(<Assessment />);
  //const swiperRef = useRef(null);
  // const handleChange = (event, newAlignment) => {
  //   if (newAlignment !== null) {
  //     console.log(alignment, newAlignment);
  //     setAlignment(newAlignment.value);
  //     switch (newAlignment.value) {
  //       case 'Assessment':
  //         return setComponent(<Assessment />);
  //       case 'Masters':
  //         return setComponent(<Masters />);
  //       default:
  //         return null;
  //     }
  //   }
  // };
  return (
    <>
      <NavbarContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing(2),
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
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
          <Box
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '0px' }}
          >
            <NavbarLogo>
              <NavbarLogoLink src={IMAGES?.LOGO} alt="logo" url={'/'} />
            </NavbarLogo>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <NavbarLinksBox>
            <AdminNavMenu />
            {LinkData.map((values, index) => (
              <Box key={values.id}>
                {values.path === '/' && (
                  <NavLink onClick={values.onClick}>{values.name}</NavLink>
                )}
                {values.path !== '/' && (
                  <Link style={{ textDecoration: 'none' }} href={values.path}>
                    <NavLink onClick={values.onClick}>{values.name}</NavLink>
                  </Link>
                )}
              </Box>
            ))}
          </NavbarLinksBox>
          {/* <CustomMenuIconDrawer onClick={toggleDrawer('left', true)} />
        <Drawer
          anchor='left'
          open={mobileMenu['left']}
          PaperProps={{
            sx: { width: '100%' },
          }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 13,
              marginBottom: 0,
            }}>
            <NavbarLogoLink src={IMAGES?.LOGO} alt='logo' width='51%' height='92px' url={'/'} />
            
            <IconButton aria-label='close' onClick={toggleDrawer('left', false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        <Vertical />
         </Drawer> */}
        </Box>
      </NavbarContainer>

      {/* <Container maxWidth='xxl'>{component}</Container> */}
    </>
  );
};

export default NavBar;
