import { Box, Container, Stack } from '@mui/material';
import Image from 'next/image';
import ParagraphHeading from '../../headingComponents/ParagraphHeading';
import PrimaryHeading from '../../headingComponents/PrimaryHeading';

function IndividualBlogBanner({ blog }) {
  console.log(blog);
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: '130vh', sm: '100vh', lg: '130vh', xl: '100vh' },

        pt: 16,
        pb: 4,
        background: {
          xs: `linear-gradient(to bottom, #A62973 90%, #fff 30%)`,
          xl: `linear-gradient(to bottom, #A62973 90%, #fff 10%)`,
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
        }}
      >
        {blog.title ? (
          <PrimaryHeading sx={{ color: 'primaryPalette.white' }}>
            {blog.title}
          </PrimaryHeading>
        ) : null}
        {blog.description ? (
          <ParagraphHeading
            sx={{
              color: 'primaryPalette.white',
              textAlign: 'center',
              maxWidth: '700px',
            }}
          >
            {blog.description}
          </ParagraphHeading>
        ) : null}
        <Stack
          sx={{
            width: '100%',
            backgroundColor: 'violetPalette.dark',
            padding: 2,
            borderRadius: 4,
          }}
          alignItems="center"
          justifyContent="center"
        >
          {blog.image ? (
            <Image
              src={blog.image.filePath.replace('../../public', '')}
              width={350}
              height={350}
              alt="hello"
            />
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

export default IndividualBlogBanner;
