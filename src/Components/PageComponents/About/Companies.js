import { CommonImage } from '@/imageComponents/CommonImages';
import { Container, Stack, styled, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { companiesImageArrayAboutPage } from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '41.8px',
  textAlign: 'center',
  width: '100%',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '28px',
  },
}));

const Companies = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        ...marginTopBottom,
        textAlign: 'center',
      }}
    >
      <Stack direction="row" justifyContent="center">
        <HeroHeader sx={{ maxWidth: 'md', width: '100%' }}>
          RazorSwift caters to both candidates and corporates which sets it
          apart.
        </HeroHeader>
      </Stack>

      {domLoaded && (
        <Swiper
          style={{ marginTop: 10, marginBottom: 20 }}
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
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }
          }
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {companiesImageArrayAboutPage.map((values, index) => (
            <SwiperSlide key={values.id} style={{ height: '43px' }}>
              <div
                style={{
                  height: !matches ? 47 : 19.51,
                  width: !matches ? 118 : 77,
                }}
              >
                <CommonImage
                  fill
                  sizes="100vw"
                  src={values.value}
                  //   height={!matches ? 47 : 19.51}
                  //   width={!matches ? 118 : 77}
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
