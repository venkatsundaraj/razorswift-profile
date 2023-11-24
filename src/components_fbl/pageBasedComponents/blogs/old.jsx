import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import herosection from '@/constants/Blogs/herosection';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
const HeroSection = () => {
  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: -30,
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: { xs: '110px', lg: '200px' },
      }}
    >
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={firstsec}
          initial={'offscreen'}
          whileInView={'onscreen'}
          viewport={{ once: true }}
        >
          <SuperText
            sx={{
              fontWeight: '500',
              color: '#A62973',
              textAlign: 'center',
            }}
          >
            {herosection[0].title}
          </SuperText>
          <ParagraphHeading sx={{ textAlign: 'center' }}>
            {herosection[0].article}
          </ParagraphHeading>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default HeroSection;
