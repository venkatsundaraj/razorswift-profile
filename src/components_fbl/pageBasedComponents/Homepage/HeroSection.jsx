import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import { TickerBoxData } from '@/constants/Homepage/TickerBoxData';
import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import heroSectionData from '../../../constants/Homepage/heroSectionData';
import homePageImagePaths from '../../../constants/ImagePaths/Homepage/homePageImagePaths';
const TypographyOne = styled(Typography)(({ theme }) => ({}));
const HeroSection = () => {
  const banimg = {
    width: 'clamp(370px, 63.5vw, 1210px)',
    height: 'auto',
  };
  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      x: -20,
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
  const parades = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        delay: 1,
      },
    },
  };
  const parabutton = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        delay: 2,
      },
    },
  };
  const secsecanime = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
  };
  return (
    <Stack
      sx={{
        height: {
          xs: '100%',
          md: 'calc(100vh - 65px)',
          lg: '100vh',
          xl: '100vh',
        },
        justifyContent: 'space-between',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <Stack
        sx={{
          zIndex: '1',
          marginTop: {
            lg: 'clamp(150px, 11.6vw, 250px)',
            md: 'clamp(150px, 11.6vw, 180px)',
            sm: '160px',
            xs: '160px',
          },
          marginLeft: '24px',
        }}
      >
        <Stack sx={{ mb: 2 }}>
          <motion.div transition={{ staggerChildren: 1.9 }}>
            <motion.div
              variants={firstsec}
              initial={'offscreen'}
              whileInView={'onscreen'}
              viewport={{ once: true }}
            >
              {/* <TypographyOne variant="h1">Hello World</TypographyOne> */}
              <Typography
                variant="h1"
                sx={{
                  color: 'primary.mainone',
                  lineHeight: '1.0',
                  fontSize: {
                    xl: 'clamp(110px, 6.2vw, 120px)',
                    lg: 'clamp(70px, 5.4vw, 120px)',
                    md: 'clamp(70px, 5.4vw, 100px)',
                    sm: '40px',
                    xs: '40px',
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: 'primary.main',
                    pr: '12px',
                  }}
                >
                  EMPOWERING
                </Box>
                TALENT.
              </Typography>
            </motion.div>
            <motion.div
              variants={firstsec}
              initial={'offscreen'}
              whileInView={'onscreen'}
              viewport={{ once: true }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: 'primary.mainone',
                  lineHeight: '1.0',
                  fontSize: {
                    xl: 'clamp(110px, 6.2vw, 120px)',
                    lg: 'clamp(70px, 5.4vw, 120px)',
                    md: 'clamp(70px, 5.4vw, 100px)',
                    sm: '40px',
                    xs: '40px',
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{ color: 'primary.main', pr: '12px' }}
                >
                  ENABLING
                </Box>
                GROWTH.
              </Typography>
            </motion.div>
          </motion.div>
        </Stack>
        <motion.div
          viewport={{ once: true }}
          transition={{ staggerChildren: 1.9 }}
        >
          <motion.div
            variants={parades}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                fontSize: {
                  lg: '28px',
                  md: '28px',
                  xs: '18px',
                },
              }}
            >
              <ParagraphHeading
                component="span"
                sx={{
                  lineHeight: 1.2,
                }}
              >
                {heroSectionData[0].title}
              </ParagraphHeading>
              <ParagraphHeading
                component="span"
                sx={{
                  lineHeight: 1.2,
                }}
              >
                {heroSectionData[0].titletwo}
              </ParagraphHeading>
            </Typography>
          </motion.div>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          transition={{ staggerChildren: 1.9 }}
        >
          <motion.div
            variants={parabutton}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true }}
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                marginTop: '2px',
              }}
            >
              <Link
                href="/profile"
                sx={{
                  textDecoration: 'none',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 50,
                  backgroundColor: 'primary.main',
                  color: 'common.white',
                  pt: 0.8,
                  pb: 0.8,
                  pl: 2,
                  pr: 2,
                  alignSelf: 'center',
                  transitionDuration: '0.3s',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'primary.light',
                    transform: 'translateY(-10px)',
                    transitionDuration: '0.3s',
                    transitionTimingFunction: 'ease',
                    transitionDelay: '0s',
                    transitionProperty: 'all',
                    transitionBehavior: 'normal',
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: { xs: '16px', lg: '16px', xl: '20px' } }}
                >
                  Build Your Profile
                </Typography>
              </Link>
              <Link
                href="/contact-us"
                sx={{
                  textDecoration: 'none',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 50,
                  pt: 0.8,
                  pb: 0.8,
                  pl: 2,
                  pr: 2,
                  alignSelf: 'center',
                  transitionDuration: '0.3s',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-10px)',
                    transitionDuration: '0.3s',
                    transitionTimingFunction: 'ease',
                    transitionDelay: '0s',
                    transitionProperty: 'all',
                    transitionBehavior: 'normal',
                    cursor: 'pointer',
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: { xs: '16px', lg: '16px', xl: '20px' } }}
                >
                  {' '}
                  Get a Demo
                </Typography>
              </Link>
            </Stack>
          </motion.div>
        </motion.div>
        <Stack
          sx={{
            position: { xs: '', md: 'absolute' },
            bottom: {
              xs: '50px',
              sm: '745px',
              md: '58px',
              lg: '58px',
              xl: '58px',
            },
            right: '0',
            display: { sm: 'flex', md: '' },
            alignItems: { xs: 'flex-end', md: '' },
            transform: { xs: 'translate(0px, 7px)', sm: 'translate(0px, 0px)' },
          }}
        >
          <Box component="span">
            <Image
              alt="bannerImage"
              style={banimg}
              src={homePageImagePaths.bannerImage}
            />
          </Box>
        </Stack>
      </Stack>
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={secsecanime}
          initial={'offscreen'}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: 'spring',
            duration: 2,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <TickerComponent
            variant="div"
            data={TickerBoxData}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </motion.div>
      </motion.div>
    </Stack>
  );
};
export default HeroSection;
