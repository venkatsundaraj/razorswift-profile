import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import demosection from '@/constants/Homepage/demosection';
import Link from '@mui/material/Link';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
import homePageImagePaths from '../../../constants/ImagePaths/Homepage/homePageImagePaths';
const DemoSection = () => {
  console.log(demosection);
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
        lineHeight: '1.0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: { xs: '100%', sm: '', md: '' },
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.div transition={{ staggerChildren: 1.9 }}>
          <motion.div
            variants={singlesec}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SuperText
                variant="h1"
                sx={{
                  color: 'primary.purp',
                  lineHeight: '1.0',
                }}
              >
                {demosection.title}
              </SuperText>
              <ParagraphHeading
                variant="body1"
                sx={{
                  margin: '20px 0',
                  color: 'black',
                }}
              >
                {demosection.description}
              </ParagraphHeading>
            </Box>
          </motion.div>
        </motion.div>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <Box
            sx={{
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: '200px',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              zIndex: '1',
              cursor: 'pointer',
              color: 'red',
              '&:hover': {
                color: 'white',
                backgroundColor: 'primary.main',
              },
              '&:hover > a': {
                color: 'white',
              },
            }}
          >
            <Link
              href={demosection.link}
              variant="body1"
              underline="none"
              sx={{
                fontSize: '15px',
              }}
            >
              {demosection.button}
            </Link>
          </Box>
        </Box>
        <Box sx={{ marginTop: { xs: '-10px', md: '-42px' } }}>
          <Image
            alt="readytostartnew"
            style={{ width: 'clamp(350px, 54vw, 1000px)', height: 'auto' }}
            src={homePageImagePaths.readytostartnew}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default DemoSection;
