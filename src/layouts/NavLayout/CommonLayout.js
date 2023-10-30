import useClientMenuItems from '@/customHooks/useClientMenuItems';
import IMAGES from '@/imageComponents/ImagePaths';
import ClientMenuIcon from '@/navigationComponents/ClientMenuIcon';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import {
  ClearOutlined,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
} from '@mui/icons-material';
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NavbarLogo = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
const drawerWidth = 240;

const CommonLayout = ({ children }) => {
  const router = useRouter();
  const ClientMenuItems = useClientMenuItems();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  useEffect(() => {
    const currentPath = router.pathname;
    const findSelectedItems = menuItems => {
      for (const parentItem of menuItems) {
        const currentPathSplit = currentPath
          .split('/')
          .filter(pathPart => pathPart !== '');
        const pathSplit = parentItem.path
          .split('/')
          .filter(pathPart => pathPart !== '');

        if (
          currentPathSplit.length >= 2 &&
          pathSplit.length >= 2 &&
          currentPathSplit[1] === pathSplit[1]
        ) {
          if (parentItem.subPaths && parentItem.subPaths.length > 0) {
            setOpenSubmenuId(parentItem.id);
            return;
          } else {
            setOpenSubmenuId(null);
            return;
          }
        }
        for (const childItem of parentItem.subPaths || []) {
          const childPathSplit = childItem.path
            .split('/')
            .filter(pathPart => pathPart !== '');

          if (
            currentPathSplit.length >= 2 &&
            childPathSplit.length >= 2 &&
            currentPathSplit[1] === childPathSplit[1]
          ) {
            setOpenSubmenuId(parentItem.id);
            return;
          }
        }
      }
      setOpenSubmenuId(null);
    };

    findSelectedItems(ClientMenuItems);
  }, [router.pathname]);

  const handleClickChild = childPath => {
    router.push(childPath);
  };

  const handleClickParent = (parentId, parentPath) => {
    const hasChildPaths = ClientMenuItems.find(
      parentItem => parentItem.id === parentId
    )?.subPaths;
    const currentPathSplit = router.pathname
      .split('/')
      .filter(pathPart => pathPart !== '');
    const parentPathSplit = parentPath
      .split('/')
      .filter(pathPart => pathPart !== '');
    const currentPathCleaned = router.pathname
      .split('/')
      .filter(pathPart => pathPart !== '')
      .join('/');
    const parentPathCleaned = parentPath
      .split('/')
      .filter(pathPart => pathPart !== '')
      .join('/');

    if (currentPathCleaned !== parentPathCleaned && !hasChildPaths) {
      router?.push(parentPath);
    } else if (
      !hasChildPaths &&
      (currentPathSplit.length < 2 ||
        parentPathSplit.length < 2 ||
        currentPathSplit[1] !== parentPathSplit[1])
    ) {
      router?.push(parentPath);
    } else if (hasChildPaths) {
      setOpenSubmenuId(prev => (prev === parentId ? null : parentId));
    }
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Hidden smUp implementation="css">
        <Stack width="100%" alignItems="end">
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <ClearOutlined />
          </IconButton>
        </Stack>
      </Hidden>
      <Toolbar />
      <Divider />
      <List>
        {ClientMenuItems.map(parentItem => {
          const selected = (() => {
            const currentPath = router.pathname;
            const currentPathSplit = currentPath
              .split('/')
              .filter(pathPart => pathPart !== '');
            const parentPathSplit = parentItem.path
              .split('/')
              .filter(pathPart => pathPart !== '');

            if (
              currentPathSplit.length >= 2 &&
              parentPathSplit.length >= 2 &&
              currentPathSplit[1] === parentPathSplit[1]
            ) {
              return true;
            }

            for (const childItem of parentItem.subPaths || []) {
              const childPathSplit = childItem.path
                .split('/')
                .filter(pathPart => pathPart !== '');

              if (
                currentPathSplit.length >= 2 &&
                childPathSplit.length >= 2 &&
                currentPathSplit[1] === childPathSplit[1]
              ) {
                return true;
              }
            }

            return false;
          })();
          return (
            <div key={parentItem.id}>
              <ListItemButton
                onClick={() =>
                  handleClickParent(parentItem.id, parentItem.path)
                }
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
              </ListItemButton>
              {parentItem.subPaths && parentItem.subPaths.length > 0 && (
                <Collapse
                  in={openSubmenuId === parentItem.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {parentItem.subPaths.map(childItem => (
                      <ListItemButton
                        key={childItem.id}
                        selected={
                          router.pathname.includes(childItem.path) &&
                          childItem.path !== parentItem.path &&
                          childItem.path != '/'
                        }
                        onClick={() => handleClickChild(childItem.path)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{childItem.icon}</ListItemIcon>
                        <ListItemText primary={childItem.title} />
                      </ListItemButton>
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
      <AppBar position="fixed" sx={{ backgroundColor: 'white', height: 50 }}>
        <Toolbar>
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            <NavbarLogo>
              <NavbarLogoLink
                src={IMAGES?.LOGO}
                alt="logo"
                url={'/'}
                height="5px"
              />
            </NavbarLogo>
          </>
          <Box sx={{ marginLeft: 'auto' }}>
            <ClientMenuIcon />
          </Box>
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
          minHeight: '100vh',
          backgroundColor: '#ededed',
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
export default CommonLayout;
