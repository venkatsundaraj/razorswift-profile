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
        padding: { xs: '16px 16px', sm: '24px 24px', lg: '64px 24px' },
      }}
    >
      <Container>
        <Grid
          container
          alignItems="center"
          spacing={2}
          sx={{ color: 'primaryPalette.black' }}
        >
          <Grid item xs={12} sm={6}>
            <ParagraphHeading>{edTechData.description}</ParagraphHeading>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ParagraphHeading>{edTechData.edTechCopy}</ParagraphHeading>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EdTechScroller;
