import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { AppBar, Box, Container, Grid, Stack, Toolbar } from '@mui/material';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

function StaticScrollSection({ stickySliderData }) {
  const [percentage, setpercentage] = useState(0);
  const sectionRef = useRef(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    const primaryCondition = latest > sectionRef.current.offsetTop;
    if (primaryCondition) {
      const value =
        (latest - sectionRef.current.offsetTop) /
        (sectionRef.current.clientHeight -
          document.documentElement.clientHeight);
      const filteredValue = Math.min(100, value * 100);
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
    <section
      ref={sectionRef}
      style={{
        height: '300vh',
        position: 'relative',
        backgroundColor: '#EE5064',
        overflowX: 'unset',
        padding: '40px 0',
      }}
    >
      <AppBar
        component="div"
        position="sticky"
        sx={{ backgroundColor: 'unset', boxShadow: 'unset' }}
      >
        <Toolbar sx={{ padding: '0' }}>
          <Container>
            <Grid
              container
              spacing={{ xs: 1, md: 4 }}
              alignItems={{ xs: 'end', xl: 'center' }}
              justifyContent="center"
              sx={{ height: '100vh', overfow: 'hidden' }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  width: '100%',
                  height: {
                    xs: '50%',
                    md: '90%',
                    xl: '70%',
                  },
                  alignSelf: { xs: 'center' },
                  justifSelf: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', md: '100%', lg: '100%', xl: '100%' },
                    height: { xs: '100%', md: '100%', lg: '100%', xl: '100%' },
                    mb: { xs: 2, md: 5 },
                    position: 'relative',
                    overflowY: 'hidden',
                  }}
                >
                  {stickySliderData.image.map(image => (
                    <Box
                      key={image.id}
                      sx={{
                        top: `${image.id * 100}%`,
                        transform: `translateY(-${percentage * 100}%)`,
                        transition: 'transform 450ms ease-out',
                        left: '0',
                        display: 'flex',
                        alignItems: { xs: 'center', xl: 'center' },
                        justifyContent: 'center',
                        '@media (min-width: 1536px)': {
                          alignItems: 'flex-end',
                        },
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: { xs: '100%', xl: '100%' },
                          '@media (min-width: 1536px)': {
                            height: '80%',
                          },
                        }}
                      >
                        <Image
                          key={image.id}
                          alt="image"
                          src={image.image}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '40px',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ height: { xs: '50%', md: '90%', xl: '70%' } }}
              >
                <Stack
                  flexDirection="column"
                  alignItems="start"
                  sx={{ height: '100%' }}
                  justifyContent={{ xs: 'center', md: 'space-between' }}
                >
                  <PrimaryHeading
                    variant="h2"
                    sx={{
                      color: 'primaryPalette.white',
                      mb: {
                        xs: '32px',
                        md: '0',
                      },
                    }}
                  >
                    GET VERIFIED. GET HIRED.
                  </PrimaryHeading>
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        width: '100%',
                        mb: { xs: 1 },
                        height: { xs: '40px', md: '50px', xl: '60px' },
                        position: 'relative',
                        overflowY: 'hidden',
                      }}
                    >
                      {stickySliderData.title.map(title => (
                        <PrimaryHeading
                          variant="h2"
                          key={title.id}
                          style={{ textTransform: 'uppercase' }}
                          sx={{
                            color: 'primaryPalette.white',
                            width: '100%',
                            height: '100%',
                            left: '0',
                            top: `${title.id * 100}%`,
                            position: 'absolute',
                            transform: `translateY(-${percentage * 100}%)`,
                            transition: 'transform 400ms ease',
                          }}
                        >
                          {title.name}
                        </PrimaryHeading>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        minHeight: { xs: '240px', md: '180px', xl: '200px' },
                        position: 'relative',
                        overflowY: 'hidden',
                      }}
                    >
                      {stickySliderData.paragraph.map(title => (
                        <Box
                          key={title.id}
                          sx={{
                            left: '0',
                            top: `${title.id * 100}%`,
                            width: '100%',
                            minHeight: '100%',
                            transform: `translateY(-${percentage * 100}%)`,
                            transition: 'transform 400ms ease',
                            position: 'absolute',
                          }}
                        >
                          <ParagraphHeading
                            style={{ fontWeight: '600' }}
                            sx={{ mb: 2, color: 'primaryPalette.white' }}
                          >
                            {title.subtitle}
                          </ParagraphHeading>
                          <SubtitleHeading
                            sx={{
                              color: 'primaryPalette.white',
                            }}
                          >
                            {title.paragraph}
                          </SubtitleHeading>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </section>
  );
}

export default StaticScrollSection;
