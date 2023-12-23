import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import { TickerBoxData } from '@/src/constants/Aspirants/aspirantPageData';
import { Box, Grid, Stack } from '@mui/material';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import HeroSectionSlider from './HeroSectionSlider';

const HeroSectionCopy = ({ heroSectionData }) => {
  const [layoutTriggered, setLayoutTriggered] = useState(false);
  const { scrollY } = useScroll();
  const sectionRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', latest => {
    const primaryCondition = latest > sectionRef.current.offsetTop;

    if (primaryCondition) {
      const excitedValue =
        (latest / sectionRef.current.clientHeight) * 100 > 7.5;

      if (excitedValue) {
        setLayoutTriggered(true);
      } else {
        setLayoutTriggered(false);
      }
    }
  });
  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        height: 'calc(100vh + 450px)',
        position: 'relative',
      }}
    >
      <Box
        component="div"
        sx={{
          height: '100dvh',
          position: 'sticky',
          top: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: 'calc(100vh - 65px)',
            width: '100%',
            alignItems: 'center',
            position: 'relative',
            justifyContent: { xs: 'end' },
            overFlowY: 'hidden',
            pt: { xs: 12 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: { sm: 'max-content', md: '75vh' },
              position: 'absolute',
              backgroundColor: 'white',
              transition: 'transform 300ms ease',
              transform: layoutTriggered
                ? `translateY(0%)`
                : `translateY(100%)`,
              bottom: '0',
              zIndex: '0',
              left: '0',
            }}
          >
            <HeroSectionSlider />
          </Box>
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
            <Grid item xs={12} md={4}>
              <Stack
                flexDirection="column"
                justifyContent="space-between"
                alignItems={{ xs: 'start' }}
                sx={{
                  pl: { xs: 4 },
                }}
              >
                <SuperText
                  style={{
                    lineHeight: '1.0',
                  }}
                  sx={{
                    textAlign: { xs: 'left' },
                    color: '#EE5164',
                    textWrap: 'nowrap',
                  }}
                >
                  Empowering Talent.
                </SuperText>
                <SuperText
                  style={{
                    lineHeight: '1.0',
                  }}
                  sx={{
                    textAlign: { xs: 'left' },
                    color: '#672376',
                    textWrap: 'nowrap',
                  }}
                >
                  Enabling Growth.
                </SuperText>
                <ParagraphHeading
                  sx={{
                    textAlign: { xs: 'left' },
                    color: 'primaryPalette.black',
                  }}
                >
                  A dynamic ecosystem where talent and opportunities converge
                </ParagraphHeading>
                <Stack flexDirection="row" gap={4} alignItems="center">
                  <PrimaryFillButton
                    varient="contained"
                    href="/profile"
                    sx={{
                      width: 'max-content',
                      marginTop: '18px',
                      backgroundColor: theme => theme.palette.pinkPalette.dark,
                      color: theme => theme.palette.primaryPalette.white,
                      transition: 'all 300ms ease',
                      '&:hover': {
                        backgroundColor: theme =>
                          theme.palette.pinkPalette.dark,
                        transform: 'translateY(-3px)',
                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    Build Your Profile
                  </PrimaryFillButton>
                  <PrimaryFillButton
                    varient="outlined"
                    href="/contact-us"
                    sx={{
                      width: 'max-content',
                      marginTop: '18px',
                      backgroundColor: 'transparent',
                      color: 'pinkPalette.main',
                      transition: 'all 300ms ease',
                      border: '1px solid #A62973',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        transform: 'translateY(-3px)',
                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    Get a Demo
                  </PrimaryFillButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{ height: { xs: 'initial', md: '100%' } }}
            >
              <Stack
                alignItems="end"
                justifyContent="end"
                flexDirection="row"
                sx={{
                  width: {
                    xs: '100%',
                  },
                  height: '100%',
                }}
              >
                <CustomImage
                  width="clamp(300px,50vw,800px)"
                  aspectRatio="838/575"
                  src={heroSectionData.bannerImage}
                  style={{ zIndex: '-1' }}
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
            zIndex: '10',
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroSectionCopy;
