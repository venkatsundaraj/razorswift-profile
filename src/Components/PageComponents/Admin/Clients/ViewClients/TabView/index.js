import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { styled } from '@mui/material';

import ClientContact from '@/pageComponents/Admin/Clients/ViewClients/TabView/ClientContact';
import ClientContract from '@/pageComponents/Admin/Clients/ViewClients/TabView/ClientContract';
import ClientOverview from '@/pageComponents/Admin/Clients/ViewClients/TabView/ClientOverview';
import { Container } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useRef } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
const toggleSolutionsButtonArray = [
  { id: 1, value: 'Overview' },
  { id: 2, value: 'Contact' },
  { id: 3, value: 'Contract' },
];

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root , &.MuiToggleButton-root:hover': {
    color: '#000000',
    height: '43.6px',
    borderColor: '#DDDDDD',
    border: '3px solid #DDDDDD',
    borderRadius: '100px !important',
    backgroundColor: 'white',
    mx: 2,
    border: '2px solid #DDDDDD !important',
    justifyContent: 'center',
    alignItems: 'center',

    maxWidth: '160px',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21.6px',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      fontWeight: '500',
      fontSize: '11px',
      lineHeight: '15px',
      maxWidth: '124px',
    },
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#ffffff',
    backgroundColor: '#1D1D1D',
    borderRadius: '100px !important',
    mx: 2,
    border: `2px solid ${'black'} !important`,
    maxWidth: '150px',
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
const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  gap: 15,
  groupedHorizontal: {
    '&&.Mui-selected + &&.Mui-selected': {
      borderLeft: `100px solid ${theme.palette.primary.main}`,
      borderTop: 10,
      marginTop: 0,
    },
  },
  '&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)':
    {
      marginLeft: 0,
    },
  '&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)':
    {
      marginLeft: 0,
    },
}));

const ToggleButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: 'inherit',
  fontSize: '16px',
  fontWeight: '700',
  textAlign: 'center',
  lineHeight: '18.96px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '14.01px',
  },
}));

const TabView = () => {
  const [alignment, setAlignment] = useState(
    toggleSolutionsButtonArray[0].value
  );
  const [component, setComponent] = useState(<ClientOverview />);
  const swiperRef = useRef(null);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      console.log(alignment, newAlignment);
      setAlignment(newAlignment.value);
      switch (newAlignment.value) {
        case 'Overview':
          return setComponent(<ClientOverview />);
        case 'Contact':
          return setComponent(<ClientContact />);
        case 'Contract':
          return setComponent(<ClientContract />);

        default:
          return null;
      }
    }
  };

  return (
    <Stack direction="column" spacing={3} sx={{ maxWidth: 'lg' }}>
      <Container maxWidth="sm">
        <Swiper
          cssMode={false}
          allowTouchMove={true}
          slideToClickedSlide={true}
          // initialSlide={slideTo}
          // navigation={{ prevEl: CustomPrevButton, nextEl: CustomNextButton }}
          navigation={true}
          modules={[Navigation]}
          ref={swiperRef}
          loop={false}
          observer
          observeParents
          spaceBetween={4}
          slidesPerView={4}
          preventClicks={true}
          preventClicksPropagation={true}
          breakpoints={
            // when window width is >= 320px
            {
              slidesPerView: 3,
              spaceBetween: 10,
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 4,
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
          {toggleSolutionsButtonArray.map((values, index) => (
            <SwiperSlide key={values.id}>
              <ToggleButton
                fullWidth
                key={values.id}
                selected={values.value === alignment}
                value={values.value}
                onClick={(e, value) => handleChange(e, values)}
                // onChange={(e, value) => handleChangeSwiper(e, values)}
              >
                <ToggleButtonText>{values.value}</ToggleButtonText>
              </ToggleButton>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {component}
    </Stack>
  );
};

export default TabView;
