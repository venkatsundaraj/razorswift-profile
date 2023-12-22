import NavButton from '@/components_fbl/buttonComponents/NavButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import TertiaryHeading from '@/components_fbl/headingComponents/TertiaryHeading';
import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
function GetStartedSection({ readyToStartData }) {
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
    <CustomSection
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: {
          xs: '82.5vh',
          md: '100vh',
        },
      }}
    >
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={firstsec}
          initial={'offscreen'}
          whileInView={'onscreen'}
          viewport={{ once: true }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <SuperText
              sx={{
                color: 'violetPalette.dark',
              }}
            >
              {readyToStartData.title}
            </SuperText>
            <TertiaryHeading
              sx={{ color: 'primaryPalette.black' }}
              style={{ fontWeight: '500', textAlign: 'center' }}
            >
              {readyToStartData.description}
            </TertiaryHeading>
            {readyToStartData.longDescription && (
              <Grid container>
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={10}>
                  <ParagraphHeading
                    sx={{ textAlign: 'center', color: 'primaryPalette.black' }}
                  >
                    {readyToStartData.longDescription}
                  </ParagraphHeading>
                </Grid>
                <Grid item xs={12} sm={1}></Grid>
              </Grid>
            )}
            {readyToStartData.buttonText && (
              <NavButton
                href="/contact-us"
                sx={{
                  transition: 'all 300ms linear',
                  '&:hover': {
                    backgroundColor: 'pinkPalette.dark',
                    color: 'primaryPalette.white',
                  },
                }}
              >
                {readyToStartData.buttonText}
              </NavButton>
            )}
            {readyToStartData.qrImage && (
              <CustomImage
                alt={readyToStartData.title}
                width={{ xs: '100px' }}
                aspectRatio="1/1"
                src={readyToStartData.qrImage}
              />
            )}

            <CustomImage
              alt={readyToStartData.title}
              width={{
                xs: '300px',
                sm: '500px',
                md: '500px',
                lg: '560px',
                xl: '700px',
              }}
              aspectRatio="1/0.85"
              src={readyToStartData.mainImage}
            />
          </Container>
        </motion.div>
      </motion.div>
    </CustomSection>
  );
}

export default GetStartedSection;
