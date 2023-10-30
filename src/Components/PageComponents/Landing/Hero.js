import ShadowButton from '@/buttonComponents/ShadowButton';
import TransparentButton from '@/buttonComponents/TransparentButton';
import HeroHeader from '@/headingComponents/HeroHeader';
import SubTitle from '@/headingComponents/SubTitle';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Container,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';

const Hero = () => {
  const theme = useTheme();
  const router = useRouter();
  const ButtonText = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '26.68px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '20.01px',
    },
  }));
  const CustomContainer = styled(Container)(({ theme }) => ({
    minHeight: '500px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }));

  return (
    <CustomContainer maxWidth="lg">
      <Container
        maxWidth="md"
        sx={{
          height: '436px',
          flex: '1',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <HeroHeader sx={{ flex: 1, alignSelf: 'start', maxWidth: '470px' }}>
          Unlock your potential. {<br />}Be a specialist in your niche.
        </HeroHeader>
        <SubTitle
          sx={{
            flex: 1,
            alignSelf: 'start',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '450px',

            [theme.breakpoints.down('sm')]: {
              textAlign: 'center',
              alignSelf: 'center',
            },
          }}
        >
          India’s first unified ML enabled marketplace connecting aspirants with
          businesses.
        </SubTitle>
        <Stack
          sx={{
            flex: 1,
            width: '100%',
            [theme.breakpoints.down('sm')]: {
              display: 'none !important',
            },
          }}
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <ShadowButton
            onClick={() => router.push('/login')}
            backgroundColor="#A62973"
            height="57.46px"
            width="181.01px"
          >
            <ButtonText color="#fff">Build your profile</ButtonText>
          </ShadowButton>

          <TransparentButton
            backgroundColor="#fff"
            color="purple"
            buttonText="Know more"
            heroBtn={false}
            onClick={() => router.push('/contact')}
            // icon={<PlayArrowIcon />}
          />
        </Stack>
      </Container>
      <Box
        sx={theme => ({
          flex: '1',
          height: '494px',
          [theme.breakpoints.down('sm')]: { height: '330px' },
        })}
      >
        <CommonImage
          src={IMAGES.HERO_IM1}
          alt="heroImg"
          style={{
            width: '100%',
            height: '100%',
            marginBottom: '2rem',
          }}
          priority={true}
        />
        <Stack
          sx={{
            flex: 1,
            width: '100%',
            display: 'none !important',
            [theme.breakpoints.down('sm')]: {
              display: 'flex !important',
            },
          }}
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <ShadowButton
            onClick={() => router.push('/login')}
            maxWidth="146px"
            backgroundColor="#A62973"
            height="50px"
            width="146px"
          >
            <ButtonText color="#fff">Build your profile</ButtonText>
          </ShadowButton>

          <TransparentButton
            backgroundColor="#fff"
            color="purple"
            buttonText="Learn more"
            heroBtn={false}
            icon={<PlayArrowIcon />}
          />
        </Stack>
      </Box>
    </CustomContainer>
  );
};

export default Hero;
