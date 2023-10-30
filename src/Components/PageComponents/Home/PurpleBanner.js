import { Container, Stack, styled, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './../../../../styles/Testimonials.module.css';

const Title = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '47.8px',
  textAlign: 'inherit',
  //   padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const PurpleBanner = () => {
  const theme = useTheme();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <Container
      maxWidth="xl"
      sx={{
        // minHeight: '500.62px',
        width: '100%',
        padding: 2,
        backgroundColor: '#3C1443',
        [theme.breakpoints.down('sm')]: {
          //   minHeight: '266px',
        },
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Title sx={{ textAlign: 'center', width: '100%' }}>
          Human Asset Management shouldn’t be a hassle.
        </Title>
        <Title sx={{ textAlign: 'center', width: '100%' }}>
          Leave it to us.
        </Title>
        <Title sx={{ textAlign: 'center', width: '100%' }}>
          We are RazorSwift.
        </Title>
      </Stack>
    </Container>
  );
};

export default PurpleBanner;
