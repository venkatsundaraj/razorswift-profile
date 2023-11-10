import DynamicConst from '@/constants/Aboutus/DynamicConst';
import { Box, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
const Dynamic = () => {
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
      x: 200,
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
    <Box sx={{ margin: '100px 0' }}>
      <Container>
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={firstsec}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Grid
              justifyContent="center"
              alignItems="center"
              container
              spacing={5}
            >
              <Grid sx={{}} item md={7}>
                <Typography
                  sx={{
                    color: '#EE5064',
                    fontWeight: '600',
                    fontSize: { xs: '20px', md: '28px' },
                    lineHeight: '1.8',
                  }}
                >
                  {DynamicConst[0].description}
                </Typography>
              </Grid>

              <Grid sx={{ justifyContent: 'center' }} item md={5}>
                <Image
                  style={{
                    width: 'clamp(320px, 30vw, 460px)',
                    height: 'auto',
                  }}
                  alt="bannerImage"
                  src={DynamicConst[0].img}
                />
              </Grid>
            </Grid>
          </motion.div>
        </motion.div>
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={secondsec}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                fontSize: { xs: '16px', md: '20px' },
                fontWeight: '500',
                textAlign: 'center',
                marginTop: '50px',
                lineHeight: '1.8',
              }}
            >
              {DynamicConst[0].descriptiontwo}
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Dynamic;
