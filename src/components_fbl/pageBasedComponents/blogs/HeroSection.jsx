import { bebasNeue, urbanist } from '@/utils/themes/typography';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
const HeroSection = ({ filteredData }) => {
  console.log(filteredData.blogs[0].individualBlogTitle);

  const accordimg = {
    width: 'clamp(280px, 21.7vw, 360px)',
    height: 'auto',
  };
  const cardsRef = useRef([]);
  const slide1 = {
    transform: 'translate(-50%, 23%) scale(1)',
    zIndex: '3',
  };
  const slide2 = {
    transform: 'translate(-50%, 13%) scale(0.9)',
    zIndex: '2',
  };
  const slide3 = {
    transform: 'translate(-50%, 4%) scale(0.8)',
    zIndex: '1',
  };
  const [cardColors, setCardColors] = useState([slide1, slide2, slide3]); // Initial colors
  const totalCards = cardColors.length;
  useEffect(() => {
    const totalCards = cardColors.length;

    // Change colors smoothly after 5 seconds
    const timeoutId = setTimeout(() => {
      setCardColors(prevColors => {
        const rotatedColors = [...prevColors];
        rotatedColors.unshift(rotatedColors.pop()); // Rotate the colors
        return rotatedColors;
      });
    }, 5000);

    // Clear the timeout to avoid triggering the color change if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [cardColors]);

  return (
    <Box
      sx={{
        marginTop: { xs: '64px', md: '77px' },
        backgroundColor: '#A62973',
        height: '100vh',
      }}
    >
      <Container>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: '16px',
              color: 'white',
              fontFamily: urbanist.style.fontFamily,
            }}
          >
            {filteredData.blogType}
          </Typography>
          <Typography
            sx={{
              fontSize: '80px',
              color: 'white',
              fontFamily: bebasNeue.style.fontFamily,
            }}
          >
            {filteredData.blogTitle}
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              color: 'white',
              fontFamily: urbanist.style.fontFamily,
            }}
          >
            {filteredData.blogTitleone}
          </Typography>
        </Box>

        <Box>
          {filteredData.blogs.map((item, index) => (
            <Box
              ref={element => (cardsRef.current[index] = element)}
              sx={{
                backgroundColor: cardColors[index % cardColors.length],
                transition: 'background-color 1s ease', // Smooth color transition
                position: 'relative',
                marginLeft: index > 0 ? '-20px' : '0', // Adjust the overlap as needed
                zIndex: totalCards - index, // Adjust the z-index to control the stacking order
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6} xl={6}>
                  <Typography
                    sx={{
                      fontSize: '36px',
                      color: 'black',
                      fontFamily: urbanist.style.fontFamily,
                      fontWeight: '500',
                    }}
                  >
                    {item.individualBlogTitle}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      color: 'black',
                      fontFamily: urbanist.style.fontFamily,
                      fontWeight: '400',
                    }}
                  >
                    {item.individualBlogDescription}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      color: 'black',
                      fontFamily: urbanist.style.fontFamily,
                      fontWeight: '500',
                    }}
                  >
                    {item.more}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} xl={6}>
                  <Stack justifyContent="center" alignItems="center">
                    <Image
                      alt="pathwayaccordianimage"
                      style={accordimg}
                      src={item.image}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
