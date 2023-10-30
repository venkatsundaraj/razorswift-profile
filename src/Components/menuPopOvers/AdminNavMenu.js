import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Divider, Stack, styled, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const LinkData = [
  { id: '0', path: 'masters/city', name: 'City' },
  { id: '1', path: 'masters/company', name: 'Company' },
  { id: '2', path: 'masters/companyalias', name: 'Company Alias' },
  { id: '3', path: 'masters/country', name: 'Country' },
  { id: '4', path: 'masters/degree', name: 'Degree' },
  { id: '5', path: 'masters/degreealias', name: 'Degree Alias' },
  {
    id: '6',
    path: 'masters/educationinstitute',
    name: 'Educational Institute',
  },
  { id: '7', path: 'masters/hotskill', name: 'Hot Skill' },
  { id: '8', path: 'masters/jobtitle', name: 'Job Title' },
  { id: '9', path: 'masters/jobtitlealias', name: 'Job title Alias' },
  { id: '10', path: 'masters/language', name: 'Language' },
  { id: '11', path: 'masters/parser', name: 'Parser' },
  { id: '12', path: 'masters/skill', name: 'Skill' },
  { id: '13', path: 'masters/skillalias', name: 'Skill Alias' },
  { id: '14', path: 'masters/state', name: 'State' },
];

const AdminNavMenu = () => {
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
    if (v.name === 'City' && router.pathname !== 'admin/masters/city') {
      router.push('admin/masters/city');
      setAnchorEl(null);
    }
    if (v.name === 'Company' && router.pathname !== 'admin/masters/company') {
      router.push('admin/masters/city');
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
        Masters
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
            overflowY: 'auto', // add a scrollbar to the Y axis
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
            minWidth: '200px',
            textAlign: 'center',
            justifyContent: 'space-evenly',
            maxHeight: '200px', // set the maximum height of the paper
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
              <MenuItem onClick={() => handleMenuItem(values)}>
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: '100%' }}
                >
                  <LargeText>{values.name}</LargeText>
                </Stack>
              </MenuItem>
            )}
            {index != LinkData.length - 1 && <Divider />}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default AdminNavMenu;
