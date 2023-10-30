import TestimonialsCard from '@/cardComponents/TestimonialsCard';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { testimonialsArrayHomePage } from 'src/data/app.data';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../../../styles/Home.module.css';
import './../../../../styles/Testimonials.module.css';

const Title = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '47.8px',
  textAlign: 'inherit',
  //   padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const Testimonials = () => {
  const theme = useTheme();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <Box
      sx={{
        minHeight: '500.62px',
        width: '100%',
        backgroundColor: '#3C1443',
        [theme.breakpoints.down('sm')]: {
          minHeight: '266px',
        },
      }}
    >
      <Title sx={{ textAlign: 'center', width: '100%', py: 5 }}>
        Users love Razorswift
      </Title>
      {domLoaded && (
        <Swiper
          style={{ backgroundColor: 'transparent' }}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={
            // when window width is >= 320px
            {
              slidesPerView: 3,
              spaceBetween: 10,
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }
          }
          loop={true}
          centeredSlides={true}
          // loopFillGroupWithBlank={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          //   bulletActiveClass: 'swiper-pagination-bullet-active',
          // }}
          modules={[Autoplay]}
          className={styles.swiper}
        >
          {testimonialsArrayHomePage.map((values, index) => (
            <SwiperSlide key={values.id} className={styles.swiper_slide}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 1,
                }}
              >
                <TestimonialsCard
                  header={values.header}
                  title={values.title}
                  subTitle={values.subTitle}
                  url={values.image}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default Testimonials;
