import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import { herosec } from '@/constants/Articles/articlesdata';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
const HeroSection = ({ filteredArticle }) => {
  console.log(herosec[0]);
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
    <Box
      sx={{ marginTop: '100px', backgroundColor: '#F0F0F0', padding: '50px 0' }}
    >
      <Container>
        <Grid alignItems="center" container spacing={1}>
          <Grid item xs={12} md={6}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                {filteredArticle.headText ? (
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: 'black',
                      paddingBottom: '30px',
                      fontWeight: '400',
                    }}
                  >
                    {filteredArticle.headText}
                  </Typography>
                ) : null}
                {filteredArticle.title ? (
                  <Typography
                    sx={{
                      fontSize: '40px',
                      color: 'black',
                      paddingBottom: '30px',
                      fontWeight: '600',
                    }}
                  >
                    {filteredArticle.title}
                  </Typography>
                ) : null}
                {filteredArticle.description ? (
                  <Typography
                    sx={{
                      fontSize: '20px',
                      color: 'black',
                      paddingBottom: '30px',
                      fontWeight: '500',
                    }}
                  >
                    {filteredArticle.description}
                  </Typography>
                ) : null}
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={secondsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Stack justifyContent="center" alignItems="center">
                  {filteredArticle.image ? (
                    <CustomImage
                      width="clamp(360px,28vw,600px)"
                      aspectRatio={'82/69'}
                      alt="bannerImage"
                      src={filteredArticle.image.filePath.replace(
                        '../../public',
                        ''
                      )}
                    />
                  ) : null}
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
