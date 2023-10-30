import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import PageTitle from '@/headingComponents/PageTitle';
import { CommonImage } from '@/imageComponents/CommonImages';
import { useTheme } from '@mui/material/styles';
import { companiesImageArray } from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';
import 'swiper/css';

const Companies = () => {
  const theme = useTheme();

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ ...marginTopBottom }}>
      <PageTitle>Featured in</PageTitle>
      {domLoaded && (
        <Swiper
          // spaceBetween={50}
          loop
          spaceBetween={50}
          slidesPerView={5}
          breakpoints={
            // when window width is >= 320px
            {
              320: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 7,
                spaceBetween: 40,
              },
            }
          }
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {companiesImageArray.map((values, index) => (
            <SwiperSlide key={values.id}>
              <div style={{ height: 75, width: 141 }}>
                <CommonImage
                  fill
                  // sizes="100vw"
                  src={values.value}
                  // height={111}
                  // width={185}
                  alt="w"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default Companies;
