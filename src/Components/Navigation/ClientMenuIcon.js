import { setAlertPopup } from '@/store/alertSlice';
import { setReset } from '@/store/authSlice';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useTheme } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logout from '@mui/icons-material/Logout';
import { Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

const ClientMenuIcon = ({ text }) => {
  const dispatch = useDispatch();
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
        localStorageUtil.deleteItem('clientDetails');
        dispatch(setReset([]));
        router.push('/client/login');
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
        {clientDetails?.client?.name}
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
        <MenuItem>
          <Stack spacing={2}>
            <Typography>Hi,{clientDetails?.fullName}</Typography>
            <Typography>
              Role - {''}
              {clientDetails?.contact?.contactType === 1 ? 'Admin' : 'User'}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <CustomMenuItem
          onClick={() => {
            router.push('/client/profile');
          }}
          icon={<AccountCircleIcon color="primary" />}
          text="My Profile"
        />
        {/* <CustomMenuItem
          icon={<BusinessIcon color="primary" />}
          text={clientDetails?.client?.name}
        /> */}
        {/* <CustomMenuItem
          icon={
            clientDetails?.contact?.contactType === 1 ? (
              <SupervisorAccountIcon color="primary" />
            ) : (
              <PersonIcon color="primary" />
            )
          }
          text={clientDetails?.contact?.contactType === 1 ? 'Admin' : 'User'}
        /> */}

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

        <CustomMenuItem
          icon={<Logout fontSize="small" />}
          text={'Logout'}
          onClick={() => {
            handleLogout();
          }}
        />
      </Menu>
    </Stack>
  );
};

export default ClientMenuIcon;
const CustomMenuItem = ({ icon, text, onClick }) => {
  const theme = useTheme();
  const iconStyle = {
    color: theme.palette.primary.main,
  };
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon style={iconStyle}>{icon}</ListItemIcon>
      <Typography>{text}</Typography>
    </MenuItem>
  );
};
