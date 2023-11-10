import forbusinesses from '@/constants/Aboutus/Forbusinesses';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
const ForBussiness = () => {
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
    <Container sx={{ marginTop: '100px' }}>
      <Box sx={{ marginTop: '20px' }}>
        <Grid alignItems="center" container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Stack sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '30px', md: '44px' },
                      fontWeight: '600',
                      color: 'common.black',
                    }}
                  >
                    {forbusinesses[0].title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '25px', md: '28px' },
                      fontWeight: '500',
                      color: 'common.black',
                    }}
                  >
                    {forbusinesses[0].titletwo}
                  </Typography>
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: '500',
                    color: 'primary.paragrey',
                    textAlign: 'justify',
                    lineHeight: '1.5',
                  }}
                >
                  {forbusinesses[0].description}
                </Typography>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ForBussiness;
