import CustomButton from '@/buttonComponents/CustomButton';
import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import IMAGES from '@/imageComponents/ImagePaths';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import CloseIcon from '@mui/icons-material/Close';
import ContactsIcon from '@mui/icons-material/Contacts';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import {
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import NavMenu from '../menuPopOvers/NavMenu';
import CustomMenuIcon from './CustomMenuIcon';
import Vertical from './Vertical';

const LinkData = [
  // { id: '0', path: '/home', name: 'Home' },
  { id: '1', path: '/', name: 'Courses' },
  { id: '2', path: '/about', name: 'About' },
  { id: '3', path: '/contact', name: 'Contact' },
];

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

export const Navbar = ({ isNotRequired }) => {
  const theme = useTheme();
  const router = useRouter();

  const loginDetails = localStorageUtil.getItem('loginDetails');
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const userDetails = localStorageUtil.getItem('userDetails');
    setUserInfo(userDetails);
  }, []);

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

  const list = anchor => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Features', 'Services', 'Listed', 'Contact'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <FeaturedPlayListIcon />}
                  {index === 2 && <MiscellaneousServicesIcon />}
                  {index === 3 && <ListAltIcon />}
                  {index === 4 && <ContactsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to log out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'purple',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(result => {
      console.log(result, 'box');
      if (result.isConfirmed) {
        // localStorage.clear();
        localStorageUtil.deleteItem('userDetails');

        router.push('/login');
      }
    });
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
          <NavMenu />
          {LinkData.map((values, index) => (
            <Box key={values.id}>
              {values.path === '/' && (
                <Tooltip title="Coming Soon" placement="bottom" arrow>
                  <NavLink>{values.name}</NavLink>
                </Tooltip>
              )}
              {values.path !== '/' && (
                <Link style={{ textDecoration: 'none' }} href={values.path}>
                  <NavLink>{values.name}</NavLink>
                </Link>
              )}
            </Box>
          ))}
          {!userInfo && (
            <CustomButton
              onClick={() => router.push('/login')}
              backgroundColor="#fff"
              color="#A62973"
              buttonText="Login"
            />
          )}
          {userInfo && <CustomMenuIcon />}
        </NavbarLinksBox>
        <Box
          sx={{
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          }}
        >
          {userInfo && <CustomMenuIcon />}
        </Box>
        <CustomMenuIconDrawer onClick={toggleDrawer('left', true)} />
        <Drawer
          anchor="left"
          open={mobileMenu['left']}
          PaperProps={{
            sx: { width: '100%' },
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 13,
              marginBottom: 0,
            }}
          >
            <NavbarLogoLink
              src={IMAGES?.LOGO}
              alt="logo"
              width="51%"
              height="92px"
              url={'/'}
            />
            {/* <CommonImage
              src={IMAGES?.LOGO}
              alt="logo"
              width="51%"
              height="92px"
            /> */}
            <IconButton
              aria-label="close"
              onClick={toggleDrawer('left', false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {!userInfo && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 5,
                margin: 2,
              }}
            >
              <ShadowButtonSubmit
                height="50px"
                width="50%"
                maxwidth="250px"
                backgroundcolor={theme.palette.primary.main}
                onClick={() => router.push('/signup')}
              >
                <ButtonText color="#fff">Sign Up</ButtonText>
              </ShadowButtonSubmit>

              <CustomButton
                height="50px"
                width="50%"
                onClick={() => router.push('/login')}
                backgroundColor="#fff"
                color="#A62973"
                buttonText="Login"
              />
            </Box>
          )}
          {userInfo && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 5,
                margin: 2,
              }}
            >
              <CustomButton
                height="50px"
                width="50%"
                onClick={() => handleLogout()}
                backgroundColor="#fff"
                color="#A62973"
                buttonText="Logout"
              />
            </Box>
          )}
          <Vertical />
          {/* {list('left')} */}
        </Drawer>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
