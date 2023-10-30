import { setAlertPopup } from '@/store/alertSlice';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logout from '@mui/icons-material/Logout';
import { Container, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
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

const AdminMenuIcon = ({ text }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const clientDetails = localStorageUtil.getItem('clientDetails');
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const revertDelete = () => {
    dispatch(
      setAlertPopup({
        message: 'You have reverted the Logout action',
        type: 'info',
        duration: 3000,
      })
    );
  };
  const handleLogout = () => {
    showConfirmationDialog(
      'Are you sure?',
      'You want to logout!',
      () => {
        router.push('/admin/login');
        handleClose();
      },
      () => {
        revertDelete();
      }
    );
  };

  return (
    <Stack direction="row" spacing={2} alignItems={'center'}>
      <Typography variant="body1" color="initial">
        Welcome, Admin
      </Typography>
      <Tooltip title="Account settings">
        <Stack direction="row" onClick={handleClick} spacing={{ md: 1 }}>
          <Avatar
            sx={{
              width: 45,
              height: 45,
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: '29.16px',
              backgroundColor: '#A62973',
              boxShadow: `6px 0px 2px 2px rgba(239, 94, 106, 0.1)`,
            }}
          >
            {text}
          </Avatar>
          <IconButton
            disableRipple
            sx={{ p: 0 }}
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Stack>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem
          onClick={() => {
            router.push('/profile');
          }}>
          <Avatar /> My Profile
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default AdminMenuIcon;
