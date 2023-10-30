import ProfileCard from '@/cardComponents/ProfileCard';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import InfoIcon from '@mui/icons-material/Info';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  styled,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';

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
  {
    id: 1,
    name: 'Personal Info',
    icon: <AccountBoxOutlinedIcon />,
    path: '/profile/editprofile',
  },
  {
    id: 2,
    name: 'Education',
    icon: <CastForEducationOutlinedIcon />,
    path: '/profile/editprofile/education',
  },
  {
    id: 3,
    name: 'Experience',
    icon: <BusinessCenterOutlinedIcon />,
    path: '/profile/editprofile/experience',
  },
  {
    id: 4,
    name: 'Skills',
    icon: <TipsAndUpdatesOutlinedIcon />,
    path: '/profile/editprofile/skills',
  },
  {
    id: 5,
    name: 'Certifications',
    icon: <WorkspacePremiumIcon />,
    path: '/profile/editprofile/certifications',
  },
  {
    id: 6,
    name: 'Project Details',
    icon: <InfoIcon />,
    path: '/profile/editprofile/projectdetails',
  },
];

const LeftBar = () => {
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
    const selectedPage = ListArrayElements.find(
      item => item.path === router.pathname
    );
    setSelectedItem(selectedPage?.name || '');
  }, [router.pathname]);

  useEffect(() => {
    const pathName = router.pathname;
    console.log(pathName);
    const matchedElement = ListArrayElements.find(
      element => element.path === router.pathname
    );
    console.log(matchedElement);
    if (matchedElement) {
      setSelectedIndex(matchedElement.id);
    }
  }, []);
  const handleSelectionChange = useCallback(
    event => {
      const selectedPage = ListArrayElements.find(
        item => item.name === event.target.value
      );
      router.push(selectedPage.path);
      setSelectedItem(selectedPage.name);
    },
    [router]
  );

  const handleListItemClick = values => {
    router.push(values.path);
    setSelectedIndex(values.id);
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
        height={486}
        width={286}
        position="fixed"
      >
        <ProfileCard styleProps={{ padding: 0 }}>
          <StackStyled spacing={2} sx={{ px: 2 }} justifyContent="center">
            <Stack direction="row" spacing={1}>
              <IconButton
                disableRipple
                sx={{
                  padding: 0,
                  paddingLeft: 0.1,

                  color: '#121212',
                  margin: 0,
                }}
                size="large"
                aria-label="back"
                onClick={() => router.push('/profile')}
              >
                <ArrowBackIcon />
              </IconButton>
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
                    '& 	.MuiLinearProgress-bar1Determinate': {
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
          <StyledList>
            {ListArrayElements.map((values, index) => (
              <ListItemButton
                key={values.id}
                selected={selectedIndex === values.id}
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
                        fontWeight: selectedIndex === values.id ? '600' : '500',
                        color: selectedIndex === values.id ? 'red' : '#6A6A6A',
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

                  {/* {values.id === 4 && <Button>Update</Button>} */}
                </Stack>
              </ListItemButton>
            ))}
          </StyledList>
        </ProfileCard>
      </Box>
      <Box
        sx={{
          display: { xs: 'inherit', sm: 'inherit', md: 'none' },
          textAlign: 'end',
          mb: 2,
        }}
      >
        <Select
          sx={{ maxWidth: ' 300px' }}
          fullWidth
          value={selectedItem}
          onChange={handleSelectionChange}
        >
          {ListArrayElements.map(({ id, name, icon, path }) => (
            <MenuItem key={id} value={name} selected={router.pathname === path}>
              <Link href={path} legacyBehavior>
                <Stack alignItems={'center'} direction="row" spacing={2}>
                  {icon}
                  {name}
                </Stack>
              </Link>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default LeftBar;
