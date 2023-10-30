import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import Checkbox from '@/formComponents/FormsUI/Checkbox';
import Textfield from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { AccountApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { alphabetsValidationSchema } from '@/utils/validationSchema';
import { Grid, styled, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Swal from 'sweetalert2';

import {
  emailValidation,
  validateContactNumber,
} from '@/utils/validationSchema';

import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const LabelLink = styled(MuiLink)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '16.8px',
  fontWeight: '600',
  color: theme.palette.primary.main,
  fontFamily: 'Urbanist',
  cursor: 'pointer',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '14.4px',
    fontWeight: '600',
  },
}));

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  mobileNumber: '',
  acceptTermsAndConditions: true,
};
const FORM_VALIDATION = Yup.object().shape({
  fullName: alphabetsValidationSchema('Full Name', true),
  email: emailValidation('Email', true),
  mobileNumber: validateContactNumber('Mobile Number', true),
  acceptTermsAndConditions: Yup.boolean().oneOf(
    [true],
    'The acceptance of Terms and Conditions is required.'
  ),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  const [signUpInitialValues, setSignUpInitialValues] = useState({
    ...INITIAL_FORM_STATE,
    mobileNumber: router?.query?.mobile
      ? router?.query?.mobile.substring(2)
      : '',
  });

  const SubmitDetails = async values => {
    CheckIsValidUser(values);
  };
  const CheckIsValidUser = async values => {
    var accountApi = new AccountApi();
    const opts = {
      body: {
        contactNumber: `91${values.mobileNumber}`,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
      },
    };
    setLoading(true);
    await accountApi
      .apiAccountValidateCandidatePost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'User does Not Exists.') {
          // dispatch(setLoginDetails(opts.body));
          localStorageUtil.setItem('loginDetails', opts.body);
          router.push({ pathname: `/otp`, query: { path: 'signup' } });
        } else if (response.body.message === 'User Exists.') {
          dispatch(
            setAlertPopup({
              message: 'User already exists please Sign In',
              type: 'error',
              duration: 3000,
            })
          );
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
  const CheckIsValidUserRegister = async values => {
    setLoading(true);
    var accountApi = new AccountApi();
    const opts = {
      body: {
        contactNumber: `91${values.mobileNumber}`,
        fullName: values.fullName,
        email: values.email,
      },
    };
    await accountApi
      .apiAccountValidateCandidatePost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'User does Not Exists.') {
          localStorageUtil.setItem('loginDetails', opts.body);
          console.log(opts.body);
          Registration(values);
        } else if (response.body.message === 'User Exists.') {
          Swal.fire({
            icon: 'error',
            title: response.body.message,
            text: 'Please sign in',
          });
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
  const Registration = async values => {
    setLoading(true);
    var accountApi = new AccountApi();
    const opts = {
      body: {
        fullName: values.fullName,
        email: values.email,
        contactNumber: `91${values.mobileNumber}`,
        isOTPValidated: true,
      },
    };

    await accountApi
      .apiAccountRegisterCandidatePost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'Authentication Successful.') {
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Successful',
          //   text: 'Registered Successfully.',
          // });
          localStorageUtil.setItem('token', response.body.result.token);
          localStorageUtil.setItem('userDetails', response.body.result);
          router.push('/candidatedocument');
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

  return (
    <AuthFormLayout>
      <Formik
        initialValues={signUpInitialValues}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={4} justifyContent="space-between">
              <Grid item xs={12} md={8}>
                <Textfield
                  autoFocus
                  autoComplete="off"
                  name="fullName"
                  textLabel="Full Name"
                  otherProps={otherPropsRequired}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Textfield
                  name="email"
                  autoComplete="off"
                  textLabel="Email"
                  otherProps={otherPropsRequired}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Textfield
                  name="mobileNumber"
                  type="tel"
                  InputProps={{
                    startAdornment: (
                      <Typography sx={{ fontWeight: 500, color: '#212121' }}>
                        +91
                      </Typography>
                    ),
                  }}
                  autoComplete="off"
                  onChange={e => {
                    setFieldValue(
                      'mobileNumber',
                      e.target.value.replace(/[^0-9]/g, '')
                    );
                  }}
                  textLabel="Mobile Number"
                  otherProps={otherPropsRequired}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Checkbox
                  component={
                    <LabelLink
                      sx={{ textDecoration: 'none' }}
                      component={NextLink}
                      prefetch={false}
                      href={'/termsofservices'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and conditions
                    </LabelLink>
                  }
                  name="acceptTermsAndConditions"
                  legend="accept Terms And Conditions"
                  label="I Accept"
                />
              </Grid>

              <Grid item xs={12} md={8} textAlign="center">
                <ShadowButtonSubmit
                  height="50px"
                  width="100%"
                  minwidth="250px"
                  maxwidth="350px"
                  backgroundcolor={theme.palette.primary.main}
                  type="submit"
                  onClick={handleSubmit}
                >
                  <ButtonText color="#fff">Register</ButtonText>
                </ShadowButtonSubmit>
              </Grid>
              {/* <Grid item xs={12} md={8} textAlign='center'>
                <ShadowButtonSubmit
                  height='50px'
                  width='100%'
                  minwidth='250px'
                  maxwidth='350px'
                  backgroundcolor={theme.palette.primary.main}
                  type='button'
                  onClick={() => CheckIsValidUserRegister(values)}>
                  <ButtonText color='#fff'>Register Otp</ButtonText>
                </ShadowButtonSubmit>
              </Grid> */}
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};

export default SignUpForm;
