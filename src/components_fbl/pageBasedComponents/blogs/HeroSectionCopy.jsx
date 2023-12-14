import { Box, Container, Grid, Stack } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomImage from '../../globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '../../headingComponents/ParagraphHeading';
import PrimaryHeading from '../../headingComponents/PrimaryHeading';
import SubtitleHeading from '../../headingComponents/SubtitleHeading';
import TertiaryHeading from '../../headingComponents/TertiaryHeading';

const backgroundColor = ['#FFAFB9', '#DD90BE', '#DFA9EB'];
const classes = ['current-index', 'last-index', 'next-index'];

function HeroSectionCopy({ filteredData, filteredBlogData }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setValue(prev => {
        if (filteredBlogData.length === 1) return;
        return prev >= filteredBlogData.length - 1 ? 0 : prev + 1;
      });
    }, 6000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value]);

  return (
    <Box
      component="section"
      sx={{
        minHeight: {
          xs: '130vh',
          sm: '75vh',
          md: '100vh',
          lg: '130vh',
          xl: '100vh',
        },

        pt: 16,
        pb: 8,
        background: {
          xs: `linear-gradient(to bottom, #A62973 70%, #fff 30%)`,
          xl: `linear-gradient(to bottom, #A62973 90%, #fff 10%)`,
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3, lg: 3, xl: 4 },
          alignItems: 'center',
        }}
      >
        <SubtitleHeading
          sx={{ color: 'primaryPalette.white', textAlign: 'center' }}
        >
          {filteredBlogData[0].headText}
        </SubtitleHeading>
        <PrimaryHeading
          sx={{ color: 'primaryPalette.white', textAlign: 'center' }}
        >
          {filteredBlogData[0].mainText}
        </PrimaryHeading>
        <ParagraphHeading
          sx={{
            color: 'primaryPalette.white',
            textAlign: 'center',
          }}
        >
          {filteredBlogData[0].subText}
        </ParagraphHeading>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: { sx: '300px', sm: '500px', md: '300px' },
          }}
        >
          {filteredBlogData.map((item, index) => {
            let position = 'next-index';
            if (filteredBlogData.length === 1) position = 'current-index';
            if (value === index) {
              position = 'current-index';
            }

            if (
              index === value - 1 ||
              (value === 0 && index === filteredBlogData.length - 1)
            ) {
              position = 'last-index';
            }
            return (
              <Grid
                className={position}
                container
                // spacing={2}
                key={index}
                alignItems="center"
                sx={{
                  backgroundColor: `${backgroundColor[index]}`,

                  color: '#212121',
                  position: 'absolute',
                  borderRadius: 8,
                  overflow: 'hidden',
                  width: '100%',
                  left: '0',
                  minHeight: { xs: '600px', sm: '300px' },
                }}
              >
                <Grid xs={12} sm={6}>
                  <Stack
                    alignItems="start"
                    flexDirection="column"
                    gap={2}
                    sx={{ padding: 4 }}
                  >
                    <TertiaryHeading
                      style={{ lineHeight: 'clamp(26px,3.2vw,47px)' }}
                      sx={{
                        borderBottom: `1px solid #A62973`,
                        display: 'block',
                      }}
                    >
                      {item.title}
                    </TertiaryHeading>
                    <ParagraphHeading>{item.description}</ParagraphHeading>
                    <Link
                      style={{
                        color: '#212121',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                      href={`/blogs/${item.parent}/${item.slugAsParams}`}
                    >
                      Read More
                    </Link>
                  </Stack>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '100%' }}
                  >
                    <CustomImage
                      aspectRatio="350/260"
                      width="100%"
                      alt={item.individualBlogTitle}
                      src={item.image.filePath.replace('../../public', '')}
                    />
                  </Stack>
                </Grid>
              </Grid>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSectionCopy;
