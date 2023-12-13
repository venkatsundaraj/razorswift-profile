import CustomSection from '@/src/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/src/components_fbl/globalComponents/CustomImage/CustomImage';
import ExtraParagraphHeading from '@/src/components_fbl/headingComponents/ExtraParagraphHeading';
import SecondaryHeading from '@/src/components_fbl/headingComponents/SecondaryHeading';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const initialState = {
  isHovering: false,
  index: 0,
};
function BlogCardCopy({ filteredData, filteredBlogData }) {
  const [hoverState, setHoverState] = useState(initialState);

  const mouseEnterHandler = function (index) {
    setHoverState({ isHovering: true, index: index });
  };
  const mouseLeaveHandler = function (index) {
    setHoverState({ isHovering: false, index: index });
  };

  return (
    <CustomSection component="section">
      <Container sx={{ overflowX: 'hidden' }}>
        <Stack
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          sx={{
            mb: { xs: 4, sm: 6 },
            position: 'relative',
            overflow: 'hidden',
            '&:after': {
              position: 'absolute',
              content: "''",
              width: '100%',
              height: '2px',
              top: 'clamp(20px,2.6vw,40px)',
              backgroundColor: 'violetPalette.dark',
              zIndex: '-2',
              left: '10px',
            },
          }}
        >
          <SecondaryHeading
            sx={{
              color: 'violetPalette.dark',
              display: 'inline-block',
              fontWeight: 'normal',
              padding: '0px 18px',
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: "''",
                inset: '0',
                backgroundColor: '#F4DFF8',
                width: '100%',
                zIndex: '-1',
                transform: 'rotate(-2deg)',
                borderRadius: 8,
                height: '100%',
              },
            }}
          >
            <Typography component="span" sx={{ fontSize: 'inherit' }}>
              All
            </Typography>{' '}
            Blogs
          </SecondaryHeading>
          <CustomImage
            style={{ alignSelf: 'start', backgroundColor: 'white' }}
            src="/images/Aspirants/feather-pen.svg"
            width="clamp(26px, 2.1vw, 40px)"
            aspectRatio="40/41"
            alt="image"
          />
        </Stack>
        <Grid container alignItems="start" spacing={2}>
          {filteredBlogData.map((item, index) => (
            <Grid key={index} item xs={12} md={4}>
              <Link
                href={`/blogs/${item.parent}/${item.slugAsParams}`}
                style={{ textDecoration: 'none' }}
              >
                <Stack
                  flexDirection="column"
                  onMouseEnter={e => mouseEnterHandler(index)}
                  onMouseLeave={e => mouseLeaveHandler(index)}
                  sx={{
                    backgroundColor: '#FFF3F2',
                    borderRadius: 6,
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'all 50ms linear',
                    '&:hover': {
                      border: '2px solid #3B0647',
                    },
                  }}
                >
                  <CustomImage
                    aspectRatio="350/260"
                    width="100%"
                    alt={item.individualBlogTitle}
                    src={item.image.filePath.replace('../../public', '')}
                  />
                  <Box
                    sx={{
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <ExtraParagraphHeading
                      sx={{
                        lineHeight: '30px',
                        color: 'primaryPalett.black',
                        minHeight: '50px',
                        transition: 'borderBottom 200ms linear',
                        textDecoration:
                          hoverState.isHovering && hoverState.index === index
                            ? 'underline'
                            : '',
                      }}
                    >
                      {item.title}
                    </ExtraParagraphHeading>
                    <Stack
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        style={{
                          color: '#333',
                          textDecoration: 'none',
                          fontSize: '14px',
                        }}
                      >
                        Short Read
                      </Typography>
                      <Typography sx={{ color: '#333', fontSize: '14px' }}>
                        {item.date}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </CustomSection>
  );
}

export default BlogCardCopy;
