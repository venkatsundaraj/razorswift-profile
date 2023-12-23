import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { Box, Container, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
function DiscoverCardLists({ cardData }) {
  const secondsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 100,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      y: 0,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  return (
    <Container>
      <Grid container spacing={3}>
        {cardData.map(item => (
          <Grid item key={item.id} xs={12} md={4}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={secondsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
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
              </motion.div>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DiscoverCardLists;
