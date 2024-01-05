import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
import CustomImage from '@/src/components_fbl/globalComponents/CustomImage/CustomImage';
import { Container, Stack, Typography } from '@mui/material';

const BlogTitleComponent = ({}) => {
  return (
    <CustomSection
      style={{ padding: '0', paddingTop: '24px' }}
      component="section"
    >
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
      </Container>
    </CustomSection>
  );
};

export default BlogTitleComponent;
