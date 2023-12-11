import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { Box, Container } from '@mui/material';
import CustomImage from '../../globalComponents/CustomImage/CustomImage';

function IndividualBlogBanner({ blog }) {
  console.log(blog);
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: '130vh', sm: '80vh', lg: '130vh', xl: '100vh' },

        pt: 16,
        pb: 4,
        background: {
          xs: `linear-gradient(to bottom, #A62973 90%, #fff 30%)`,
          sm: `#A62973`,
          lg: `linear-gradient(to bottom, #A62973 90%, #fff 10%)`,
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
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
        {/* <Stack
          sx={{
            width: '100%',
            backgroundColor: 'violetPalette.dark',
            py: { xs: 4, lg: 8, xl: 10 },
            borderRadius: 9,
          }}
          alignItems="center"
          justifyContent="center"
        > */}
        {blog.image ? (
          <CustomImage
            src={blog.image.filePath.replace('../../public', '')}
            width="100%"
            aspectRatio="200/81"
            alt="hello"
            borderRadius="50px"
            border="5px solid white"
          />
        ) : null}
        {/* </Stack> */}
      </Container>
    </Box>
  );
}

export default IndividualBlogBanner;
