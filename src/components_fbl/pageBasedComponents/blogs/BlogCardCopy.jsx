import CustomSection from '@/src/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/src/components_fbl/globalComponents/CustomImage/CustomImage';
import ExtraParagraphHeading from '@/src/components_fbl/headingComponents/ExtraParagraphHeading';
import SecondaryHeading from '@/src/components_fbl/headingComponents/SecondaryHeading';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';

function BlogCardCopy({ filteredData }) {
  console.log(filteredData);
  return (
    <CustomSection component="section">
      <Container>
        <SecondaryHeading sx={{ color: 'violetPalette.dark', mb: 4 }}>
          All Blogs
        </SecondaryHeading>
        <Grid container alignItems="start" spacing={2}>
          {filteredData.blogs.map((item, index) => (
            <Grid key={index} item xs={12} md={4}>
              <Stack
                flexDirection="column"
                sx={{
                  backgroundColor: '#FFF3F2',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <CustomImage
                  aspectRatio="350/260"
                  width="100%"
                  alt={item.individualBlogTitle}
                  src={item.image}
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
                    }}
                  >
                    {item.individualBlogTitle}
                  </ExtraParagraphHeading>
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Link
                      style={{
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '14px',
                      }}
                      href={`/blogs/${filteredData.id}/${item.id}`}
                    >
                      Short Read
                    </Link>
                    <Typography sx={{ color: '#333', fontSize: '14px' }}>
                      {item.date}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </CustomSection>
  );
}

export default BlogCardCopy;
