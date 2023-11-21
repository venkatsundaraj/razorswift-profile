import CheckboxWrapper from '@/components_fbl/FormComponents/FormUI/Checkbox/CheckboxWrapper';
import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { AccountApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  alphabetsValidationSchema,
  emailValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import styled from '@emotion/styled';
import { Box, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  mobileNumber: '',
  acceptTermsAndConditions: true,
};

const CustomCheckBox = styled(Link)(({ theme }) => ({
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
const FORM_VALIDATION = Yup.object().shape({
  fullName: alphabetsValidationSchema('Full Name', true),
  email: emailValidation('Email', true),
  mobileNumber: validateContactNumber('Mobile Number', true),
  acceptTermsAndConditions: Yup.boolean().oneOf(
    [true],
    'The acceptance of Terms and Conditions is required.'
  ),
});

function SignupForm() {
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  const [signUpInitialValues, setSignUpInitialValues] = useState({
    ...INITIAL_FORM_STATE,
    mobileNumber: router?.query?.mobile
      ? router?.query?.mobile.substring(2)
      : '',
  });

  console.log(INITIAL_FORM_STATE, router.query.mobileNumber);

  const SubmitDetails = async function (values, { resetForm, setSubmitting }) {
    checkIsValidUser(values, { resetForm, setSubmitting });
  };

  const checkIsValidUser = async function (
    values,
    { resetForm, setSubmitting }
  ) {
    try {
      setLoading(true);
      setSubmitting(true);
      let accountApi = new AccountApi();

      const opts = {
        body: {
          contactNumber: `91${values.mobileNumber}`,
          fullName: values.fullName.trim(),
          email: values.email.trim(),
        },
      };

      const response = await accountApi.apiAccountValidateCandidatePost(opts);
      // const response = await new Promise(resolve => setTimeout(resolve, 5000));

      if (!response) throw new Error('Something went Wrong');
      console.log(response);
      if (response.body.message === 'User does Not Exists.') {
        localStorageUtil.setItem('loginDetails', opts.body);

        return router.push({ pathname: `/otp`, query: { path: 'signup' } });
      } else if (response.body.message === 'User Exists.') {
        return toast.error('User already exists please Sign In');
      } else {
        return toast.error(response.body.message);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
      return toast.error('Something went wrong. Please try after some time');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={signUpInitialValues}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          SubmitDetails(values, { resetForm, setSubmitting })
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
            <Stack
              flexDirection="column"
              alignItems="start"
              justifyContent="center"
              gap="20px"
            >
              <SecondaryHeading sx={{ color: 'primaryPalette.black' }}>
                Welcome Back!
              </SecondaryHeading>
              <ExtraParagraphHeading
                sx={{
                  color: 'primaryPalette.black',
                  fontWeight: 'normal',
                }}
              >
                Opportunitites, Talent and More
              </ExtraParagraphHeading>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={1}></Grid>
                {/* <Grid item xs={12} sm={4}>
                  <SelectWrapper
                    placeholder="Looking for"
                    name="reason"
                    solutionsData={solutionsData}
                    label="Reason"
                    textlabel="Reason"
                    required
                    sx={{
                      color: 'pinkPalette.dark',
                      position: 'relative',
                      background: 'transparent',
                      border: '1px solid #A62973',
                      borderRadius: '40px',
                      mb: { xs: '20px', md: '0' },
                      '& .MuiSelect-icon': {
                        transition: 'all 0.265s ease',
                        top: 'calc(50% - 16px)',
                        width: '16px',
                      },
                      '.MuiSelect-outlined': {
                        background: 'transparent',
                      },
                      '.MuiTypography-root': {
                        color: 'pinkPalette.dark',
                      },
                      '.MuiOutlinedInput-notchedOutline': { border: '0' },
                      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                          border: 0,
                        },
                      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          border: 0,
                        },
                      '& .MuiSelect-icon': {
                        top: 'calc(50% - 16px)',

                        transition: 'all 0.265s ease',
                        width: '20px',
                      },
                    }}
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={5}></Grid> */}
                <Grid item xs={12} sm={11}>
                  <InputLabel
                    htmlFor="filled-hidden-label-small"
                    sx={{
                      mb: 1.4,
                      fontSize: 'clamp(16px, 1.6vw, 18px)',
                      color: 'primaryPalette.black',
                      fontWeight: '500',
                    }}
                  >
                    Full Name
                  </InputLabel>
                  <InputField
                    sx={{
                      borderRadius: '100vw',
                      outline: 'none',
                      backgroundColor: '#dedede',
                      '& fieldset': { border: 'none' },
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    hiddenLabel
                    id="filled-hidden-label-small"
                    value={values.fullName}
                    error={errors.fullName}
                    type="text"
                    variant="filled"
                    name="fullName"
                    label=""
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: '40px' },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={11}>
                  <InputLabel
                    htmlFor="filled-hidden-label-small"
                    sx={{
                      mb: 1.4,
                      fontSize: 'clamp(16px, 1.6vw, 18px)',
                      color: 'primaryPalette.black',
                      fontWeight: '500',
                    }}
                  >
                    Email Address
                  </InputLabel>
                  <InputField
                    sx={{
                      borderRadius: '100vw',
                      outline: 'none',
                      backgroundColor: '#dedede',
                      '& fieldset': { border: 'none' },
                    }}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email}
                    hiddenLabel
                    id="filled-hidden-label-small"
                    type="text"
                    variant="filled"
                    name="email"
                    label=""
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: '40px' },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={11}>
                  <InputLabel
                    htmlFor="filled-hidden-label-small"
                    sx={{
                      mb: 1.4,
                      fontSize: 'clamp(16px, 1.6vw, 18px)',
                      color: 'primaryPalette.black',
                      fontWeight: '500',
                    }}
                  >
                    Mobile Number
                  </InputLabel>
                  <InputField
                    sx={{
                      borderRadius: '100vw',
                      outline: 'none',
                      backgroundColor: '#dedede',
                      '& fieldset': { border: 'none' },
                    }}
                    fullWidth
                    onChange={e => {
                      setFieldValue(
                        'mobileNumber',
                        e.target.value.replace(/[^0-9]/g, '')
                      );
                    }}
                    onBlur={handleBlur}
                    value={values.mobileNumber}
                    error={errors.mobileNumber}
                    hiddenLabel
                    id="filled-hidden-label-small"
                    type="tel"
                    variant="filled"
                    name="mobileNumber"
                    label=""
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: '40px' },
                      startAdornment: (
                        <Typography sx={{ fontWeight: 500, color: '#212121' }}>
                          +91
                        </Typography>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={11}>
                  <CheckboxWrapper
                    component={
                      <CustomCheckBox
                        sx={{ textDecoration: 'none' }}
                        component={Link}
                        prefetch={false}
                        href={'/termsofservices'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and conditions
                      </CustomCheckBox>
                    }
                    name="acceptTermsAndConditions"
                    legend="accept Terms And Conditions"
                    label="I Accept"
                  />
                </Grid>
              </Grid>
              <Stack
                sx={{
                  alignSelf: 'center',
                }}
                flexDirection="column"
                alignItems="center"
                gap="14px"
              >
                <SubmitButton
                  disabled={isSubmitting}
                  type="submit"
                  sx={{
                    backgroundColor: 'violetPalette.dark',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'violetPalette.dark',
                      color: '#fff',
                    },
                  }}
                >
                  Sign Up
                </SubmitButton>
                <ParagraphHeading
                  sx={{
                    color: 'primaryPalette.black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <Link style={{ color: '#3A3A3A' }} href="/login-page">
                    Click here
                  </Link>
                  to Login Instead
                </ParagraphHeading>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default SignupForm;
