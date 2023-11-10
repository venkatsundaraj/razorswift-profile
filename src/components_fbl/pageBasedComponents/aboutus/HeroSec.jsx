import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import herosec from '@/constants/Aboutus/herosec';
import { TickerBoxData } from '@/constants/Aspirants/aspirantPageData';
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway';
import { bebasNeue } from '@/utils/themes/typography';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
const HeroSec = () => {
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
    <Box>
      <Box
        sx={{
          height: 'calc(100vh - 65px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-end', md: 'flex-end' },
        }}
      >
        <Box>
          <Grid justifyContent="center" container>
            <Grid item lg={2} xl={2}></Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              item
              lg={8}
              xl={8}
            >
              <motion.div transition={{ staggerChildren: 1.9 }}>
                <motion.div
                  variants={firstsec}
                  initial={'offscreen'}
                  whileInView={'onscreen'}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: 'center', zIndex: '1' }}>
                    <Typography
                      variant="h1"
                      sx={{
                        color: '#FB847D',
                        fontSize: 'clamp(50px, 6.2vw, 103px)',
                        fontWeight: '500',
                        lineHeight: '1.0',
                        fontFamily: bebasNeue.style.fontFamily,
                      }}
                    >
                      {herosec[0].title}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: '#672376',
                        fontSize: 'clamp(60px, 8.2vw, 121px)',
                        fontWeight: '500',
                        lineHeight: '1.0',
                        fontFamily: bebasNeue.style.fontFamily,
                      }}
                    >
                      {herosec[0].description}
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item lg={2} xl={2}></Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: { xs: '120px', md: '-50px' },
          }}
        >
          <Image
            style={{
              zIndex: '-1',
              width: 'clamp(400px, 77vw, 1200px)',
              height: 'auto',
            }}
            alt="lookingtoimg"
            src={Aboutusimagepathway.newbanner}
          />

          {/* <CustomImage
            style={{ zIndex: '-1' }}
            alt="lookingtoimg"
            src={Aboutusimagepathway.newbanner}
            width="clamp(300px,80vw,1275px)"
            aspectRatio="1275/409"
          /> */}
        </Box>
      </Box>
      <TickerComponent
        variant="div"
        data={TickerBoxData}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default HeroSec;
