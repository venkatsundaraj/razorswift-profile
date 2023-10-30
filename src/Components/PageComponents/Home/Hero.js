import ShadowButton from '@/buttonComponents/ShadowButton';
import HeroHeader from '@/headingComponents/HeroHeader';
import SubTitle from '@/headingComponents/SubTitle';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import {
  Box,
  Container,
  Link,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { marginBottom } from 'src/utils/commonStyles';

const Hero = () => {
  const theme = useTheme();
  const router = useRouter();

  const PhoneNumberText = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    textTransform: 'none',
    color: '#1D1D1D',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '31.68px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',

      lineHeight: '24px',
    },
  }));

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
  const CustomBox = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'start',

    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
    },
  }));

  const ColouredText = ({ text }) => {
    return (
      <span
        style={{
          background: '-webkit-linear-gradient(#F1231A,#FE8B86)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </span>
    );
  };

  return (
    <CustomContainer maxWidth="lg" sx={{ ...marginBottom }}>
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
        <CustomBox>
          <HeroHeader sx={{ padding: 0, alignSelf: 'start', width: '100%' }}>
            Empowering {<ColouredText text="Talent." />}
          </HeroHeader>
          <HeroHeader sx={{ padding: 0, alignSelf: 'start', width: '100%' }}>
            Enabling {<ColouredText text="Growth." />}
          </HeroHeader>
        </CustomBox>
        <SubTitle
          sx={{
            flex: 1,
            alignSelf: 'start',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '450px',
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
            onClick={() => {
              const dropdownvalue = { value: 'demo' };
              router.push({
                pathname: '/contact',
                query: dropdownvalue,
              });
            }}
            backgroundColor="#A62973"
            height="57.46px"
            width="181.01px"
          >
            <ButtonText color="#fff">Get a demo</ButtonText>
          </ShadowButton>

          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
          >
            <CommonImage
              src={IMAGES.S_EP_B_Top_Icon_IM1}
              alt="heroImg"
              style={{ width: '24px', height: '24px', marginRight: 5 }}
            />
            <PhoneNumberText href="tel:8105060951">8105060951</PhoneNumberText>
          </Stack>
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
          src={IMAGES.HERO_H_IM1}
          alt="HeroImg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
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
            onClick={() => {
              const dropdownvalue = { value: 'demo' };
              router.push({
                pathname: '/contact',
                query: dropdownvalue,
              });
            }}
            maxWidth="146px"
            backgroundColor="#A62973"
            height="50px"
            width="146px"
          >
            <ButtonText color="#fff">Get a demo</ButtonText>
          </ShadowButton>

          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
          >
            <CommonImage
              src={IMAGES.S_EP_B_Top_Icon_IM1}
              alt="heroImg"
              style={{ width: '24px', height: '24px', marginRight: 5 }}
            />
            <PhoneNumberText href="tel:8105060951">8105060951</PhoneNumberText>
          </Stack>
        </Stack>
      </Box>
    </CustomContainer>
  );
};

export default Hero;
