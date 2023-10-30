import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { styled } from '@mui/material';

import Experiences from '@/pageComponents//Profile/View/TabView/Experiences';
import Certification from '@/pageComponents/Profile/View/TabView/Certification';
import Education from '@/pageComponents/Profile/View/TabView/Education';
import OverView from '@/pageComponents/Profile/View/TabView/OverView';
import Projects from '@/pageComponents/Profile/View/TabView/Projects';
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

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// define your custom prev and next buttons
const CustomPrevButton = ({ onClick }) => (
  <button
    className="custom-swiper-button custom-swiper-prev-button"
    onClick={onClick}
  >
    <ArrowBackIosIcon />
  </button>
);

const CustomNextButton = ({ onClick }) => (
  <button
    className="custom-swiper-button custom-swiper-next-button"
    onClick={onClick}
  >
    <ArrowForwardIosIcon />
  </button>
);
const toggleSolutionsButtonArray = [
  { id: 1, value: 'Overview' },
  { id: 2, value: 'Education' },
  { id: 3, value: 'Experience' },

  { id: 4, value: 'Projects' },
  { id: 5, value: 'Certification' },
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
  const [component, setComponent] = useState(<OverView />);
  const swiperRef = useRef(null);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      console.log(alignment, newAlignment);
      setAlignment(newAlignment.value);
      switch (newAlignment.value) {
        case 'Overview':
          return setComponent(<OverView />);
        case 'Education':
          return setComponent(<Education />);
        case 'Experience':
          return setComponent(<Experiences />);
        case 'Projects':
          return setComponent(<Projects />);
        case 'Certification':
          return setComponent(<Certification />);
        default:
          return null;
      }
    }
  };

  return (
    <Stack direction="column" spacing={3}>
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
