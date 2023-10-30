import ComingSoonButton from '@/buttonComponents/CommingSoonButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Icon, ListItemSecondaryAction, Tooltip } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import navigation from './NavItems';

const Vertical = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [navItems, setNavItems] = useState(navigation);
  const [webPath, setWebPath] = useState([]);
  const router = useRouter();
  const [openTool, setOpenTool] = React.useState(false);

  const handleTooltipClose = () => {
    setOpenTool(false);
  };

  const handleTooltipOpen = () => {
    setOpenTool(true);
  };

  const handleListItemClick = (event, value) => {
    console.log('handleListItemClick');
    const trim = navItems.map((res, index) =>
      res.id === value.id
        ? {
            ...res,
            selected: !res.selected,
          }
        : {
            ...res,
            selected: false,
          }
    );
    setNavItems(prevState => ({
      ...prevState,
      ...trim,
    }));

    setNavItems(trim);
    setSelectedIndex(value.id);
    setOpen(false);
    if (value.path !== '/') router.push(value.path);
    else Swal.fire('', 'Coming soon!', 'success');
  };
  const handleSubListItemClick = (event, value) => {
    console.log('handleSubListItemClick');
    const trim = navItems.map((res, index) =>
      res.id === value.id
        ? {
            ...res,
            selected: !res.selected,
          }
        : {
            ...res,
            selected: false,
          }
    );
    setNavItems(prevState => ({
      ...prevState,
      ...trim,
    }));

    setNavItems(trim);
    setSelectedIndex(value.id);
    setOpen(false);
    if (value.title === 'Aspirants') router.push(value.path);
    else Swal.fire('', 'Coming soon!', 'success');
  };

  const handleClick = value => {
    console.log('handleClick');
    const trim = navItems.map((res, index) =>
      res.id === value.id
        ? {
            ...res,
            selected: !res.selected,
          }
        : {
            ...res,
            selected: false,
          }
    );
    setNavItems(prevState => ({
      ...prevState,
      ...trim,
    }));

    setNavItems(trim);
    setOpen(!open);
  };
  const CustomIcon = ({ icon }) => {
    switch (typeof icon) {
      case 'object':
        const iconType = typeof icon?.type;
        if (
          iconType === 'function' ||
          (iconType === 'object' && typeof icon.type?.render === 'function')
        ) {
          const Icon = icon;
          return <Icon />;
        }
        if (icon.props) {
          return icon;
        }
        return <>{icon}</>;
      case 'function':
        return icon();
      case 'string':
        if (icon.indexOf('svg') > -1) {
          return icon;
        }
        return <Icon>{icon}</Icon>;
      default:
        return <span>Iconless</span>;
    }
  };
  useEffect(() => {
    const paths = window.location.pathname;

    var arrVars = paths.split('/');

    const results = arrVars.filter(element => {
      return element !== '';
    });

    setWebPath(results);
  }, [window.location.pathname]);

  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {navItems.map((value, index) => (
          <Box key={value.title}>
            {value.path != '/' && (
              <ListItemButton
                key={value.title}
                selected={webPath.includes(value.path.replace('/', ''))}
                onClick={event =>
                  value.subPaths?.length >= 0
                    ? handleClick(value)
                    : handleListItemClick(event, value)
                }
              >
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText primary={value.title} />
                <ListItemSecondaryAction>
                  {value.subPaths?.length > 0 &&
                    (webPath.includes(value.path.replace('/', '')) ||
                    value.selected ? (
                      <ExpandLess onClick={handleClick} />
                    ) : (
                      <ExpandMore onClick={handleClick} />
                    ))}
                </ListItemSecondaryAction>
              </ListItemButton>
            )}
            {value.path === '/' && (
              <ListItemButton
                key={value.title}
                selected={webPath.includes(value.path.replace('/', ''))}
                onClick={event =>
                  value.subPaths?.length >= 0
                    ? handleClick(value)
                    : handleListItemClick(event, value)
                }
              >
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText primary={value.title} />
                <ListItemSecondaryAction>
                  {value.subPaths?.length > 0 &&
                    (webPath.includes(value.path.replace('/', '')) ||
                    value.selected ? (
                      <ExpandLess onClick={handleClick} />
                    ) : (
                      <ExpandMore onClick={handleClick} />
                    ))}
                </ListItemSecondaryAction>
                <ComingSoonButton />
              </ListItemButton>
            )}

            {value.subPaths?.length > 0 && (
              <Collapse
                in={
                  webPath.includes(value.path.replace('/', '')) ||
                  value.selected
                }
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {value.subPaths.map((values, index) => (
                    <>
                      {values.title === 'Aspirants' && (
                        <ListItemButton
                          selected={webPath.includes(
                            values?.path?.substring(
                              values?.path?.lastIndexOf('/') + 1
                            )
                          )}
                          key={values.id}
                          sx={{ padding: '0.5px', pl: 8 }}
                          onClick={event =>
                            handleSubListItemClick(event, values)
                          }
                        >
                          {/* <ListItemIcon>
                      <CustomIcon icon={values.icon} />
                    </ListItemIcon> */}
                          <ListItemText
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: '#6A6A6A',
                                fontSize: '12px',
                                fontWeight: '14.4px',
                              },
                            }}
                            primary={values.title}
                          />
                        </ListItemButton>
                      )}

                      {values.title !== 'Aspirants' && (
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                          <div>
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              open={openTool}
                              title="Coming Soon"
                              arrow
                            >
                              <ListItemButton
                                // selected={webPath.includes(
                                //   values?.path?.substring(
                                //     values?.path?.lastIndexOf('/') + 1
                                //   )
                                // )}

                                onClick={event =>
                                  handleSubListItemClick(event, values)
                                }
                                key={values.id}
                                sx={{ padding: '0.5px', pl: 8 }}
                              >
                                <ListItemText
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      color: '#6A6A6A',
                                      fontSize: '12px',
                                      fontWeight: '14.4px',
                                    },
                                  }}
                                  primary={values.title}
                                />
                                <ComingSoonButton />
                              </ListItemButton>
                            </Tooltip>
                          </div>
                        </ClickAwayListener>
                      )}
                    </>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </>
  );
};

export default Vertical;
