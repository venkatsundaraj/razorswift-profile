import ComingSoonButton from '@/buttonComponents/CommingSoonButton';
import ProfileCard from '@/cardComponents/ProfileCard';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExploreIcon from '@mui/icons-material/Explore';
import InboxIcon from '@mui/icons-material/Inbox';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import RouteIcon from '@mui/icons-material/Route';
import SchoolIcon from '@mui/icons-material/School';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { Box, Stack, styled } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

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

const ListArrayElements = [
  { id: 1, name: 'Profile', icon: <InboxIcon />, path: '/profile' },
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
    icon: <ModelTrainingIcon />,
    path: '/',
  },
  { id: 5, name: 'Mentors', icon: <SchoolIcon />, path: '/' },
  { id: 6, name: 'Courses', icon: <LibraryBooksIcon />, path: '/' },
  {
    id: 7,
    name: 'PathWay',
    icon: <RouteIcon />,
    path: '/',
    Subpath: [
      {
        id: 1,
        name: 'Enroll',
        icon: <SubscriptionsIcon />,
        path: '/pathway/enroll',
      },
      {
        id: 2,
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

  const data = context2 ? context2?.data : context1?.data;

  const [progress, setProgress] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const value = data?.profileCompletion?.profileCompletionPercentage;
    setProgress(value ? value : 0);
    console.log(data?.profileCompletion?.profileCompletionPercentage);
  }, [data]);

  useEffect(() => {
    const selectedPage = ListArrayElements.find(item =>
      router.pathname.startsWith(item.path)
    );
    setSelectedItem(selectedPage?.name || '');
  }, [router.pathname]);

  useEffect(() => {
    const pathName = router.pathname;
    console.log(pathName);
    const matchedElement = ListArrayElements.find(element =>
      router.pathname.startsWith(element.path)
    );
    console.log(matchedElement);
    if (matchedElement) {
      setSelectedIndex(matchedElement.id);
    }
  }, [router.pathname]);

  const handleListItemClick = values => {
    router.push(values.path);
    setSelectedIndex(values.id);
  };

  const renderListItem = (item, indentLevel = 0) => {
    const isSelected = selectedIndex === item.id;
    const hasSubpath = Array.isArray(item.Subpath) && item.Subpath.length > 0;

    const paddingLeft = 16 * indentLevel;

    return (
      <React.Fragment key={item.id}>
        <ListItemButton
          selected={isSelected}
          disabled={!hasSubpath && item.path === '/'}
          onClick={() => handleListItemClick(item)}
          sx={{
            paddingLeft: `${paddingLeft}px`,
            '&.Mui-disabled': {
              opacity: 1,
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Stack direction="row" alignItems="center" justifyContent="center">
              <ListItemIcon
                sx={{
                  fontWeight: isSelected ? '600' : '500',
                  color: isSelected ? 'red' : '#6A6A6A',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  isSelected ? (
                    <HighLightedListText>{item.name}</HighLightedListText>
                  ) : (
                    <NormalListText>{item.name}</NormalListText>
                  )
                }
              />
            </Stack>
            {!hasSubpath && item.path === '/' && <ComingSoonButton />}
          </Stack>
        </ListItemButton>
        {hasSubpath && (
          <List disablePadding>
            {item.Subpath.map(subpath =>
              renderListItem(subpath, indentLevel + 1)
            )}
          </List>
        )}
      </React.Fragment>
    );
  };

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
        height={700}
        width={286}
        position="fixed"
      >
        <ProfileCard styleProps={{ padding: 0 }}>
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
                    '& .MuiLinearProgress-bar1Determinate': {
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
                <span style={{ fontWeight: '700', color: '#1D1D1D' }}>
                  {` 20X `}
                </span>
                by showcasing your skills
              </Description>
            </Box>
          </StackStyled>
          <StyledList
            sx={{
              maxHeight: '400px',
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
            {ListArrayElements.map(item => renderListItem(item))}
          </StyledList>
        </ProfileCard>
      </Box>
    </Box>
  );
};

export default LeftBarView;
