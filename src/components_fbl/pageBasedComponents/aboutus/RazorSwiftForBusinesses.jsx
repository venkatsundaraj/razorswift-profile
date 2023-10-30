import FastrackCardLists from '@/components_fbl/CardComponents/AspirantCards/FastrackCardLists';
import razorswiftforbusiness from '@/constants/Aboutus/razorswiftforbusiness';
import razorswiftforbusinesscont from '@/constants/Aboutus/razorswiftforbusinesscont';
import razorswiftforbusinesstwo from '@/constants/Aboutus/razorswiftforbusinesstwo';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
const RazorSwiftForBusinesses = () => {
  const numbersec = {
    fontSize: 'clamp(30px, 2.4vw, 40px)',
  };
  const numbersecdescription = {
    fontSize: 'clamp(10px, 1.1vw, 16px)',
  };
  return (
    <Container sx={{ marginTop: '100px' }}>
      <Grid alignItems="center" container spacing={3}>
        <Grid item xs={12} md={12} lg={6}>
          <Typography
            sx={{
              fontSize: '44px',
              fontWeight: '600',
              color: 'primary.mainone',
            }}
          >
            RazorSwift For Businesses
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'primary.headaboutus',
              textAlign: 'justify',
            }}
          >
            {razorswiftforbusinesscont[0].title}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '50px' }}>
        <Grid justifyContent="center" alignItems="center" container spacing={3}>
          <Grid sx={{ alignSelf: 'flex-start' }} item xs={12} md={12} lg={6}>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '500',
                color: 'primary.paragrey',
                textAlign: 'justify',
              }}
            >
              {razorswiftforbusinesscont[0].description}
            </Typography>
          </Grid>
          <Grid sx={{ height: { lg: '400px' } }} item xs={12} md={6} lg={3}>
            <Stack
              sx={{ height: '100%', gap: 2 }}
              alignItems={{ xs: 'center', md: 'end' }}
              justifyContent="start"
              flexDirection="column"
            >
              <FastrackCardLists
                sx={{ alignSelf: 'start', width: '50%' }}
                lists={razorswiftforbusiness}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Stack
              sx={{ height: '100%', gap: 2 }}
              alignItems={{ xs: 'center', md: 'start' }}
              justifyContent="end"
              flexDirection="column"
            >
              <FastrackCardLists
                sx={{ alignSelf: 'start', width: '50%' }}
                lists={razorswiftforbusinesstwo}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RazorSwiftForBusinesses;
