import { Button, List, ListItem, Stack } from '@mui/material';

import MenuButton from '@/components_fbl/buttonComponents/MenuButton';
import styled from '@emotion/styled';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.4, 1.6),
  border: '1px solid #A62973',
  textDecoration: 'none',
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

function Navigation({ headerdData }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      gap={2}
    >
      <List
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {headerdData.navItems.map(item => (
          <ListItem key={item.id} sx={{ px: 1 }}>
            <NavButton
              href={item.link}
              sx={{ color: 'primaryPalette.black' }}
              startIcon={<ExitToAppIcon />}
            >
              {item.name}
            </NavButton>
          </ListItem>
        ))}
      </List>

      <MenuButton headerdData={headerdData} />
    </Stack>
  );
}

export default Navigation;
