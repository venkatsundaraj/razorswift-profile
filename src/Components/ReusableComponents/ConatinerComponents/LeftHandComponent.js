import { Box, Stack } from '@mui/material';
// import ToggleButton from '@mui/material/ToggleButton'
import ShadowButton from '@/buttonComponents/ShadowButton';
import SubTitle from '@/headingComponents/SubTitle';
import Title from '@/headingComponents/Title';
import { CommonImage } from '@/imageComponents/CommonImages';
import IMAGES from '@/imageComponents/ImagePaths';
import { styled, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
// import ToggleButton from '@mui/material/ToggleButton'
import { Container } from '@mui/material';

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

const InfoText = styled(Typography)(({ theme }) => ({
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
const MailText = styled(Typography)(({ theme }) => ({
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

const LeftHandComponent = props => {
  const router = useRouter();
  const theme = useTheme();
  const { title, description, buttonTitle, phoneNumber, isPhoneNumber } = props;
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
        // justifyContent="flex-start"
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        alignItems="center"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
          },
        }}
      >
        <ShadowButton
          height="50px"
          backgroundColor={theme.palette.primary.main}
          onClick={() => {
            if (buttonTitle === 'Get shortlisted') {
              router.push('/aspirants');
            }
          }}
        >
          <ButtonText>{buttonTitle}</ButtonText>
        </ShadowButton>
        <Stack direction="row" justifyContent="center" alignItems="center">
          {isPhoneNumber && (
            <>
              <CommonImage
                src={IMAGES.S_EP_B_Top_Icon_IM1}
                alt="heroImg"
                style={{ width: '24px', height: '24px', marginRight: 5 }}
              />
              <PhoneNumberText>{phoneNumber}</PhoneNumberText>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default LeftHandComponent;
