import FastrackCardLists from '@/components_fbl/CardComponents/AspirantCards/FastrackCardLists';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import exploreSection from '@/constants/Homepage/exploresection.js';
import exploreSectiontwo from '@/constants/Homepage/exploresectiontwo.js';
import { Box, Grid, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';
import data from '../../../constants/Homepage/whyrazor.js';
const ExploreSection = ({ ...props }) => {
  const headfont = {
    fontSize: 'clamp(50px, 4vw, 64px)',
  };
  // const paraone = {
  //   fontSize: "clamp(15px, 1.4vw, 20px)",
  // };
  const numbersec = {
    fontSize: 'clamp(30px, 2.4vw, 40px)',
  };
  const numbersecdescription = {
    fontSize: 'clamp(10px, 1.1vw, 16px)',
  };
  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      x: -200,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      x: 0,
      transition: {
        type: 'spring',
        duration: 10,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  const singlesec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 200,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      y: 0,
      transition: {
        type: 'spring',
        duration: 10,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row', lg: 'row' },
        height: { xs: '', md: '100vh', xl: '' },
        pl: '15px',
        pr: '15px',
        justifyContent: {
          xs: 'flex-start',
          md: 'center',
        },
        gap: { md: '60px' },
        alignItems: { xs: 'flex-start', md: 'center', lg: 'center' },
        padding: { md: '60px 24px' },
      }}
      {...props}
    >
      <Grid
        sx={{ alignItems: 'center', justifyContent: 'center' }}
        container
        spacing={3}
      >
        <Grid sx={{ mb: { md: '30px' } }} item xs={12} lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <PrimaryHeading
                  variant="h1"
                  sx={{
                    color: 'primary.purp',
                    textAlign: 'left',
                    margin: '15px 0',
                    width: { xs: '300px', sm: '730px', md: '100%', lg: '100%' },
                  }}
                >
                  {data[0].title}
                </PrimaryHeading>
              </motion.div>
            </motion.div>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <ParagraphHeading
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    textAlign: 'justify',
                    width: { xs: '100%' },
                    marginBottom: { xs: '20px', sm: '', md: '30px' },
                  }}
                >
                  {data[0].description}
                </ParagraphHeading>
              </motion.div>
            </motion.div>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={singlesec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Link
                  href={data[0].link}
                  variant="body1"
                  underline="none"
                  sx={{
                    backgroundColor: 'primary.purp',
                    color: 'common.white',
                    pt: '10px',
                    pb: '10px',
                    pl: '30px',
                    pr: '30px',
                    borderRadius: '200px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.purp',
                      backgroundColor: 'common.white',
                      border: '1px solid ',
                      borderColor: 'primary.purp',
                    },
                  }}
                >
                  {data[0].button}
                </Link>
              </motion.div>
            </motion.div>
          </Box>
        </Grid>
        <Grid sx={{ height: { lg: '400px' } }} item xs={12} md={6} lg={3}>
          <motion.div transition={{ staggerChildren: 1.9 }}>
            <motion.div
              variants={singlesec}
              initial={'offscreen'}
              whileInView={'onscreen'}
              viewport={{ once: true }}
            >
              <Stack
                sx={{ height: '100%', gap: 3 }}
                alignItems={{ xs: 'center', md: 'end' }}
                justifyContent="start"
                flexDirection="column"
              >
                <FastrackCardLists
                  sx={{ alignSelf: 'start', width: '50%' }}
                  lists={exploreSection}
                />
              </Stack>
            </motion.div>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <motion.div transition={{ staggerChildren: 1.9 }}>
            <motion.div
              variants={singlesec}
              initial={'offscreen'}
              whileInView={'onscreen'}
              viewport={{ once: true }}
            >
              <Stack
                sx={{ height: '100%', gap: 3 }}
                alignItems={{ xs: 'center', md: 'start' }}
                justifyContent="end"
                flexDirection="column"
              >
                <FastrackCardLists
                  sx={{
                    alignSelf: 'start',
                    width: '50%',
                  }}
                  lists={exploreSectiontwo}
                />
              </Stack>
            </motion.div>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ExploreSection;
