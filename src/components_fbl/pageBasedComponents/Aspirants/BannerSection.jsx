import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ExtraSuperText from '@/components_fbl/headingComponents/ExtraSuperText';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SuperText from '@/components_fbl/headingComponents/SuperText';

import { Box, Grid, Stack } from '@mui/material';

function BannerSection({ heroSectionData, TickerBoxData }) {
  return (
    <CustomSection style={{ padding: '0px', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: 'calc(100vh - 65px)',
          width: '100%',
          alignItems: 'center',
          justifyContent: { xs: 'start' },
          pt: { xs: 16, xl: 20 },
          pl: { xs: 4 },
        }}
      >
        <Grid container spacing={1} sx={{ justifyContent: { xs: 'start' } }}>
          <Grid item xs={12}>
            <Stack
              flexDirection="column"
              justifyContent="space-between"
              alignItems={{ xs: 'start' }}
            >
              <SuperText
                sx={{
                  textAlign: { xs: 'left' },
                  color: heroSectionData.heading.secondaryColor,
                }}
              >
                {heroSectionData.heading.primary}
              </SuperText>
              <ExtraSuperText
                sx={{
                  textAlign: { xs: 'left' },
                  color: heroSectionData.heading.primaryColor,
                }}
              >
                {heroSectionData.heading.secondary}
              </ExtraSuperText>
              <ParagraphHeading
                sx={{
                  textAlign: { xs: 'left' },
                  width: { xs: '60%', sm: '40%', md: '30%' },
                }}
              >
                {heroSectionData.description}
              </ParagraphHeading>

              <PrimaryFillButton
                varient="contained"
                href="/login"
                sx={{
                  width: 'max-content',
                  marginTop: '18px',
                  backgroundColor: theme => theme.palette.pinkPalette.dark,
                  color: theme => theme.palette.primaryPalette.white,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.pinkPalette.dark,
                  },
                }}
              >
                {heroSectionData.buttonContent}
              </PrimaryFillButton>
            </Stack>
          </Grid>
        </Grid>
        <Stack
          sx={{
            width: {
              xs: '400px',
              sm: '750px',
              md: '800px',
              lg: '667px',
              xl: '900px',
            },
            aspectRatio: '667/386',
            position: 'absolute',
            right: { xs: '50%', md: '0' },
            bottom: '0',
            transform: { xs: 'translateX(50%)', md: 'translateX(0)' },
          }}
        >
          <CustomImage
            width="100%"
            height="100%"
            alt={heroSectionData.heading.primary}
            src={heroSectionData.bannerImage}
          />
        </Stack>
      </Box>
      <TickerComponent
        variant="div"
        data={TickerBoxData}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </CustomSection>
  );
}

export default BannerSection;
