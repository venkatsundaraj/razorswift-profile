import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { socialMediaiIconsData } from '@/src/constants/Blogs/individualBlogsData';
import { formatDate } from '@/utils/helpers/compareDate';
import { Box, Container, Stack } from '@mui/material';
import Link from 'next/link';

function IndividualBlogBanner({ blog }) {
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

        {blog.image ? (
          <>
            <Stack
              alignItems="center"
              sx={{ width: '100%', color: '#fff' }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <SubtitleHeading sx={{ color: 'white' }}>
                  {`By ${blog.author}, Published on ${formatDate(blog.date)}`}
                </SubtitleHeading>
              </Box>
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={1.4}
              >
                {socialMediaiIconsData.map(item => (
                  <Link key={item.id} href={item.link}>
                    <CustomImage
                      src={item.icon}
                      width="30px"
                      aspectRatio="1/1"
                    />
                  </Link>
                ))}
              </Stack>
            </Stack>
            <CustomImage
              src={blog.image.filePath.replace('../../public', '')}
              width="100%"
              aspectRatio="200/81"
              alt="hello"
              style={{ borderRadius: '50px', border: '5px solid white' }}
            />
          </>
        ) : null}
        {/* </Stack> */}
      </Container>
    </Box>
  );
}

export default IndividualBlogBanner;
