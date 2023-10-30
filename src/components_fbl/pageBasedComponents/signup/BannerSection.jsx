import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import { bannerSection } from '@/constants/Signup/signupPageData';
import { Box, Container, Grid } from '@mui/material';

function BannerSection() {
  return (
    <Box sx={{ minHeight: '100vh' }} component="section">
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <CustomImage
              src={bannerSection.bannerImage}
              width="100%"
              height="100%"
              aspectRatio="1/1"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default BannerSection;
