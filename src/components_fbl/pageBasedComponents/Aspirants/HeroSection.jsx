import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ExtraSuperText from '@/components_fbl/headingComponents/ExtraSuperText';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SuperText from '@/components_fbl/headingComponents/SuperText';

import { Box, Grid, Stack } from '@mui/material';

function HeroSection({ heroSectionData, TickerBoxData }) {
  return (
    <CustomSection style={{ padding: '0px', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: 'calc(100dvh - 65px)',
          width: '100%',
          alignItems: 'center',

          justifyContent: { xs: 'start' },
          pt: { xs: 12 },
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: { xs: 'start' },
          }}
          spacing={1}
        >
          <Grid item xs={12} md={6}>
            <Stack
              flexDirection="column"
              justifyContent="space-between"
              alignItems={{ xs: 'start' }}
              sx={{
                pl: { xs: 4 },
              }}
            >
              <SuperText
                sx={{
                  textAlign: { xs: 'left' },
                  color: heroSectionData.heading.secondaryColor,
                  textWrap: 'nowrap',
                }}
              >
                {heroSectionData.heading.primary}
              </SuperText>
              <ExtraSuperText
                sx={{
                  textAlign: { xs: 'left' },
                  color: heroSectionData.heading.primaryColor,
                  textWrap: 'nowrap',
                }}
              >
                {heroSectionData.heading.secondary}
              </ExtraSuperText>
              <ParagraphHeading
                sx={{
                  textAlign: { xs: 'left' },
                  width: { xs: '60%' },
                  color: 'primaryPalette.black',
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
                  transition: 'all 300ms ease',
                  '&:hover': {
                    backgroundColor: theme => theme.palette.pinkPalette.dark,
                    transform: 'translateY(-3px)',
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {heroSectionData.buttonContent}
              </PrimaryFillButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              sx={{
                width: {
                  xs: '100%',
                },
                aspectRatio: '667/386',
              }}
            >
              <CustomImage
                width="100%"
                height="100%"
                alt={heroSectionData.heading.primary}
                src={heroSectionData.bannerImage}
              />
            </Stack>
          </Grid>
        </Grid>
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

export default HeroSection;
