import {
  herosection,
  herosectionthree,
  herosectiontwo,
} from '@/src/constants/Blogs/herosection';
import { bebasNeue, urbanist } from '@/utils/themes/typography';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
const HeroSection = () => {
  const popup = useRef();
  const popuptwo = useRef();
  const popupthree = useRef();
  const contnum = useRef();
  const popupcontainer = useRef();
  const [currentSlide, setCurrentSlide] = useState([1, 3, 2]);
  const [clickedNumber, setClickedNumber] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      changeClass();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  function changeClass() {
    // Find the index of the current slide in the array
    const currentIndex = currentSlide.indexOf(currentSlide[0]);

    // Increment the index in a circular manner
    const nextIndex = (currentIndex + 1) % 3;

    // Create a new array with the next order of slides
    const nextSlideOrder = [
      currentSlide[nextIndex],
      currentSlide[(nextIndex + 1) % 3],
      currentSlide[(nextIndex + 2) % 3],
    ];

    setCurrentSlide(nextSlideOrder);

    // Update the class names based on the new order
    updateClassNames();
  }

  function updateClassNames() {
    const classNames = [
      `cont1 slide${currentSlide[0]} MuiBox-root mui-style-12gf9v6`,
    ];

    // Find the index of the current slide in the array
    const currentIndex = currentSlide.indexOf(currentSlide[0]);

    // Get the index of the next container in the array
    const nextContainerIndex = (currentIndex + 1) % 3;

    // Get the slide number corresponding to the next container
    const nextContainerSlide = currentSlide[nextContainerIndex];

    classNames.push(
      `cont3 slide${nextContainerSlide} MuiBox-root mui-style-5o0qaa`
    );

    // Get the index of the next+1 container in the array
    const nextPlusOneContainerIndex = (nextContainerIndex + 1) % 3;
    const nextPlusOneContainerSlide = currentSlide[nextPlusOneContainerIndex];

    classNames.push(
      `cont2 slide${nextPlusOneContainerSlide} MuiBox-root mui-style-1hhbjvf`
    );

    // Update the class names of the boxes
    popup.current.className = classNames[0];
    popuptwo.current.className = classNames[2];
    popupthree.current.className = classNames[1];
  }

  function changeslideo() {
    setCurrentSlide([1, 3, 2]);
    setClickedNumber(1);
    updateClassNames();
  }

  function changeslidet() {
    setCurrentSlide([3, 2, 1]);
    if (currentSlide.indexOf(currentSlide[0]) == setCurrentSlide([3, 2, 1])) {
      console.log('not');
    } else {
      console.log('yes');
    }
    setClickedNumber(2);
    updateClassNames();
  }

  function changeslideth() {
    setCurrentSlide([2, 1, 3]);
    setClickedNumber(3);
    updateClassNames();
  }
  console.log(herosection[0]);
  const secstyle = {
    textDecoration: 'none',
    overflow: 'hidden',
  };
  return (
    <Box
      sx={{
        marginTop: { xs: '64px', md: '77px' },
        backgroundColor: '#A62973',
        height: '100vh',
        paddingLeft: { xs: '10px', sm: '0' },
        paddingRight: { xs: '10px', sm: '0' },
      }}
    >
      <Box>
        <Box>
          <Box
            sx={{
              paddingTop: { xs: '40px', xl: '140px' },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '18px', lg: '16px', xl: '16px' },
                textAlign: 'center',
                color: 'common.white',
                fontFamily: urbanist.style.fontFamily,
                padding: { xs: '10px', md: '0' },
              }}
            >
              RazorSwift Aspirants Blog
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '30px', lg: '50px', xl: '80px' },
                textAlign: 'center',
                color: 'common.white',
                textTransform: 'uppercase',
                fontFamily: bebasNeue.style.fontFamily,
                padding: { xs: '10px', md: '0' },
              }}
            >
              A treasure trove of knowledge
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '20px', lg: '20px', xl: '24px' },
                textAlign: 'center',
                color: 'common.white',
                fontFamily: urbanist.style.fontFamily,
                padding: { xs: '10px', md: '0' },
              }}
            >
              Knowledge hub, written for igniting growth and fueling ambitions.
            </Typography>
          </Box>
          <Box sx={{ padding: { xs: '20px', md: '0' } }}>
            <Box
              ref={popupcontainer}
              className="container"
              sx={{ position: 'relative' }}
            >
              <Box
                sx={{
                  backgroundColor: '#ffafb9',
                  width: { xs: '100%', md: '80%', lg: '90%', xl: '70%' },
                  height: {
                    xs: 'max-content',
                    md: '50vh',
                    lg: '70vh',
                    xl: '50vh',
                  },
                  position: 'absolute',
                  left: '50%',

                  borderRadius: '40px',
                }}
                ref={popup}
                className="cont slide1"
              >
                <Box sx={{ padding: '30px' }}>
                  <Grid alignItems="center" container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          color: '#212121',
                          fontSize: {
                            xs: '18px',
                            md: '25px',
                            lg: '30px',
                            xl: '36px',
                          },
                          paddingBottom: '20px',
                          borderBottom: '1px solid #A62973',
                          fontFamily: urbanist.style.fontFamily,
                          fontWeight: '600',
                        }}
                      >
                        {herosection[0].title}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#212121',
                          fontSize: { xs: '18px', xl: '20px' },
                          paddingBottom: '20px',
                          paddingTop: '20px',
                          fontFamily: urbanist.style.fontFamily,
                        }}
                      >
                        {herosection[0].article}
                      </Typography>
                      <Link
                        style={secstyle}
                        href={`/blogs/${herosection[0].slug}`}
                      >
                        <Typography
                          sx={{
                            color: '#212121',
                            fontSize: { xs: '20px', xl: '24px' },
                            fontWeight: '600',
                            fontFamily: urbanist.style.fontFamily,
                          }}
                        >
                          {herosection[0].readbutt}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      justifyContent="center"
                      alignItems="center"
                      item
                      xs={12}
                      md={6}
                    >
                      <Stack
                        justifyContent="center"
                        alignItems={{ xs: 'center', md: 'end' }}
                      >
                        <Image
                          style={{
                            width: 'clamp(300px,28vw,480px)',
                            height: 'auto',
                          }}
                          alt="bannerImage"
                          src={herosection[0].img}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#dd90be',
                  width: { xs: '100%', md: '80%', lg: '90%', xl: '70%' },
                  height: {
                    xs: 'max-content',
                    md: '50vh',
                    lg: '70vh',
                    xl: '50vh',
                  },
                  position: 'absolute',
                  left: '50%',

                  borderRadius: '40px',
                }}
                ref={popuptwo}
                className="cont slide2"
              >
                <Box sx={{ padding: '30px' }}>
                  <Grid alignItems="center" container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          color: '#212121',
                          fontSize: { xs: '18px', md: '36px' },
                          paddingBottom: '20px',
                          borderBottom: '1px solid #A62973',
                          fontFamily: urbanist.style.fontFamily,
                          fontWeight: '600',
                        }}
                      >
                        {herosectiontwo[0].title}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#212121',
                          fontSize: '20px',
                          paddingBottom: '20px',
                          paddingTop: '20px',
                          fontFamily: urbanist.style.fontFamily,
                        }}
                      >
                        {herosectiontwo[0].article}
                      </Typography>
                      <Link
                        style={secstyle}
                        href={`/blogs/${herosectiontwo[0].slug}`}
                      >
                        <Typography
                          sx={{
                            color: '#212121',
                            fontSize: { xs: '22px', md: '24px' },
                            fontWeight: '600',
                            fontFamily: urbanist.style.fontFamily,
                          }}
                        >
                          {herosectiontwo[0].readbutt}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      justifyContent="center"
                      alignItems="center"
                      item
                      xs={12}
                      md={6}
                    >
                      <Stack
                        justifyContent="center"
                        alignItems={{ xs: 'center', md: 'end' }}
                      >
                        <Image
                          style={{
                            width: 'clamp(300px,28vw,480px)',
                            height: 'auto',
                          }}
                          alt="bannerImage"
                          src={herosectiontwo[0].img}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#dfa9eb',
                  width: { xs: '100%', md: '80%', lg: '90%', xl: '70%' },
                  height: {
                    xs: 'max-content',
                    md: '50vh',
                    lg: '70vh',
                    xl: '50vh',
                  },
                  position: 'absolute',
                  left: '50%',

                  borderRadius: '40px',
                }}
                ref={popupthree}
                className="cont slide3"
              >
                <Box sx={{ padding: '30px' }}>
                  <Grid alignItems="center" container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          color: '#212121',
                          fontSize: { xs: '18px', md: '36px' },
                          paddingBottom: '20px',
                          borderBottom: '1px solid #A62973',
                          fontFamily: urbanist.style.fontFamily,
                          fontWeight: '600',
                        }}
                      >
                        {herosectionthree[0].title}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#212121',
                          fontSize: '20px',
                          paddingBottom: '20px',
                          paddingTop: '20px',
                          fontFamily: urbanist.style.fontFamily,
                        }}
                      >
                        {herosectionthree[0].article}
                      </Typography>
                      <Link
                        style={secstyle}
                        href={`/blogs/${herosectionthree[0].slug}`}
                      >
                        <Typography
                          sx={{
                            color: '#212121',
                            fontSize: { xs: '22px', md: '24px' },
                            fontWeight: '600',
                            fontFamily: urbanist.style.fontFamily,
                          }}
                        >
                          {herosectionthree[0].readbutt}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      justifyContent="center"
                      alignItems="center"
                      item
                      xs={12}
                      md={6}
                    >
                      <Stack
                        justifyContent="center"
                        alignItems={{ xs: 'center', md: 'end' }}
                      >
                        <Image
                          style={{
                            width: 'clamp(300px,28vw,480px)',
                            height: 'auto',
                          }}
                          alt="bannerImage"
                          src={herosectionthree[0].img}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'transparent',
                  width: { xs: '80%', md: '30%' },
                  height: '5vh',
                  position: 'absolute',
                  left: '15%',
                  borderRadius: '40px',
                  display: { xs: 'none', sm: 'flex' },
                  flexDirection: 'row',
                  gap: '30px',
                  alignItems: 'center',
                  padding: '10px 10px 10px 30px',
                  transform: {
                    xs: 'translate(0, 0%) scale(1)',
                    sm: 'translate(-20%, 920%) scale(1)',
                    md: 'translate(-15%, 1030%) scale(1)',
                    lg: 'translate(-33%, 1465%) scale(1)',
                    xl: 'translate(0%, 1070%) scale(1)',
                  },
                }}
                className="slidenum"
              >
                <Typography
                  ref={contnum}
                  className="contnum"
                  onClick={changeslideo}
                  sx={{
                    fontSize: '25px',
                    padding: '5px',
                    borderRadius: '100px',
                    width: '45px',
                    border: '1px solid #A62973',
                    borderWidth:
                      clickedNumber == 1
                        ? '2px'
                        : '1px' ||
                          (popup.current &&
                            popup.current.className == 'cont1 slide1')
                        ? '2px'
                        : '1px', // Adjusted border width based on clicked state
                    backgroundColor:
                      popup.current &&
                      popup.current.className ==
                        'cont1 slide1 MuiBox-root mui-style-12gf9v6'
                        ? '#A62973'
                        : 'transparent',
                    textAlign: 'center',
                    color: clickedNumber == 1 ? '#fff' : '#fff', // Adjusted color based on clicked state
                    cursor: 'pointer',
                    opacity:
                      clickedNumber == 1
                        ? 1
                        : 0.5 ||
                          (popup.current &&
                            popup.current.className ==
                              'cont1 slide1  MuiBox-root mui-style-12gf9v6')
                        ? 1
                        : 0.5, // Adjusted opacity based on clicked state
                  }}
                >
                  1
                </Typography>
                <Typography
                  onClick={changeslidet}
                  sx={{
                    fontSize: '25px',
                    padding: '5px',
                    borderRadius: '100px',
                    width: '45px',
                    border: '1px solid #A62973',
                    borderWidth:
                      clickedNumber == 2
                        ? '2px'
                        : '1px' ||
                          (popup.current &&
                            popup.current.className == 'cont1 slide3')
                        ? '2px'
                        : '1px',
                    backgroundColor:
                      popup.current &&
                      popup.current.className ==
                        'cont1 slide3 MuiBox-root mui-style-12gf9v6'
                        ? '#A62973'
                        : 'transparent',
                    textAlign: 'center',
                    color: clickedNumber == 2 ? '#fff' : '#fff',
                    cursor: 'pointer',
                    opacity:
                      clickedNumber == 2
                        ? 1
                        : 0.5 ||
                          (popup.current &&
                            popup.current.className ==
                              'cont1 slide3  MuiBox-root mui-style-12gf9v6')
                        ? 1
                        : 0.5,
                  }}
                >
                  2
                </Typography>
                <Typography
                  onClick={changeslideth}
                  sx={{
                    fontSize: '25px',
                    padding: '5px',
                    borderRadius: '100px',
                    width: '45px',
                    border: '1px solid #A62973',
                    borderWidth:
                      clickedNumber == 3
                        ? '2px'
                        : '1px' ||
                          (popup.current &&
                            popup.current.className == 'cont1 slide2')
                        ? '2px'
                        : '1px',
                    backgroundColor:
                      popup.current &&
                      popup.current.className ==
                        'cont1 slide2 MuiBox-root mui-style-12gf9v6'
                        ? '#A62973'
                        : 'transparent',
                    textAlign: 'center',
                    color: clickedNumber == 3 ? '#fff' : '#fff',
                    cursor: 'pointer',
                    opacity:
                      clickedNumber == 3
                        ? 1
                        : 0.5 ||
                          (popup.current &&
                            popup.current.className ==
                              'cont1 slide2  MuiBox-root mui-style-12gf9v6')
                        ? 1
                        : 0.5,
                  }}
                >
                  3
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
