import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TransparentButton from '@/buttonComponents/TransparentButton';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import {
  selectAuthState,
  setIsLoggedIn,
  setToken,
  setUserDetails,
} from '@/store/authSlice';
import { AccountApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { otpRegExp } from '@/utils/regex';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Form, Formik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const Title = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1A1A1A',
  fontSize: '28px',
  fontWeight: '700',
  // textAlign: 'center',
  lineHeight: '33.6px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
    lineHeight: '32px',
  },
}));
const SubTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#5F5F5F',
  fontWeight: '400',
  // textAlign: 'center',
  fontSize: '18px',
  lineHeight: '21.6px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));
const ReSendOtp = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#5F5F5F',
  fontWeight: '600',
  // textAlign: 'center',
  fontSize: '16px',
  lineHeight: '19.2px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12.98px',
    lineHeight: '15.58px',
  },
}));

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'right',
  lineHeight: '19.2px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const OtpForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const { loading, setLoading } = useContext(LoadingContext);
  const [mobileNumber, setMobileNumber] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const [counter, setCounter] = React.useState(60);
  const [otp, setOtp] = React.useState('');
  const [selectedOption, setSelectedOption] = useState('Text');
  const loginDetails = localStorageUtil.getItem('loginDetails');
  const shouldLog = useRef(true);

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };
  const resendOtpText = () => {
    const data = {
      data: {
        type: 'text',
        phone: loginDetails?.contactNumber,
      },
    };

    callApi('resendOtpText', data)
      .then(response => {
        if (response.data.message === 'retry send successfully') {
          dispatch(
            setAlertPopup({
              message: 'OTP resent successfully',
              type: 'success',
              duration: 3000,
            })
          );
        } else if (response.data.message === 'IPBlocked') {
          dispatch(
            setAlertPopup({
              message: 'IP Blocked, Please Try again Sometime !',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };
  const resendOtpVoice = () => {
    const data = {
      data: {
        type: 'voice',
        phone: loginDetails?.contactNumber,
      },
    };
    callApi('resendOtpVoice', data)
      .then(response => {
        if (response.data.message === 'retry send successfully') {
          dispatch(
            setAlertPopup({
              message: 'You will get a call to resend the OTP.',
              type: 'success',
              duration: 3000,
            })
          );
        } else if (response.data.message === 'IPBlocked') {
          dispatch(
            setAlertPopup({
              message: 'IP Blocked, Please Try again Sometime !',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };
  const ResetTimer = ({ resetForm }) => {
    setCounter(60);
    resetForm();
    if (selectedOption === 'Text') {
      resendOtpText();
    } else if (selectedOption === 'Voice') {
      resendOtpVoice();
    }
  };

  useEffect(() => {
    setMobileNumber(loginDetails?.contactNumber || '');
  }, [mobileNumber]);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      sendOtp();
    }
  }, []);
  const sendOtp = () => {
    const data = {
      data: {
        phone: loginDetails?.contactNumber,
      },
    };
    callApi('sendOtp', data)
      .then(response => {
        console.log(response, 'response');
        if (response.data.message === 'IPBlocked') {
          dispatch(
            setAlertPopup({
              message: 'IP Blocked, Please Try again Sometime',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };

  const Registration = async () => {
    setLoading(true);
    var accountApi = new AccountApi();
    const opts = {
      body: {
        fullName: loginDetails.fullName,
        email: loginDetails.email,
        contactNumber: `${loginDetails.contactNumber}`,
        isOTPValidated: true,
      },
    };

    await accountApi
      .apiAccountRegisterCandidatePost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'Authentication Successful.') {
          dispatch(
            setAlertPopup({
              message: 'Registered Successfully.',
              type: 'success',
              duration: 3000,
            })
          );
          dispatch(setUserDetails(response.body.result));
          dispatch(setToken(response.body.result.token));
          dispatch(setIsLoggedIn(true));
          localStorageUtil.setItem('userDetails', response.body.result);
          router.replace('/candidatedocument');
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };
  const Login = async () => {
    setLoading(true);
    var accountApi = new AccountApi();
    const opts = {
      body: {
        contactNumber: `${loginDetails.contactNumber}`,
        isOTPValidated: true,
      },
    };

    await accountApi
      .apiAccountCandidateLogInPost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'Authentication Successful.') {
          dispatch(
            setAlertPopup({
              message: 'Logged in successfully.',
              type: 'success',
              duration: 3000,
            })
          );
          dispatch(setUserDetails(response.body.result));
          dispatch(setToken(response.body.result.token));
          dispatch(setIsLoggedIn(true));
          localStorageUtil.setItem('userDetails', response.body.result);
          if (response.body.result.candidate.isStudent === null) {
            router.replace('/candidatedocument');
          } else {
            router.replace('/profile');
          }
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  const SubmitDetails = async (values, resetForm) => {
    setLoading(true);
    console.log(values);
    console.log(router.query);
    const data = {
      data: {
        otp: values.otp,
        phone: loginDetails?.contactNumber,
      },
    };
    try {
      const response = await callApi('verifyOtp', data);
      setLoading(false);
      console.log(response.data);
      if (response.data.message === 'OTP verified success') {
        dispatch(
          setAlertPopup({
            message: 'OTP verified successfully',
            type: 'success',
            duration: 3000,
          })
        );
        if (router.query.path == 'signup') {
          Registration();
        } else {
          console.log('login');
          Login();
        }
        localStorageUtil.setItem('loginDetails', {
          ...loginDetails,
          isOtpVerified: true,
        });
      } else if (response.data.message === 'OTP not match') {
        dispatch(
          setAlertPopup({
            message: 'OTP did not match',
            type: 'error',
            duration: 3000,
          })
        );
      } else if (response.data.message === 'IPBlocked') {
        dispatch(
          setAlertPopup({
            message: 'IP Blocked, Please Try again Sometime.',
            type: 'error',
            duration: 3000,
          })
        );
      } else if (
        response.data.message === 'Max limit reached for this otp verification'
      ) {
        dispatch(
          setAlertPopup({
            message:
              'OTP verification limit reached. Please try again later or contact support.',
            type: 'info',
            duration: 3000,
          })
        );
      }
    } catch (error) {
    setLoading(false);
      console.log(error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const INITIAL_FORM_STATE = {
    otp: '',
    mobileNumber: mobileNumber ? mobileNumber : '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    otp: Yup.string()
      .required('OTP is required')
      .matches(otpRegExp, ' OTP must be only digits')
      .min(6, 'OTP must be exactly 6 digits')
      .max(6, 'OTP must be exactly 6 digits'),
  });
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <AuthFormLayout>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <IconButton
          disableRipple
          sx={{ padding: 0, color: '#292D32', mb: 2 }}
          size="large"
          aria-label="back"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </IconButton>
        <Title sx={{ width: '100%' }}>Enter the Otp</Title>
        <Stack direction="row" spacing={0.5}>
          <SubTitle>OTP is sent to</SubTitle>
          <SubTitle sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            {mobileNumber ? `+91 ${mobileNumber.slice(2)}` : ''}
          </SubTitle>
        </Stack>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) =>
            SubmitDetails(values, { resetForm })
          }
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={4} justifyContent="space-between">
                <Grid item xs={12} md={12}>
                  <Box sx={{ maxWidth: '400px' }}>
                    <MuiOtpInput
                      autoFocus
                      length={6}
                      value={values.otp}
                      name="otp"
                      TextFieldsProps={{
                        error: Boolean(touched.otp && errors.otp),
                        type: 'tel',
                      }}
                      onChange={e => {
                        setFieldValue('otp', e);
                      }}
                    />
                    {touched.otp && errors.otp && (
                      <FormHelperText
                        sx={{ paddingLeft: 1.5, textTransform: 'none' }}
                        error
                        id="standard-weight-helper-text-otp"
                      >
                        {errors.otp}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={0.5}>
                      <ReSendOtp>Your OTP will expire in:</ReSendOtp>
                      <ReSendOtp sx={{ color: '#1D1D1D' }}>{counter}</ReSendOtp>
                    </Stack>
                  </Stack>
                </Grid>
                {counter === 0 ? (
                  <Grid item xs={12} sm={12} md={8}>
                    <Stack direction="row" spacing={0.5}>
                      <TransparentButton
                        backgroundColor="#fff"
                        color="purple"
                        buttonText="Resend"
                        heroBtn={false}
                        onClick={() => ResetTimer({ resetForm })}
                      />
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <FormControlLabel
                          value="Text"
                          control={<Radio color="primary" />}
                          label="Text"
                        />
                        <FormControlLabel
                          value="Voice"
                          control={<Radio color="primary" />}
                          label="Voice"
                        />
                      </RadioGroup>
                    </Stack>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
                    <ShadowButtonSubmit
                      height="50px"
                      width="100%"
                      minwidth="250px"
                      maxwidth="250px"
                      backgroundcolor={theme.palette.primary.main}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <ButtonText color="#fff">Submit</ButtonText>
                    </ShadowButtonSubmit>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Stack>
    </AuthFormLayout>
  );
};

export default OtpForm;
