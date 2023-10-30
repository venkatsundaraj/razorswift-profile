import ShadowButton from '@/buttonComponents/ShadowButton';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Container, Link, Stack, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { marginTopBottom } from 'src/utils/commonStyles';

const BookDemo = () => {
  const router = useRouter();
  const ButtonText = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '26.68px',
    color: '#434343',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '20.01px',
    },
  }));
  const TitleText = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '38px',
    lineHeight: '53.8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '36px',
    },
  }));
  const InfoText = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '31.86px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      lineHeight: '22px',
    },
  }));

  const PhoneNumberText = styled(Typography)(({ theme }) => ({
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
  return (
    <Container
      maxWidth="xl"
      sx={{
        background:
          ' radial-gradient(270.56% 196.46% at 52.42% 162.67%, #FB847D 0%, #672376 100%);',
        height: 275,
        ...marginTopBottom,
        marginBottom: 0,
      }}
    >
      <Container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: 1,
          gap: 4,
        }}
      >
        <TitleText>Grow your team and your business with us</TitleText>

        <ShadowButton
          onClick={() => {
            const dropdownvalue = { value: 'demo' };
            router.push({
              pathname: '/contact',
              query: dropdownvalue,
            });
          }}
          // target="_blank"
          // href="https://docs.google.com/forms/d/e/1FAIpQLScnJEks0SSr3c8gs3TSYpNS8_dqI2ZZqDW5yCUDJtBxAUj1Dw/viewform?usp=sf_link"
          href="/contact"
          size="large"
          height="66px"
          backgroundColor="#fff"
        >
          <ButtonText color="#000">Book a Demo</ButtonText>
        </ShadowButton>

        <Stack
          direction="row"
          spacing={3}
          justifyContent={'center'}
          alignItems="center"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <CommonImage
              src={IMAGES.S_EP_B_Top_Icon_IM1}
              alt="heroImg"
              style={{ width: '24px', height: '24px', marginRight: 5 }}
            />
            <InfoText href="tel:8105060951" sx={{ textDecoration: 'none' }}>
              8105060951
            </InfoText>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={'center'}
            alignItems="center"
          >
            <MailOutlineIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            <InfoText
              href="mailto:info@razorswift.net"
              target="_top"
              sx={{ textDecoration: 'underline' }}
            >
              info@razorswift.net
            </InfoText>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
};

export default BookDemo;
