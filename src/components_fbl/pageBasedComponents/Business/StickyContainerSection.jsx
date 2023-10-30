import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { quickTalentDiscoveryData } from '@/constants/Business/businessPageData';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const initialState = {
  id: 0,
  value: 0,
};

function StickyContainerSection() {
  const [childItems, setChildItems] = useState([]);
  const [percentage, setpercentage] = useState(0);
  const [scrolledValue, setScrolledValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(initialState);

  const cardsRef = useRef(new Array());
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    for (let i = 0; i <= percentage; i++) {
      const fractionValue = (scrolledValue / 25) * 0.05;

      cardsRef.current[i].dataset.value = fractionValue - i * 0.05;
      cardsRef.current[i].style.transform = `scale(calc(1 - ${
        fractionValue - i * 0.05
      })) `;

      setScaleValue(prev => {
        return { id: i, value: fractionValue - i * 0.05 };
      });
    }
  }, [scrolledValue, percentage]);

  useMotionValueEvent(scrollY, 'change', latest => {
    const primaryCondition = latest > sectionRef.current.offsetTop;
    if (primaryCondition) {
      const value =
        (latest - sectionRef.current.offsetTop) /
        (sectionRef.current.clientHeight -
          document.documentElement.clientHeight);
      const filteredValue = Math.min(100, value * 100);
      setScrolledValue(+filteredValue.toFixed(2));
      if (filteredValue < 25) {
        setpercentage(0);
      } else if (25 < filteredValue && filteredValue < 50) {
        setpercentage(1);
      } else if (50 < filteredValue && filteredValue < 75) {
        setpercentage(2);
      } else if (75 < filteredValue && filteredValue < 100) {
        setpercentage(3);
      }
    }
  });

  return (
    <>
      <Box
        component="section"
        ref={sectionRef}
        sx={{
          overflowX: 'unset',
          display: 'flex',
          gap: { xs: '16px', md: '40px' },
          height: {
            xs: `calc(4 * 90vh + 350px)`,
            sm: `calc(4 * 90vh + 550px)`,
            md: `calc(4 * 90vh + 550px)`,
            xl: `calc(4 * 80vh + 350px)`,
          },
          width: '100%',
          backgroundColor: 'primaryPalette.white',
          padding: { xs: '32px 16px', sm: '24px 24px', lg: '64px 24px' },
          flexDirection: 'column',
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <PrimaryHeading
            variant="h2"
            sx={{ color: 'violetPalette.dark', textAlign: 'center' }}
          >
            {quickTalentDiscoveryData.mainTitle}
          </PrimaryHeading>
          <ParagraphHeading
            sx={{
              color: 'primaryPalette.black',
              width: 'clamp(300px,60vw,900px)',
              textAlign: 'center',
              mt: 1,
            }}
          >
            {quickTalentDiscoveryData.mainDescription}
          </ParagraphHeading>
        </Stack>
        {quickTalentDiscoveryData.pathways.map((item, i) => {
          return (
            <Box
              ref={element => (cardsRef.current[i] = element)}
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                transformOrigin: 'center',

                width: '100%',
                height: {
                  xs: `${i === 0 ? '90vh' : '90vh'}`,
                  sm: `${i === 0 ? '90vh' : '90vh'}`,
                  md: `${i === 0 ? '80vh' : '80vh'}`,
                  lg: `${i === 0 ? '90vh' : '90vh'}`,
                  xl: `${i === 0 ? '80vh' : '80vh'}`,
                },
                borderRadius: 4,
                backgroundColor: `${item.backgroundColor}`,
                position: 'sticky',
                top: {
                  xs: `${i * 50}px`,
                  md: `${i * 40}px`,
                  lg: `${i * 25}px`,
                  xl: `${25 + i * 55}px`,
                },
                py: { xs: '32px' },
                px: { xs: '16px', md: '24px' },
              }}
            >
              <Container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid
                  container
                  spaing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: '100%', height: '100%' }}
                >
                  <Grid item xs={12} md={5}>
                    <Stack
                      flexDirection="column"
                      alignItems={{ xs: 'center', md: 'start' }}
                      justifyContent={{ md: 'space-between' }}
                    >
                      <Box sx={{ alignSelf: { xs: 'center' } }}>
                        <CustomImage
                          sx={{ alignSelf: 'center' }}
                          src={item.image}
                          alt={item.title}
                          width={{ xs: '200px', sm: '300px', lg: '300px' }}
                          aspectRatio="1/1"
                        />
                      </Box>
                      <ExtraParagraphHeading
                        sx={{
                          mb: { xs: 2, md: 4 },
                          color: 'primary.black',
                          textAlign: { xs: 'center', md: 'left' },
                        }}
                      >
                        {item.title}
                      </ExtraParagraphHeading>
                      <SubtitleHeading
                        sx={{
                          textAlign: { xs: 'center', md: 'left' },
                          mb: { xs: 2, md: '0px' },
                        }}
                      >
                        {item.description}
                      </SubtitleHeading>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={7}>
                    <Stack
                      alignItems={{
                        xs: 'center',
                        md: 'flex-end',
                        xl: 'center',
                      }}
                      justifyContent="center"
                    >
                      <CustomImage
                        alt={item.title}
                        src={item.mainImage}
                        width={{
                          xs: '100%',
                          sm: '600px',
                          lg: '525px',
                          lg: '625px',
                        }}
                        aspectRatio="3/2"
                        style={{ borderRadius: '16px' }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default StickyContainerSection;
