import HeroHeader from '@/headingComponents/HeroHeader';
import SubTitle from '@/headingComponents/SubTitle';

import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import { Box, Container, styled, useTheme } from '@mui/material';

const AuthLayout = ({ leftComponent, headerText }) => {
  const theme = useTheme();
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: '2rem',
    height: '700px',
    '&.MuiContainer-root': {
      padding: 0,
      margin: 0,
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }));
  return (
    <CustomContainer maxWidth="xl">
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flex: 1,
          [theme.breakpoints.down('md')]: {
            display: 'none !important',
          },
          height: 1,
          background:
            'linear-gradient(180deg, rgba(251, 132, 125, 0.1) 0%, rgba(251, 132, 125, 0) 190.77%)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            // height: '414px',
            // width: '315px',
            flex: '1',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Box sx={{ width: '400px' }}>
            <HeroHeader sx={{ flex: 1, alignSelf: 'center' }}>
              Showcase your Talent, Upskill and Get Hired Faster
            </HeroHeader>

            <SubTitle
              sx={{
                height: '68px',
                width: '300px',
                flex: 1,
                alignSelf: 'start',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              Get your dream job, over 100k opportunities
            </SubTitle>
          </Box>
          <CommonImage
            src={IMAGES.INTRO_IMAGE}
            alt="heroImg"
            style={{
              alignSelf: 'end',

              marginBottom: '2rem',
            }}
            width="35vw"
            height="45vh"
          />
        </Container>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          // height: '414px',
          // width: '315px'
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          display: 'none !important',
          [theme.breakpoints.down('md')]: {
            display: 'block !important',
          },
        }}
      >
        <Box
          sx={{
            width: '400px',
            [theme.breakpoints.down('md')]: {
              width: 'auto',
              textAlign: 'center',
            },
          }}
        >
          <HeroHeader sx={{ flex: 1, alignSelf: 'center' }}>
            {headerText
              ? headerText
              : 'Showcase your Talent, Upskill and Get Hired Faster'}
          </HeroHeader>
        </Box>
      </Container>
      <Box sx={{ flex: 1, height: 1 }}>{leftComponent}</Box>
    </CustomContainer>
  );
};

export default AuthLayout;
