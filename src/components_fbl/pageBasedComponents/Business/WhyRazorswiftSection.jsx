import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import FastrackCardLists from '@/components_fbl/CardComponents/AspirantCards/FastrackCardLists';
import DropDownWrapper from '@/components_fbl/dropDownComponents/DropDownWrapper';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { whyRazorswiftSection } from '@/constants/Business/businessPageData';
import { Box, Grid, Stack } from '@mui/material';

function WhyRazorswiftSection() {
  return (
    <DropDownWrapper component="section">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#D9B6E1',
          borderRadius: 4,

          py: { xs: 4, md: 5 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Grid container spacing={2} sx={{}}>
          <Grid item xs={12} md={6}>
            <Stack
              flexDirection="column"
              alignItems="start"
              justifyContent="space-between"
              gap={2}
            >
              <PrimaryHeading sx={{ color: 'violetPalette.dark' }}>
                {whyRazorswiftSection.title}
              </PrimaryHeading>
              <ParagraphHeading sx={{ color: 'primaryPalette.black' }}>
                {whyRazorswiftSection.description}
              </ParagraphHeading>
              <PrimaryFillButton
                href={`${whyRazorswiftSection.button.link}`}
                sx={{
                  backgroundColor: 'violetPalette.dark',
                  mt: { xs: 0, md: 2 },
                  color: 'primaryPalette.white',
                  transition: 'all 300ms ease',
                  border: '1px solid #672376',
                  '&:hover': {
                    backgroundColor: 'primaryPalette.white',
                    color: 'violetPalette.dark',
                  },
                }}
              >
                {whyRazorswiftSection.button.title}
              </PrimaryFillButton>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
              justifyContent="center"
              sx={{ height: '100%', mt: { xs: 2, md: 0 } }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{ height: { xs: 'fit-content', md: '80%' } }}
              >
                <Stack
                  sx={{ height: '100%', gap: 2 }}
                  alignItems={{ xs: 'center', md: 'end' }}
                  justifyContent="start"
                  flexDirection="column"
                >
                  <FastrackCardLists
                    sx={{ alignSelf: 'start' }}
                    lists={whyRazorswiftSection.cardsLeft}
                  />
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ height: { xs: 'fit-content', md: '80%' } }}
              >
                <Stack
                  sx={{ height: '100%', gap: 2 }}
                  alignItems={{ xs: 'center', md: 'start' }}
                  justifyContent="end"
                  flexDirection="column"
                >
                  <FastrackCardLists
                    sx={{ alignSelf: 'start' }}
                    lists={whyRazorswiftSection.cardsRight}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DropDownWrapper>
  );
}

export default WhyRazorswiftSection;

{
  /* <Grid item xs={12} md={6}>
  <Grid
    container
    spacing={{ xs: 0, md: 2 }}
    alignItems="center"
    justifyContent="center"
    sx={{ height: '100%', mt: { xs: 2, md: 0 } }}
  >
    <Grid item xs={12} md={6} sx={{ height: { xs: 'fit-content', md: '80%' } }}>
      <Stack
        sx={{ height: '100%', gap: 2 }}
        alignItems={{ xs: 'center', md: 'end' }}
        justifyContent="start"
        flexDirection="column"
      >
        <FastrackCardLists
          sx={{ alignSelf: 'start' }}
          lists={whyRazorswiftSection.cardsLeft}
        />
      </Stack>
    </Grid>
    <Grid item xs={12} md={6} sx={{ height: { xs: 'fit-content', md: '80%' } }}>
      <Stack
        sx={{ height: '100%', gap: 2 }}
        alignItems={{ xs: 'center', md: 'start' }}
        justifyContent="end"
        flexDirection="column"
      >
        <FastrackCardLists
          sx={{ alignSelf: 'start' }}
          lists={whyRazorswiftSection.cardsRight}
        />
      </Stack>
    </Grid>
  </Grid>
</Grid>; */
}
