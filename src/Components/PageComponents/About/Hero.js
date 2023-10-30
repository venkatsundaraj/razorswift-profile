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
    fontSize: '38px',
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
    fontSize: '22px',
    fontWeight: '500',
    lineHeight: '41.8px',
    textAlign: 'inherit',
    padding: '0px 0px 20px 0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '26px',
    },
  }));

  const CustomContainer = styled(Container)(({ theme }) => ({
    minHeight: '354px',

    background:
      ' linear-gradient(270deg, #F7F2FF 0%, rgba(247, 242, 255, 0) 204.26%);',
    // display: 'flex',

    // justifyContent: 'space-evenly',
    // gap: 20,
    [theme.breakpoints.down('sm')]: {
      // flexDirection: 'column',
    },
  }));

  return (
    <CustomContainer maxWidth="xl" sx={{ ...marginBottom }}>
      <Grid
        sx={{ height: '100%' }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sm={12} md={6}>
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
                Human Asset Management shouldn’t be a
                <span style={{ color: '#EF5E6A' }}> hassle.</span>
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
                Leave it to us. We are RazorSwift.
              </HeroSubTitle>
            </Stack>
          </Container>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          container
          sx={{
            minHeight: '354px',
            justifyContent: 'flex-end',
            [theme.breakpoints.down('md')]: {
              minHeight: '250px',
              justifyContent: 'center',
            },
          }}
        >
          <Box
            sx={theme => ({
              flex: '1',
              marginBottom: 2,
              alignSelf: 'flex-end',
              height: '100%',
              width: '100%',
              maxHeight: '273px',
              maxWidth: '578px',
              [theme.breakpoints.down('sm')]: {
                maxHeight: '165px',
                alignSelf: 'center',
                maxWidth: '350px',
                marginBottom: 0,
              },
            })}
          >
            <CommonImage
              src={IMAGES.HERO_AB_IM1}
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
    </CustomContainer>
  );
};

export default Hero;
