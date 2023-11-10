import FastrackCardListsAbout from '@/components_fbl/CardComponents/AspirantCards/FastrackCardListsAbout';
import razorswiftforbusiness from '@/constants/Aboutus/razorswiftforbusiness';
import razorswiftforbusinesscont from '@/constants/Aboutus/razorswiftforbusinesscont';
import razorswiftforbusinesstwo from '@/constants/Aboutus/razorswiftforbusinesstwo';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
const RazorSwiftForBusinesses = () => {
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
      y: -100,
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
    <Container
      sx={{
        marginTop: '100px',
        backgroundColor: '#D9B6E1',
        borderRadius: '25px',
      }}
    >
      <Box sx={{ padding: '50px' }}>
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={firstsec}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Grid alignItems="center" container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography
                  sx={{
                    fontSize: { xs: '25px', md: '44px' },
                    fontWeight: '600',
                    color: '#380943',
                  }}
                >
                  RazorSwift For Businesses
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '20px', md: '24px' },
                    fontWeight: '600',
                    color: '#380943',
                    textAlign: 'justify',
                    marginTop: '20px',
                  }}
                >
                  {razorswiftforbusinesscont[0].title}
                </Typography>
              </Grid>
            </Grid>
          </motion.div>
        </motion.div>
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={firstsec}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                marginTop: { xs: '20px', md: '50px' },
                paddingBottom: { xs: '30px', md: '0' },
              }}
            >
              <Grid
                justifyContent="center"
                alignItems="center"
                container
                spacing={3}
              >
                <Grid
                  sx={{ alignSelf: 'flex-start' }}
                  item
                  xs={12}
                  md={12}
                  lg={6}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '18px', md: '20px' },
                      fontWeight: '500',
                      color: 'primary.paragrey',
                      textAlign: 'justify',
                      lineHeight: '1.5',
                    }}
                  >
                    {razorswiftforbusinesscont[0].description}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ height: { lg: '400px' } }}
                  item
                  xs={12}
                  md={6}
                  lg={3}
                >
                  <Stack
                    sx={{ height: '100%', gap: 2 }}
                    alignItems={{ xs: 'center', md: 'end' }}
                    justifyContent="start"
                    flexDirection="column"
                  >
                    <FastrackCardListsAbout
                      sx={{ alignSelf: 'start', width: '50%' }}
                      lists={razorswiftforbusiness}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Stack
                    sx={{ height: '100%', gap: 2 }}
                    alignItems={{ xs: 'center', md: 'start' }}
                    justifyContent="end"
                    flexDirection="column"
                  >
                    <FastrackCardListsAbout
                      sx={{ alignSelf: 'start', width: '50%' }}
                      lists={razorswiftforbusinesstwo}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default RazorSwiftForBusinesses;
