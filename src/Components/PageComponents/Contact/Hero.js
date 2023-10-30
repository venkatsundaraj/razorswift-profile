import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import {
  Box,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { marginBottom } from 'src/utils/commonStyles';

const Hero = () => {
  const theme = useTheme();

  const HeroHeader = styled(Typography)(({ theme }) => ({
    color: '#1D1D1D',
    fontSize: '42px',
    fontWeight: '700',
    lineHeight: '60px',
    textAlign: 'inherit',
    padding: '0px 0px 20px 0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
      lineHeight: '42px',
    },
  }));
  const HeroSubTitle = styled(Typography)(({ theme }) => ({
    color: '#1D1D1D',
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '38px',
    textAlign: 'inherit',
    padding: '0px 0px 20px 0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '26px',
    },
  }));

  const CustomContainer = styled(Container)(({ theme }) => ({
    minHeight: '354px',
    background:
      ' linear-gradient(193.26deg, rgba(251, 132, 125, 0.1) -14.26%, rgba(251, 132, 125, 0.017) 45.25%);',
    // display: 'flex',

    // justifyContent: 'space-evenly',
    // gap: 20,
    [theme.breakpoints.down('sm')]: {
      // flexDirection: 'column',
    },
  }));

  return (
    <CustomContainer maxWidth="xl" sx={{ ...marginBottom }}>
      <Box sx={{ maxWidth: 'lg', margin: 'auto' }}>
        <Grid
          sx={{ height: '100%' }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={12} md={6} order={{ xs: 2, sm: 1 }}>
            <Container
              maxWidth="sm"
              sx={{
                alignSelf: 'center',
              }}
            >
              <Stack spacing={{ xs: 1, sm: 2, md: 3 }}>
                <HeroHeader
                  sx={{
                    padding: 0,
                    paddingTop: 2,
                    alignSelf: 'start',
                    width: '100%',
                    maxWidth: '500px',
                  }}
                >
                  Contact us
                </HeroHeader>

                <HeroSubTitle
                  sx={{
                    flex: 1,
                    alignSelf: 'start',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '450px',
                  }}
                >
                  Get in touch with the Razorswift team and we'll get back to
                  you and help as soon as we can!
                </HeroSubTitle>
              </Stack>
            </Container>
          </Grid>
          <Grid
            order={{ xs: 1, sm: 2 }}
            item
            sm={12}
            md={6}
            container
            sx={{
              minHeight: '354px',
              justifyContent: 'flex-end',
              [theme.breakpoints.down('md')]: {
                minHeight: '250px',
              },
            }}
          >
            <Box
              sx={theme => ({
                flex: '1',
                alignSelf: 'flex-end',
                height: '100%',
                width: '100%',
                maxHeight: '273px',
                maxWidth: '578px',
                [theme.breakpoints.down('sm')]: {
                  maxHeight: '165px',
                  alignSelf: 'center',
                  maxWidth: '250px',
                },
              })}
            >
              <CommonImage
                src={IMAGES.HERO_CON_IM1}
                alt="HeroImg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  marginBottom: '2rem',
                }}
                priority={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CustomContainer>
  );
};

export default Hero;
