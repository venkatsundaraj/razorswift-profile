import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { Box, Container, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

function DiscoverCardLists({ cardData }) {
  return (
    <Container>
      <Grid container spacing={3}>
        {cardData.map(item => (
          <Grid item key={item.id} xs={12} md={4}>
            <Stack
              flexDirection="column"
              justifyContent="flex-end"
              sx={{
                backgroundColor: 'pinkPalette.extraSuperLight',
                borderRadius: 3,
                pt: 5,
              }}
            >
              <Image
                alt={item.title}
                src={item.image}
                style={{ width: '100%', height: 'auto' }}
              />
              <Box component="div" sx={{ padding: 2 }}>
                <ExtraParagraphHeading
                  sx={{ color: 'primaryPalette.primaryBlack', mb: 1 }}
                >
                  {item.title}
                </ExtraParagraphHeading>
                <SubtitleHeading>
                  <Link
                    style={{ textDecoration: 'none', color: '#212121' }}
                    href={`/aspirants/blogs`}
                  >
                    Read the artice
                  </Link>
                </SubtitleHeading>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DiscoverCardLists;
