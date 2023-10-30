import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';

const LeftLayout = ({ leftComponent, title, backButtonRequired }) => {
  const router = useRouter();
  const theme = useTheme();
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: { xs: '1rem', md: ' 2rem' },
    height: '700px',
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
    <CustomContainer maxWidth="xl">
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 1,
          backgroundColor: '#FAFAFA',
          [theme.breakpoints.down('md')]: {
            backgroundColor: 'transparent',
          },
          height: 1,
        }}
      >
        <Stack
          sx={{ maxWidth: '350px', padding: 2, paddingTop: 4 }}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Stack justifyContent="flex-start" alignItems="flex-start">
            {!backButtonRequired && (
              <IconButton
                disableRipple
                sx={{ color: '#292D32', mb: 2, padding: 0 }}
                size="large"
                aria-label="back"
                onClick={() => router.back()}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <HeroHeader sx={{ flex: 1 }}>{title}</HeroHeader>
          </Stack>
        </Stack>
      </Container>
      <Box sx={{ flex: 1, height: 1 }}>{leftComponent}</Box>
    </CustomContainer>
  );
};

export default LeftLayout;
