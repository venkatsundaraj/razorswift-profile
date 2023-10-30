import LeftBar from '@/pageComponents/Profile/LeftBar';
import LeftBarView from '@/pageComponents/Profile/LeftBarView';

import {
  Box,
  Container,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';

const ProfileLayout = ({ rightComponent, title, viewBar, sidebar }) => {
  const router = useRouter();
  const theme = useTheme();
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    '&.MuiContainer-root': {
      padding: 0,
      margin: 0,
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100%',
    },
  }));
  const HeroHeader = styled(Typography)(({ theme }) => ({
    color: '#1D1D1D',
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '47.6px',
    textAlign: 'inherit',
    padding: '0px 0px 20px 0px',
    [theme.breakpoints.down('md')]: {
      fontSize: '22px',
      lineHeight: '34px',
    },
  }));
  return (
    <Container
      maxWidth={sidebar ? 'md' : 'lg'}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={2}
        sx={{ maxWidth: 'lg', width: '100%' }}
      >
        {sidebar ? null : viewBar ? <LeftBarView /> : <LeftBar />}
        <Box
          alignSelf="flex-start"
          flex={2.25}
          sx={{ justifyContent: 'center', width: '100%' }}
        >
          {rightComponent}
        </Box>
      </Stack>
    </Container>
  );
};

export default ProfileLayout;
