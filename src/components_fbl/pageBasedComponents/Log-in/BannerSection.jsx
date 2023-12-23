import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import { bannerSection } from '@/constants/Signup/signupPageData';
import SignupForm from '@/src/components_fbl/pageBasedComponents/Log-in/LoginForm';
import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
function BannerSection() {
  const firstsec = {
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
        delay: 0.3,
      },
    },
  };
  return (
    <CustomSection style={{ padding: 'clamp(40px,7vw, 76px) 0 ' }}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <SignupForm />
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <CustomImage
                  src={bannerSection.logInBanner}
                  width="100%"
                  height="100%"
                  aspectRatio="31/30"
                />
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </CustomSection>
  );
}

export default BannerSection;
