import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import {
  clickToCopy,
  socialMediaiIconsData,
} from '@/src/constants/Blogs/individualBlogsData';
import { formatDate } from '@/utils/helpers/compareDate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Container, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function IndividualBlogBanner({ blog }) {
  console.log(blog);
  const [originUrl, setOriginUrl] = useState(
    process.env.NEXT_PUBLIC_APP_PROD_URL
  );

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin);
    }
  }, []);
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: '80vh', sm: '80vh', lg: '130vh', xl: '100vh' },

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
        <PrimaryFillButton
          href={`/blogs/${blog.parent}`}
          sx={{
            color: 'violetPalette.dark',
            backgroundColor: 'primaryPalette.white',
            alignSelf: 'start',
          }}
        >
          <ArrowBackIosIcon />
          All Blogs
        </PrimaryFillButton>
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
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 0, sm: 2 },
                  alignItems: 'center',
                  justifyContent: 'start',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                }}
              >
                <SubtitleHeading
                  sx={{ color: 'white' }}
                >{`By ${blog.author},`}</SubtitleHeading>
                <SubtitleHeading
                  sx={{ color: 'white' }}
                >{`Published on ${formatDate(blog.date)}`}</SubtitleHeading>
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
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${originUrl}${router.asPath}`
                    );
                  }}
                  sx={{
                    width: '30px',
                    height: '30px',
                    padding: '0',
                    display: 'block',
                  }}
                >
                  <CustomImage
                    src={clickToCopy}
                    width="30px"
                    aspectRatio="1/1"
                  />
                </Button>
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
