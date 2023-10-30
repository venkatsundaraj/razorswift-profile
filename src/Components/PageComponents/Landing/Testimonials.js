// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper';

// import './styles.css';
import { CommonImage } from '@/imageComponents/CommonImages';
import { Box, Container, useTheme } from '@mui/material';
import styles from '../../../../styles/Home.module.css';
import './../../../../styles/Testimonials.module.css';

import TestimonialText from '@/headingComponents/TestimonialText';
import IMAGES from '@/imageComponents/ImagePaths';
import { testimonialsArray } from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';

const Testimonials = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '468.5px',
        width: '100%',
        backgroundColor: '#3C1443',
        // p: 5,
        [theme.breakpoints.down('sm')]: {
          // p: 2,
        },
        ...marginTopBottom,
        marginBottom: 0,
      }}
    >
      <Swiper
        spaceBetween={100}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        modules={[Autoplay, Pagination]}
        className={styles.swiper}
      >
        {testimonialsArray.map((values, index) => (
          <SwiperSlide key={values.id} className={styles.swiper_slide}>
            <Container
              maxWidth="lg"
              sx={{ display: 'flex', flexDirection: 'row', height: 1 }}
            >
              <Box sx={{ alignSelf: 'start' }}>
                <CommonImage
                  style={{
                    display: 'inherit',
                    height: '15vw',
                    width: '15vw',
                    maxHeight: '150px',
                    maxWidth: '194px',
                  }}
                  height="15vw"
                  width="15vw"
                  src={IMAGES.T_Left_Comma}
                  alt="logo"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <CommonImage src={values.image} alt="profile" />
                  <TestimonialText>{values.description}</TestimonialText>
                </Box>
              </Box>
              <Box sx={{ alignSelf: 'end' }}>
                <CommonImage
                  style={{
                    display: 'inherit',
                    height: '15vw',
                    width: '15vw',
                    maxHeight: '150px',
                    maxWidth: '194px',
                  }}
                  height="15vw"
                  width="15vw"
                  src={IMAGES.T_Right_Comma}
                  alt="logo"
                />
              </Box>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Testimonials;
