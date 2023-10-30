import ClientMenuItems from '@/src/Components/MenuItems/ClientMenuItems';
import { ExpandLess, ExpandMore, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const drawerWidth = 240;

const Option14 = ({ window }) => {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const handleClickParent = parent => {
    if (parent.subPaths && parent.subPaths.length > 0) {
      setOpenSubmenuId(prev => (prev === parent.id ? null : parent.id));
    } else {
      setOpenSubmenuId(prev => (prev === parent.id ? null : parent.id));
      router.push(parent.path);
    }
  };

  const handleClickChild = childPath => {
    router.push(childPath);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {ClientMenuItems.map(parentItem => {
          const selected =
            parentItem.path === router.pathname ||
            parentItem.subPaths?.some(
              childItem => childItem.path === router.pathname
            );

          return (
            <div key={parentItem.id}>
              <ListItem
                button
                onClick={() => handleClickParent(parentItem)}
                selected={selected}
              >
                <ListItemIcon>{parentItem.icon}</ListItemIcon>
                <ListItemText primary={parentItem.title} />
                {parentItem.subPaths && parentItem.subPaths.length > 0 && (
                  <div>
                    {openSubmenuId === parentItem.id ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </div>
                )}
              </ListItem>
              {parentItem.subPaths && parentItem.subPaths.length > 0 && (
                <Collapse
                  in={openSubmenuId === parentItem.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {parentItem.subPaths.map(childItem => (
                      <ListItem
                        key={childItem.id}
                        button
                        selected={childItem.path === router.pathname}
                        onClick={() => handleClickChild(childItem.path)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{childItem.icon}</ListItemIcon>
                        <ListItemText primary={childItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Hidden smUp implementation="css">
          <Drawer
            PaperProps={{
              sx: {
                zIndex: 1000, // Set custom z-index here
              },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            PaperProps={{
              sx: {
                zIndex: 1000, // Set custom z-index here
              },
            }}
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>y</Typography>
        <Typography paragraph>d</Typography>
      </Box>
    </Box>
  );
};
export default Option14;
