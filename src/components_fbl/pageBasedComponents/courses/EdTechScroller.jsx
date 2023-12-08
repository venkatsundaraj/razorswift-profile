import InfiniteScroll from '@/components_fbl/TickerComponent/InfiniteScroll';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import { edTechData } from '@/src/constants/Courses/coursesPageData';
import { Box, Container, Grid } from '@mui/material';

function EdTechScroller() {
  return (
    <Box
      component="section"
      sx={{
        width: '100vw',
        backgroundColor: 'primaryPalette.white',
        padding: { xs: '16px 16px', sm: '24px 24px' },
      }}
    >
      <Container>
        <Grid
          container
          alignItems="center"
          spacing={3}
          sx={{ color: 'primaryPalette.black' }}
        >
          <Grid item xs={12} sm={12}>
            <ParagraphHeading sx={{ textAlign: 'center' }}>
              {edTechData.description}
            </ParagraphHeading>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ overflow: 'hidden', display: 'none' }}
          >
            <ParagraphHeading>{edTechData.edTechCopy}</ParagraphHeading>
            <InfiniteScroll edTechData={edTechData.techLogos} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EdTechScroller;
