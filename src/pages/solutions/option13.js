import AdminMenuItems from '@/src/Components/MenuItems/AdminMenuItems';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';

const drawerWidth = 240;

const Option13 = props => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  const router = useRouter();

  const handleClickParent = parent => {
    console.log(parent);

    if (parent.subPath && parent.subPath.length > 0) {
      setOpenSubmenuId(prev => (prev === parent.id ? null : parent.id));
    } else {
      setOpenSubmenuId(prev => (prev === parent.id ? null : parent.id));
      router.push(parent.path);
    }
  };

  const handleClickChild = childPath => {
    // Navigate to the child path
    console.log(`Navigating to ${childPath}`);
    router.push(childPath);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        {AdminMenuItems.map(parentItem => {
          const selected =
            parentItem.path === router.pathname ||
            parentItem.subPaths?.some(
              childItem => childItem.path === router.pathname
            );
          console.log(selected);
          return (
            <div key={parentItem.id}>
              <ListItem button onClick={() => handleClickParent(parentItem)}>
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={
          {
            //   width: { sm: `calc(100% - ${drawerWidth}px)` },
            //   ml: { sm: `${drawerWidth}px` },
          }
        }
      >
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          PaperProps={{
            sx: {
              zIndex: 1000, // Set custom z-index here
            },
          }}
          container={container}
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

export default Option13;
