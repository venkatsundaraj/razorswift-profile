import React, { useRef, useState } from 'react';
// import ToggleButton from '@mui/material/ToggleButton'
import ShadowButton from '@/buttonComponents/ShadowButton';
import MediaCard from '@/cardComponents//MediaCard';
import PageTitle from '@/headingComponents/PageTitle';
import { Container, styled, Typography, useTheme } from '@mui/material';
import ToggleButtonSwiper from 'src/Components/SwiperComponents/ToggleButtonSwiper';
import {
  mediaCardD2C,
  mediaCardDesign,
  mediaCardMarketing,
  mediaCardTechnology,
  toggleButtonArray,
} from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';
import { Swiper, SwiperSlide } from 'swiper/react';

const CustomContainer = styled(Container)(({ theme }) => ({
  maxHeight: '723px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: 'linear-gradient(233.76deg, #F9F9F9 28.85%, #F9F9F9 71.15%);',
  gap: 1,
  [theme.breakpoints.down('sm')]: {
    height: '600px',
    maxHeight: '723px',
    padding: '0',
    gap: 0,
    margin: '0',
  },
}));

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '20px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '26.68px',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '20.01px',
  },
}));

const PopularCourses = () => {
  const [alignment, setAlignment] = React.useState('Design');
  const [mediaArray, setMediaArray] = useState(mediaCardDesign);
  const theme = useTheme();
  const swiperRef = useRef(null);

  const getMediaArray = value => {
    let emoji = {
      Design: mediaCardDesign,
      Technology: mediaCardTechnology,
      Marketing: mediaCardMarketing,
      D2C: mediaCardD2C,
    }[value];
    return emoji || mediaCardDesign;
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment.value !== null && newAlignment.value !== alignment) {
      console.log(alignment, newAlignment.value);
      setAlignment(newAlignment.value);
      setMediaArray(getMediaArray(newAlignment.value));
    }
  };

  return (
    <CustomContainer maxWidth="lg" sx={{ ...marginTopBottom, marginTop: 0 }}>
      <PageTitle sx={{ mt: 5 }}>Popular Courses</PageTitle>
      <Container sx={{}} maxWidth="md">
        <ToggleButtonSwiper
          arrayDetails={toggleButtonArray}
          handleChange={handleChange}
          alignment={alignment}
          swiperRef={swiperRef}
          breakpoints={
            // when window width is >= 320px
            {
              slidesPerView: 2,
              spaceBetween: 20,
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }
          }
        />
      </Container>

      <Container sx={{ mt: 5 }}>
        <Swiper
          loop={false}
          spaceBetween={50}
          slidesPerView={2}
          direction="horizontal"
          breakpoints={
            // when window width is >= 320px
            {
              slidesPerView: 2,
              spaceBetween: 20,
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }
          }
        >
          {mediaArray.map((values, index) => (
            <SwiperSlide key={values.id}>
              <MediaCard {...values} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <ShadowButton
        height="57.46px"
        width="181.01px"
        sx={{ my: 5 }}
        backgroundColor={theme.palette.primary.main}
      >
        <ButtonText>Explore courses</ButtonText>
      </ShadowButton>
    </CustomContainer>
  );
};

export default PopularCourses;
