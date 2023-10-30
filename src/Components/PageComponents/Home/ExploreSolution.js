import { Box, Grid, Link, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
// import ToggleButton from '@mui/material/ToggleButton'
import ShadowButton from '@/buttonComponents/ShadowButton';
import PageTitle from '@/headingComponents/PageTitle';
import SubTitle from '@/headingComponents/SubTitle';
import Title from '@/headingComponents/Title';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import SplitScreen from '@/layouts/SplitScreen';
import { Container, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import ToggleButtonSwiper from 'src/Components/SwiperComponents/ToggleButtonSwiper';
import {
  elementArrayBottomAspirants,
  elementArrayBottomBusiness,
  elementArrayBottomMentors,
  elementArrayBottomServiceProviders,
  elementArrayTopAspirants,
  elementArrayTopBusiness,
  elementArrayTopMentors,
  elementArrayTopServiceProviders,
  toggleSolutionsButtonArrayHomePAge,
} from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';

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
const PhoneNumberText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.68px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',

    lineHeight: '24px',
  },
}));

const InfoText = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  textTransform: 'none',
  color: '#6A6A6A ',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.68px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',

    lineHeight: '24px',
  },
}));
const MailText = styled(Link)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.68px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',

    lineHeight: '24px',
  },
}));

const SubTitleText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.68px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'center',
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '22px',
  lineHeight: '37px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '28px',
    textAlign: 'center',
  },
}));
const CustomContainer = styled(Container)(({ theme }) => ({
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    alignItems: 'center',
  },
}));

const CustomContainerBottom = styled(Container)(({ theme }) => ({
  minHeight: '393.75px',
  maxWidth: '314.7px',
  background:
    ' linear-gradient(169.1deg, rgba(251, 132, 125, 0.1) 8.07%, rgba(251, 132, 125, 0) 103.02%, rgba(251, 132, 125, 0) 103.02%);',
  padding: theme.spacing(2),
  border: '2px solid rgba(238, 238, 238, 1)',
  // transform: ' matrix(-1, 0, 0, 1, 0, 0)',
  borderRadius: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'start',
  [theme.breakpoints.down('sm')]: {
    maxHeight: '341px',
    alignItems: 'center',
  },
}));

const ExploreSolution = () => {
  const [alignment, setAlignment] = React.useState(
    toggleSolutionsButtonArrayHomePAge[0].value
  );

  const [arrayBottom, setArrayBottom] = useState(elementArrayBottomBusiness);
  const [arrayTop, setArrayTop] = useState(elementArrayTopBusiness);
  const theme = useTheme();
  const swiperRef = useRef(null);

  const getArrayValue = value => {
    let array = {
      Business: [elementArrayBottomBusiness, elementArrayTopBusiness],
      Mentors: [elementArrayBottomMentors, elementArrayTopMentors],
      Aspirants: [elementArrayBottomAspirants, elementArrayTopAspirants],
      'Service providers': [
        elementArrayBottomServiceProviders,
        elementArrayTopServiceProviders,
      ],
    }[value];
    return array || [elementArrayBottomBusiness, elementArrayTopBusiness];
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      console.log(alignment, newAlignment);
      setAlignment(newAlignment.value);
      console.log(newAlignment.value);
      setArrayBottom(getArrayValue(newAlignment.value)[0]);
      setArrayTop(getArrayValue(newAlignment.value)[1]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ ...marginTopBottom }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <PageTitle>A Marketplace Managing Talent Demand And Supply</PageTitle>
        <Container maxWidth="md">
          <ToggleButtonSwiper
            arrayDetails={toggleSolutionsButtonArrayHomePAge}
            handleChange={handleChange}
            alignment={alignment}
            swiperRef={swiperRef}
            slidesPerView={4}
            spaceBetween={10}
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
                  slidesPerView: 3,
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
        <CustomContainer>
          {arrayTop?.map((values, index) => (
            <SplitScreen
              key={values.id}
              right={<RightHandComponent image={values.image} />}
              left={
                <LeftHandComponent
                  values={values}
                  title={values.title}
                  description={values.description}
                  buttonTitle={values.buttonTitle}
                  isPhoneNumber={values.isPhoneNumber}
                  phoneNumber={values.phoneNumber}
                />
              }
              orderLeft={values.orderLeft}
              orderRight={values.orderRight}
            />
          ))}
        </CustomContainer>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          // alignItems="center"
          justifyContent="center"
        >
          {arrayBottom?.map((values, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomContainerBottom key={values.id}>
                <TitleText>{values.title}</TitleText>
                <SubTitleText>{values.subTitle}</SubTitleText>
                <CommonImage
                  src={values.image}
                  alt="heroImg"
                  style={{ width: '100%', height: 'auto' }}
                />
              </CustomContainerBottom>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          spacing={2}
          justifyContent={'center'}
          alignItems="center"
        >
          <InfoText>Talk to our experts today</InfoText>

          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
          >
            <CommonImage
              src={IMAGES.S_EP_MailIcon_IM1}
              alt="heroImg"
              style={{ width: '24px', height: '24px' }}
            />
            <MailText
              href="mailto:info@razorswift.net"
              target="_top"
              gutterBottom
              sx={{ textDecoration: 'underline' }}
            >
              info@razorswift.net
            </MailText>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ExploreSolution;

const RightHandComponent = props => {
  const { image, height, width } = props;
  return (
    <CommonImage
      src={image}
      alt="heroImg"
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

const LeftHandComponent = props => {
  const router = useRouter();
  const theme = useTheme();
  const {
    title,
    description,
    buttonTitle,
    phoneNumber,
    isPhoneNumber,
    values,
  } = props;

  console.log(values.query);
  return (
    <Box
      sx={{
        width: '100%',
        // maxWidth: '383.81px',
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Title>{title}</Title>
        <Box
          sx={{
            height: '74px',
            width: '74px',
            background:
              'linear-gradient(180deg, rgba(241, 35, 26, 0.2) 0%, rgba(254, 139, 134, 0) 100%);',
            borderRadius: '100%',
            transform: 'matrix(-0.5, 0.87, 0.87, 0.5, 0, 0);',
            position: 'absolute',
            top: '-11px',
            left: '-22px',
            [theme.breakpoints.down('sm')]: {
              height: '40.83px',
              width: '40.83px',
              top: '3px',
              left: '-9px',
            },
          }}
        />
      </Box>
      <SubTitle>{description}</SubTitle>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        // spacing={5}
        spacing={{ xs: 1, sm: 2, md: 5 }}
        sx={{
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <ShadowButton
          height="50px"
          backgroundColor={theme.palette.primary.main}
          onClick={() => {
            if (buttonTitle === 'Get shortlisted') {
              router.push('/aspirants');
            } else if (values.path && values.query) {
              const dropdownvalue = { value: values.query };
              router.push({
                pathname: values.path,
                query: dropdownvalue,
              });
            } else if (values.path) {
              router.push(values.path);
            }
          }}
        >
          <ButtonText>{buttonTitle}</ButtonText>
        </ShadowButton>

        {isPhoneNumber && (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <CommonImage
              src={IMAGES.S_EP_B_Top_Icon_IM1}
              alt="heroImg"
              style={{ width: '24px', height: '24px', marginRight: 5 }}
            />
            <PhoneNumberText>{phoneNumber}</PhoneNumberText>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
