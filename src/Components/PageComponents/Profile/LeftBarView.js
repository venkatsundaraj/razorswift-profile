import ComingSoonButton from '@/buttonComponents/CommingSoonButton';
import ProfileCard from '@/cardComponents/ProfileCard';
import useLeftBarViewMenuItem from '@/customHooks/useLeftBarViewMenuItem';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExploreIcon from '@mui/icons-material/Explore';
import InboxIcon from '@mui/icons-material/Inbox';
import RouteIcon from '@mui/icons-material/Route';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { Box, Collapse, MenuItem, Select, Stack, styled } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

const DELIMITER = '/';

const Header = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1A1A1A',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '21.6px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '19.2px',
  },
}));

const ProfileStrength = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1A1A1A',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '16.8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const Value = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#EF5E6A',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '19.2px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '19.2px',
  },
}));
const Description = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#6A6A6A',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '21px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '21px',
  },
}));

const StackStyled = styled(Stack)(({ theme }) => ({
  height: '190px',
  width: '100%',
  background:
    'linear-gradient(96.8deg, rgba(251, 132, 125, 0.1) -28.7%, rgba(251, 132, 125, 0) 102.42%);',
}));

const StyledList = styled(List)({
  // selected and (selected + hover) states
  '&& .Mui-selected, && .Mui-selected:hover': {
    backgroundColor: 'transparent',

    '&, & .MuiListItemIcon-root': {
      color: '#1D1D1D',
      fontWeight: 'bolder',
    },
  },
  // hover states
  '& .MuiListItemButton-root:hover': {
    backgroundColor: 'transparent',
    '&, & .MuiListItemIcon-root': {
      color: '#6A6A6A',
    },
  },
});

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#6A6A6A',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '18px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
  },
}));
const HighLightedListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '18px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
  },
}));

const ListArrayElementss = [
  {
    id: 1,
    name: 'Profile',
    icon: <InboxIcon />,
    path: '/profile',
  },
  {
    id: 2,
    name: 'Assessments',
    icon: <AssessmentIcon />,
    path: '/assessment',
  },
  {
    id: 3,
    name: 'Job openings',
    icon: <AssessmentIcon />,
    path: '/jobopenings',
  },
  {
    id: 4,
    name: 'Virtual Internships',
    icon: <AssessmentIcon />,
    path: '/',
  },
  // { id: 5, name: 'Mentors', icon: <SchoolIcon />, path: '/' },
  // { id: 6, name: 'Courses', icon: <LibraryBooksIcon />, path: '/' },
  {
    id: 7,
    name: 'Pathway',
    icon: <RouteIcon />,
    path: '/pathway',
    Subpath: [
      {
        subid: 1,
        name: 'Enroll',
        icon: <SubscriptionsIcon />,
        path: '/pathway/enroll',
      },
      {
        subid: 2,
        name: 'Explore',
        icon: <ExploreIcon />,
        path: '/pathway/explore',
      },
    ],
  },
];

const LeftBarView = () => {
  const router = useRouter();
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const ListArrayElements = useLeftBarViewMenuItem();

  const data = context2 ? context2?.data : context1?.data;

  const [progress, setProgress] = React.useState(0);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedItem, setSelectedItem] = useState('');
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const [selectedSubpath, setSelectedSubpath] = useState('');
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const value = data?.profileCompletion?.profileCompletionPercentage;
    setProgress(value ? value : 0);
    console.log(data?.profileCompletion?.profileCompletionPercentage);
  }, [data]);

  useEffect(() => {
    const selectedPage = ListArrayElements.find(item =>
      router.pathname.startsWith(item.path)
    );
    console.log(selectedPage, 'selectedPage');

    if (selectedPage) {
      setSelectedItem(selectedPage.name);
      console.log(selectedItem, 'selectedItem');

      // Highlight the clicked submenu item (if applicable)
      const selectedSubpath = selectedPage.Subpath?.find(subpath =>
        router.pathname.startsWith(subpath.path)
      );
      setSelectedSubpath(selectedSubpath?.name || '');
      console.log('pathh', selectedSubpath?.name);
      // Check if the selected page has a submenu and if it's already open
      if (selectedPage.Subpath && openSubmenuId !== selectedPage.id) {
        setOpenSubmenuId(selectedPage.id);
      }
    }
  }, [router.pathname, openSubmenuId]);

  useEffect(() => {
    const pathName = router.pathname;
    const matchedElement = ListArrayElements.find(element =>
      router.pathname.startsWith(element.path)
    );

    if (matchedElement) {
      setSelectedIndex(matchedElement.id);
    }
  }, [router.pathname]);

  // const handleSelectionChange = useCallback(
  //   event => {
  //     const selectedPage = ListArrayElements.find(
  //       item => item.name === event.target.value
  //     );
  //     router.push(selectedPage.path);
  //     setSelectedItem(selectedPage.name);
  //   },
  //   [router]
  // );
  const handleSelectionChange = useCallback(
    event => {
      const selectedValue = event.target.value;
      const selectedPage = ListArrayElements.find(
        item => item.name === selectedValue.split(DELIMITER)[0]
      );

      if (selectedPage) {
        if (selectedValue.includes(DELIMITER)) {
          // Submenu item selected, set the selected item to the main menu item's name
          setSelectedItem(selectedPage.name);
          const selectedSubpath = selectedPage.Subpath.find(
            subpath => subpath.name === selectedValue.split(DELIMITER)[1]
          );
          if (selectedSubpath) {
            router.push(selectedSubpath.path);
            setSelectedSubpath(selectedSubpath.name);
          }
        } else {
          // Main menu item selected
          router.push(selectedPage.path);
          setSelectedItem(selectedValue); // Set the selected item directly
          setSelectedSubpath(''); // Reset the selected submenu when navigating to a new page without a subpath
          setOpenSubmenuId(null); // Close the currently open submenu (if any)
        }
      }
      setIsOpen(false); // Close the mobile version dropdown after selecting an item
    },
    [router]
  );

  const handleListItemClick = useCallback(
    values => {
      // Common logic for both cases (submenu and main path)
      setSelectedItem(values.name);

      // Check if the clicked element has a submenu
      if (values.Subpath) {
        // Check if the submenu is already open
        const isSubpathOpen = openSubmenuId === values.id;

        // If it's the same parent element's submenu, keep it open and navigate to the subpath
        if (isSubpathOpen) {
          router.push(values.path);
          setSelectedSubpath(values.name);
          return;
        }

        // If it's a different parent element's submenu, close the currently open submenu
        setOpenSubmenuId(values.id);

        // Highlight the clicked submenu item
        const selectedSubpath = values.Subpath.find(subpath =>
          router.pathname.startsWith(subpath.path)
        );
        setSelectedSubpath(selectedSubpath?.name || '');
      } else {
        // If it doesn't have a submenu, navigate to the path
        router.push(values.path);

        // Highlight the clicked menu item without a subpath
        setSelectedIndex(values.id);
        setSelectedSubpath(''); // Reset the selected submenu when navigating to a new page without a subpath

        // Close the currently open submenu (if any)
        setOpenSubmenuId(null);
      }
    },
    [router, openSubmenuId]
  );

  return (
    <Box
      flex={1}
      alignSelf="flex-start"
      sx={{
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{ display: { xs: 'none', sm: 'none', md: 'inherit' } }}
        width={286}
        position="fixed"
      >
        <ProfileCard styleProps={{ padding: 0 }} ref={sidebarRef}>
          <StackStyled spacing={2} sx={{ px: 2 }} justifyContent="center">
            <Stack direction="row" spacing={1}>
              <Header>Your profile</Header>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <ProfileStrength>Profile Strength</ProfileStrength>
                <Value>{progress}%</Value>
              </Stack>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    '& .MuiLinearProgress-colorPrimary': {
                      backgroundColor: 'white',
                    },
                    '&  .MuiLinearProgress-bar1Determinate': {
                      backgroundColor: '#EF5E6A',
                    },
                    '& .MuiLinearProgress-determinate': {
                      backgroundColor: '#121212 !important',
                    },
                  }}
                  value={progress}
                />
              </Box>
            </Stack>
            <Box>
              <Description>
                Improve your chances of getting hired
                <span
                  style={{ fontWeight: '700', color: '#1D1D1D' }}
                >{` 20X `}</span>
                by showcasing your skills
              </Description>
            </Box>
          </StackStyled>
          <StyledList
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: 5,
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            }}
          >
            {ListArrayElements.map((values, index) => {
              if (values.Subpath) {
                const isParentSelected = selectedIndex === values.id;
                const isSubpathOpen = openSubmenuId === values.id;

                return (
                  <React.Fragment key={values.id}>
                    <ListItemButton
                      sx={{
                        '&.Mui-disabled': {
                          opacity: 1,
                        },
                      }}
                      selected={isParentSelected}
                      onClick={() => handleListItemClick(values)}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: '100%' }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <ListItemIcon
                            sx={{
                              fontWeight: isParentSelected ? '600' : '500',
                              color: isParentSelected ? 'red' : '#6A6A6A',
                            }}
                          >
                            {values.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              isParentSelected ? (
                                <HighLightedListText>
                                  {values.name}
                                </HighLightedListText>
                              ) : (
                                <NormalListText>{values.name}</NormalListText>
                              )
                            }
                          />
                        </Stack>
                        {isSubpathOpen ? <ExpandLess /> : <ExpandMore />}
                      </Stack>
                    </ListItemButton>
                    <Collapse in={isSubpathOpen}>
                      {values.Subpath.map(subpath => (
                        <ListItemButton
                          key={subpath.subid}
                          selected={router.pathname === subpath.path}
                          onClick={() => handleListItemClick(subpath)}
                          sx={{ paddingLeft: 10 }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <ListItemIcon>{subpath.icon}</ListItemIcon>
                              <ListItemText primary={subpath.name} />
                            </Stack>
                          </Stack>
                        </ListItemButton>
                      ))}
                    </Collapse>
                  </React.Fragment>
                );
              } else {
                return (
                  <ListItemButton
                    key={values.id}
                    selected={selectedIndex === values.id}
                    disabled={values.path === '/'}
                    onClick={() => handleListItemClick(values)}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ width: '100%' }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ListItemIcon
                          sx={{
                            fontWeight:
                              selectedIndex === values.id ? '600' : '500',
                            color:
                              selectedIndex === values.id ? 'red' : '#6A6A6A',
                          }}
                        >
                          {values.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            selectedIndex === values.id ? (
                              <HighLightedListText>
                                {values.name}
                              </HighLightedListText>
                            ) : (
                              <NormalListText>{values.name}</NormalListText>
                            )
                          }
                        />
                      </Stack>
                      {values.path === '/' && <ComingSoonButton />}
                    </Stack>
                  </ListItemButton>
                );
              }
            })}
          </StyledList>
        </ProfileCard>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', sm: 'block', md: 'none' },
          pt: 4,
          mb: 2,
        }}
        textAlign="end"
      >
        {console.log(
          selectedItem,
          'shsshshsh',
          selectedSubpath ? DELIMITER + selectedSubpath : ''
        )}
        <Select
          sx={{ maxWidth: '300px' }}
          fullWidth
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          value={
            selectedItem + (selectedSubpath ? DELIMITER + selectedSubpath : '')
          }
          onChange={handleSelectionChange}
        >
          {ListArrayElements.map(({ id, name, path, Subpath, icon }) => {
            const menuItems = [];

            if (Subpath) {
              menuItems.push(
                <MenuItem key={id} value={name} disabled>
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <Typography>{name}</Typography>
                  </Stack>
                </MenuItem>
              );

              Subpath.forEach(subpath => {
                console.log(
                  `${name}${DELIMITER}${subpath.name}`,
                  '`${name}${DELIMITER}${subpath.name}`'
                );
                const subpathValue = `${name}${DELIMITER}${subpath.name}`; // Construct the value for the submenu item
                menuItems.push(
                  <MenuItem
                    key={subpath.subid}
                    value={subpathValue}
                    selected={router.pathname === subpath.path}
                    onClick={() => handleListItemClick(subpath)}
                    sx={{ pl: 5 }}
                  >
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <ListItemIcon>{subpath.icon}</ListItemIcon>
                      <Typography>{subpath.name}</Typography>
                    </Stack>
                  </MenuItem>
                );
              });
            } else {
              menuItems.push(
                <MenuItem
                  disabled={path === '/'}
                  key={id}
                  value={name}
                  selected={router.pathname === path}
                  onClick={() => handleListItemClick({ id, name, icon, path })}
                >
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <Typography>{name}</Typography>
                    {path === '/' && <ComingSoonButton />}
                  </Stack>
                </MenuItem>
              );
            }

            return menuItems;
          })}
        </Select>
      </Box>
    </Box>
  );
};

export default LeftBarView;
