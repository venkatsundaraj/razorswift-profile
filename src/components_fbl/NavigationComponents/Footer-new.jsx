'use client';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import homePageImagePaths from '@/constants/ImagePaths/Homepage/homePageImagePaths';
import { socialIcons } from '@/src/constants/Aspirants/aspirantPageData';
import { navFooterItems } from '@/src/constants/Navigation/navDataComponents';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const initialState = {
  id: 0,
  isInteracted: false,
};
const Footer = ({}) => {
  const [isInView, setIsInView] = useState(false);
  const [calcValue, setCalcValue] = useState(0);
  const [toggleHover, setToggleHover] = useState(initialState);
  const sectionRef = useRef(null);
  const isView = useInView(sectionRef, {
    margin: '0px 0px 50px 0px',
    once: true,
  });
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsInView(isView);
  }, [isInView, isInView, isView]);

  useMotionValueEvent(scrollY, 'change', latest => {
    const primaryCondition =
      latest +
      document.documentElement.clientHeight -
      sectionRef.current.offsetTop;

    if (primaryCondition >= 0) {
      const calculatedValue =
        (primaryCondition / sectionRef.current.scrollHeight) * 200;

      setCalcValue(calculatedValue);
    }
  });
  const handlePopoverOpen = function (id) {
    setToggleHover({
      id: id,
      isInteracted: true,
    });
  };
  const handlePopoverClose = function (id) {
    setToggleHover({ id: id, isInteracted: false });
  };

  return (
    <Box
      component="footer"
      ref={sectionRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: 'fitContent',
        transform: `translateY(${200 - calcValue}px)`,
        overflowX: 'hidden',
        color: 'primaryPalette.white',
        pt: { xs: 10, sm: 10, xl: 8 },
        '&:before': {
          zIndex: '-11',
          content: "''",
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          backgroundColor: '#fcfcfc',
        },
        '&:after': {
          zIndex: '-10',
          transition: `${
            isInView ? 'clip-path 600ms ease-in 200ms' : 'clip-path 10ms linear'
          }`,
          clipPath: `${
            isInView
              ? 'circle(100%)'
              : `circle(10% at 50% ${
                  sectionRef?.current?.scrollHeight
                    ? sectionRef?.current?.scrollHeight + 200
                    : 500
                }px)`
          }`,
          content: "''",
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          backgroundColor: '#3B0647',
        },
      }}
    >
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography
              sx={{
                mb: 2.0,
                color: 'primaryPalette.white',
                fontSize: 'clamp(22px, 3vw, 40px)',
                fontWeight: '500',
              }}
            >
              Empowering Talent. Enabling Growth.
            </Typography>
            <Typography
              sx={{
                mb: 3.2,
                fontWeight: 'normal',
                fontSize: 'clamp(18px,1.4vw, 24px)',
              }}
            >
              A Dynamic ecosystem where talent and opportunities converge.
            </Typography>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              columnGap={{ xs: '30px', sm: '0' }}
              sx={{ py: 1.6, borderTop: '1px solid white', flexWrap: 'wrap' }}
            >
              {navFooterItems.map(nav => (
                <Link
                  href={nav.link}
                  key={nav.id}
                  style={{ textDecoration: 'none' }}
                >
                  <Stack
                    id={nav.id}
                    alignItems="center"
                    justifyContent="start"
                    flexDirection="row"
                    sx={{
                      color: 'primaryPalette.white',
                      textTransform: 'uppercase',
                    }}
                    gap={0.2}
                    onMouseEnter={e => handlePopoverOpen(nav.id)}
                    onMouseLeave={e => handlePopoverClose(nav.id)}
                  >
                    <Typography
                      sx={{
                        color: `${
                          toggleHover.isInteracted && toggleHover.id === nav.id
                            ? '#FFAFB9'
                            : 'primaryPalette.white'
                        }`,
                        fontSize: '12px',
                        transition: `color 500ms linear`,
                      }}
                    >
                      {nav.item}
                    </Typography>
                    <IconButton sx={{ fontSize: '12px', color: 'white' }}>
                      {toggleHover.isInteracted && toggleHover.id === nav.id ? (
                        <LaunchIcon
                          sx={{
                            color: '#FFAFB9',
                            transition: `color 500ms linear`,
                          }}
                          fontSize="small"
                        />
                      ) : (
                        <ArrowRightAltIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={2}>
            <Stack
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{
                borderLeft: { xs: '', sm: '1px solid white' },
                mb: { xs: '20px', sm: '' },
              }}
            >
              <Link href="/">
                <CustomImage
                  src={homePageImagePaths.footerlogo}
                  aspectRatio="236/116"
                  width="180px"
                />
              </Link>
              <Stack
                alignItems={{ xs: 'center', sm: 'self-end' }}
                justifyContent="center"
                gap={2}
                flexDirection="row"
              >
                {socialIcons.map(img => (
                  <Link key={img.id} href={img.link}>
                    <CustomImage
                      k
                      src={img.img}
                      aspectRatio="1/1"
                      width="28px"
                    />
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ width: '100%', backgroundColor: '#280231' }}>
        <Container>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            flexWrap="wrap"
            columnGap="20px"
            rowGap="10px"
            sx={{ py: 2 }}
          >
            <ParagraphHeading
              style={{ fontSize: '14px' }}
              sx={{
                flex: '1',
                textWrap: { xs: 'nowrap', sm: 'initial' },
                textAlign: { xs: 'center', sm: 'initial' },
              }}
            >
              2023 Razorswift. All rights reserved.
            </ParagraphHeading>
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={4}
              sx={{ width: { xs: '100%', sm: 'initial' } }}
              justifyContent={{ xs: 'space-between', sm: 'center' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                href="termsofservices"
              >
                <ParagraphHeading
                  style={{ fontSize: '14px' }}
                  sx={{ color: 'inherit' }}
                >
                  Terms of Services
                </ParagraphHeading>
              </Link>
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                href="/privacypolicy"
              >
                <ParagraphHeading
                  style={{ fontSize: '14px' }}
                  sx={{ color: 'inherit' }}
                >
                  Privacy Policy
                </ParagraphHeading>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default Footer;
