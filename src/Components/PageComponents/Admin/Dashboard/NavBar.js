import IMAGES from '@/imageComponents/ImagePaths';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

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
  marginLeft: theme.spacing(2),
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
    { id: '1', path: '/admin', name: 'Assessment', value: 'Assessment' },
    {
      id: '2',
      path: '/admin/assessment/assessmentrequest',
      name: 'Assessment Request',
      value: 'Assessment Request',
    },
  ];
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
        router.push('/admin/login');
      }
    });
  };
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleClick = () => {
  //   router.push('/');
  // }
  // const [alignment, setAlignment] = useState(LinkData[0].value);
  // const [component, setComponent] = useState(<Assessment />);
  // const swiperRef = useRef(null);
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
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 'px' }}>
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
          {/* <AdminNavMenu /> */}
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
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>

          {/* <Button variant="contained" onClick={handleOpen}>
        Log out
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          
            <Button variant="contained" color="primary" onClick={handleClick}>
              Yes
            </Button>
        
        </DialogActions>
      </Dialog> */}
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
  );
};

export default NavBar;
