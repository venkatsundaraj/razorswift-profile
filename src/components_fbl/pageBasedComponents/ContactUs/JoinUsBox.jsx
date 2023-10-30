import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';

import { Box, Container, Grid, Stack } from '@mui/material';

import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import TertiaryHeading from '@/components_fbl/headingComponents/TertiaryHeading';

function JoinUsBox({ joinUsData, ...props }) {
  return (
    <CustomSection style={{ padding: '40px 0 ' }}>
      <Container>
        <Box
          sx={{
            backgroundColor: 'pinkPalette.dark',
            borderRadius: 6,
            padding: { xs: '16px', md: '0 16px' },
          }}
        >
          <Grid
            spacing={{ xs: 2, md: 1 }}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={8}>
              <Stack
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                gap={2}
              >
                <CustomImage
                  src={joinUsData.joinUsIcon}
                  alt={joinUsData.title}
                  width="140px"
                  aspectRatio="4/3"
                />
                <TertiaryHeading
                  sx={{
                    color: 'primaryPalette.white',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  {joinUsData.title}
                </TertiaryHeading>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack
                justifyContent={{ xs: 'center', md: 'end' }}
                flexDirection="row"
              >
                <PrimaryFillButton
                  href="/login"
                  style={{
                    padding: '4px 16px',
                    borderRadius: '8px',
                    width: '',
                  }}
                  sx={{
                    backgroundColor: '#f2b8ff',
                    color: 'pinkPalette.dark',
                    width: 'fit-content',
                    '&:hover': {
                      backgroundColor: 'pinkPalette.navLight',
                      color: 'pinkPalette.dark',
                    },
                  }}
                >
                  {joinUsData.buttonText}
                </PrimaryFillButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </CustomSection>
  );
}

export default JoinUsBox;
