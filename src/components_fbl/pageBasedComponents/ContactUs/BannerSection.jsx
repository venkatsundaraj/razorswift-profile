import FormSection from '@/components_fbl/FormComponents/FormSection';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { heroSection } from '@/constants/ContactUs/contactUsPageData';
import { Box, Container, Grid, Stack } from '@mui/material';

function BannerSection() {
  return (
    <CustomSection style={{ padding: 'clamp(96px,10vw, 136px) 0 24px' }}>
      <Container>
        <Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6}>
              <PrimaryHeading
                component="h1"
                sx={{
                  color: 'violetPalette.dark',
                }}
              >
                {heroSection.title}
              </PrimaryHeading>
              <ParagraphHeading style={{ color: '#B14384' }}>
                {heroSection.description}
              </ParagraphHeading>
              <FormSection />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack alignItems="center" justifyContent="center">
                <CustomImage
                  alt={heroSection.title}
                  src={heroSection.banner}
                  width="clamp(250px,40vw,500px)"
                  aspectRatio="203/198"
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </CustomSection>
  );
}

export default BannerSection;
