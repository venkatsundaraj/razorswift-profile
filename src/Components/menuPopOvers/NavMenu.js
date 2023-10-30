import ComingSoonButton from '@/buttonComponents/CommingSoonButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Divider, Stack, styled, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';

import { useRef, useState } from 'react';

const LinkData = [
  { id: '0', path: '/aspirants', name: 'Aspirants' },
  { id: '1', path: '/', name: 'Business' },
  { id: '2', path: '/', name: 'Mentors' },
  { id: '3', path: '/', name: 'Service providers' },
];

const NavMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = v => {
    console.log(v.name);
    console.log(router.pathname);
    if (v.name === 'Aspirants' && router.pathname !== '/aspirants') {
      router.push('/aspirants');
      setAnchorEl(null);
    }
  };

  const anchorRef = useRef(null);

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: '#1A1A1A',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '16.8px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  }));
  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    color: '#1D1D1D',

    fontWeight: 'bold',
    fontFamily: 'Urbanist',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    // "&:hover": {
    // 	color: "#fff",
    // },
  }));
  return (
    <>
      <Typography
        onClick={handleClick}
        sx={{
          fontSize: '18px',
          color: '#1D1D1D',
          fontWeight: 'bold',
          fontFamily: 'Urbanist',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          width: '83.5px',
          marginRight: 2,
        }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="body1"
      >
        Solutions
        {open ? (
          <KeyboardArrowUp style={{ color: '#1D1D1D' }} />
        ) : (
          <KeyboardArrowDownIcon style={{ color: '#1D1D1D' }} />
        )}
      </Typography>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
            minWidth: '200px',
            textAlign: 'center',
            justifyContent: 'space-evenly',
          },
        }}
      >
        {LinkData.map((values, index) => (
          <div key={values.id}>
            {values.name === LinkData[0].name && (
              <MenuItem onClick={() => handleMenuItem(values)}>
                <LargeText>{values.name}</LargeText>
              </MenuItem>
            )}
            {values.name !== LinkData[0].name && (
              <Tooltip title="Coming Soon" placement="right-start" arrow>
                <MenuItem onClick={() => handleMenuItem(values)}>
                  <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: '100%' }}
                  >
                    <LargeText>{values.name}</LargeText>
                    <ComingSoonButton size="small" />
                  </Stack>
                </MenuItem>
              </Tooltip>
            )}
            {index != LinkData.length - 1 && <Divider />}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default NavMenu;
