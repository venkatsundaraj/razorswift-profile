import { styled } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';

import 'swiper/css';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root , &.MuiToggleButton-root:hover': {
    color: '#000000',
    height: '52.26px',
    borderColor: '#DDDDDD',
    border: '3px solid #DDDDDD',
    borderRadius: '100px !important',
    backgroundColor: 'white',
    mx: 2,
    border: '2px solid #DDDDDD !important',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '300px',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21.6px',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '15px',
      maxWidth: '128px',
    },
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#ffffff',
    backgroundColor: '#1D1D1D',
    borderRadius: '100px !important',
    mx: 2,
    border: `2px solid ${'black'} !important`,
    maxWidth: '300px',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      maxWidth: '103px',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '15px',
    },
  },
}));

export default function ToggleButtonSwiper({
  arrayDetails,
  handleChange,
  alignment,
  swiperRef,
  breakpoints,
  slidesPerView,
  spaceBetween,
}) {
  return (
    <Swiper
      cssMode={false}
      allowTouchMove={true}
      slideToClickedSlide={true}
      // initialSlide={slideTo}

      ref={swiperRef}
      loop={false}
      observer
      observeParents
      spaceBetween={spaceBetween | 0}
      slidesPerView={slidesPerView || 1}
      preventClicks={true}
      preventClicksPropagation={true}
      breakpoints={breakpoints}
    >
      {arrayDetails.map((values, index) => (
        <SwiperSlide key={values.id}>
          <ToggleButton
            fullWidth
            key={values.id}
            selected={values.value === alignment}
            value={values.value}
            onClick={(e, value) => handleChange(e, values)}
            // onChange={(e, value) => handleChangeSwiper(e, values)}
          >
            {values.value}
          </ToggleButton>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
