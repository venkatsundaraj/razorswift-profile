import FastrackCardLists from '@/components_fbl/CardComponents/AspirantCards/FastrackCardLists';
import ViewportBoxComponent from '@/components_fbl/globalComponents/CustomContainer/ViewportBoxComponent';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { fastrackSectionData } from '@/constants/Aspirants/aspirantPageData';
import { Container, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
function FastrackSection() {
  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      x: -100,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      x: 0,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };

  const secondsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      x: 100,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      x: 0,
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
    <ViewportBoxComponent>
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={12} lg={4}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Stack flexDirection="column" gap={2}>
                  <Image
                    style={{ width: '100%' }}
                    alt={fastrackSectionData.title}
                    src={fastrackSectionData.image}
                  />
                  <PrimaryHeading sx={{ color: 'violetPalette.dark' }}>
                    {fastrackSectionData.title}
                  </PrimaryHeading>
                  <ParagraphHeading sx={{ color: 'primaryPalette.black' }}>
                    {fastrackSectionData.description}
                  </ParagraphHeading>
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <motion.div
              transition={{ staggerChildren: 1.9 }}
              style={{ height: '100%' }}
            >
              <motion.div
                style={{ height: '100%' }}
                variants={secondsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Stack
                  sx={{ height: '100%', gap: 2 }}
                  alignItems={{ xs: 'center', md: 'end' }}
                  justifyContent="start"
                  flexDirection="column"
                >
                  <FastrackCardLists
                    sx={{ alignSelf: 'start', width: '50%' }}
                    lists={fastrackSectionData.cardsLeft}
                  />
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <motion.div
              transition={{ staggerChildren: 1.9 }}
              style={{ height: '100%' }}
            >
              <motion.div
                variants={secondsec}
                initial={'offscreen'}
                style={{ height: '100%' }}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Stack
                  sx={{ height: '100%', gap: 2 }}
                  alignItems={{ xs: 'center', md: 'start' }}
                  justifyContent="end"
                  flexDirection="column"
                >
                  <FastrackCardLists
                    sx={{ alignSelf: 'start', width: '50%' }}
                    lists={fastrackSectionData.cardsRight}
                  />
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </ViewportBoxComponent>
  );
}

export default FastrackSection;
