import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import { bannerSection } from '@/constants/Signup/signupPageData';
import SignupForm from '@/src/components_fbl/pageBasedComponents/Log-in/LoginForm';
import { Container, Grid } from '@mui/material';

function BannerSection() {
  return (
    <CustomSection style={{ padding: 'clamp(40px,7vw, 76px) 0 ' }}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <SignupForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomImage
              src={bannerSection.logInBanner}
              width="100%"
              height="100%"
              aspectRatio="31/30"
            />
          </Grid>
        </Grid>
      </Container>
    </CustomSection>
  );
}

export default BannerSection;
