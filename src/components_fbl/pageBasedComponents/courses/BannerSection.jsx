import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import { TickerBoxData } from '@/src/constants/Aspirants/aspirantPageData';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
function BannerSection({ bannerData }) {
  const secondsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      x: 300,
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

  const thirdsed = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      x: -300,
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
    <CustomSection style={{ padding: '0px', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: 'calc(100vh - 65px)',
          width: '100%',
          alignItems: 'center',
          justifyContent: { xs: 'end' },
          gap: { xl: '100px' },
        }}
      >
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={secondsec}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: { xs: 'center' },
              }}
            >
              <SuperText
                sx={{
                  color: 'pinkPalette.dark',
                  width: '100%',
                }}
              >
                {bannerData.mainHeaderOne}
              </SuperText>
              <SuperText
                sx={{
                  color: 'violetPalette.dark',
                  width: '100%',
                }}
              >
                {bannerData.mainHeaderTwo}
              </SuperText>
            </Box>
          </motion.div>
        </motion.div>
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={thirdsed}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <CustomImage
              alt="Courses page banner"
              src={bannerData.bannerImage}
              aspectRatio="1358/593"
              width="clamp(300px, 55vw, 800px)"
            />
          </motion.div>
        </motion.div>
      </Box>
      <TickerComponent
        variant="div"
        data={TickerBoxData}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </CustomSection>
  );
}

export default BannerSection;
