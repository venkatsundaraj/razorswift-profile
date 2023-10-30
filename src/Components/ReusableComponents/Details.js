import PageTitle from '@/headingComponents/PageTitle';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import { Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { marginTopBottom } from 'src/utils/commonStyles';
const Details = ({ arrayDetails, condition }) => {
  const theme = useTheme();
  const ShadowTextSubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    color: '#1D1D1D',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '24.3px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      lineHeight: '19.4px',
    },
  }));
  const ShadowTextTitle = styled(Typography)(({ theme }) => ({
    fontSize: '45px',
    lineHeight: '53.5px',
    color: '#ED5063',
    fontWeight: '800',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px',
      lineHeight: '42.4px',
    },
    textShadow: '5px 2px rgba(237, 80, 99, 0.28)',
  }));

  return (
    <Container
      maxWidth="lg"
      sx={{
        background: condition ? '#FFFAF5' : '#ffffff',
        ...marginTopBottom,
        padding: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        position={condition ? 'relative' : 'initial'}
      >
        <PageTitle sx={{ alignSelf: 'center', textAlign: 'center' }}>
          Did you know?
        </PageTitle>
        {condition && (
          <CommonImage
            src={IMAGES.D_H_IM1}
            alt="heroImg"
            style={{
              width: '65px',
              height: '54px',
              marginBottom: '2rem',
              position: 'absolute',
              top: '-26px',
              right: '-14px',
            }}
            height="65px"
            width="54px"
          />
        )}
      </Stack>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {arrayDetails.map((values, index) => (
            <Grid item xs={6} sm={3} key={values.id}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  maxWidth: '160px',
                  // [theme.breakpoints.down('sm')]: {
                  //   maxWidth: '104px',
                  // },
                }}
              >
                <ShadowTextTitle sx={{ maxWidth: '160px' }}>
                  {values.value}
                </ShadowTextTitle>
                <ShadowTextSubTitle sx={{ maxWidth: '160px' }}>
                  {values.text}
                </ShadowTextSubTitle>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Details;
