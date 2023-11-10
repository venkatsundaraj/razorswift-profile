import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { AccountApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { validateContactNumber } from '@/utils/validationSchema';
import styled from '@emotion/styled';
import { Box, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  mobileNumber: '',
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
  mobileNumber: validateContactNumber('Mobile Number', true),
});

function LoginForm() {
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  const [signUpInitialValues, setSignUpInitialValues] = useState({
    ...INITIAL_FORM_STATE,
    mobileNumber: router?.query?.mobile
      ? router?.query?.mobile.substring(2)
      : '',
  });

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
        },
      };

      const response = await accountApi.apiAccountValidateCandidatePost(opts);

      //   const response = await new Promise(resolve => setTimeout(resolve, 5000));

      if (!response) throw new Error('Something went Wrong');

      if (response.body.message === 'User Exists.') {
        localStorageUtil.setItem('loginDetails', opts.body);
        return router.push({ pathname: `/otp`, query: { path: 'login' } });
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
                  mb: 4,
                }}
              >
                Opportunitites, Talent and More
              </ExtraParagraphHeading>
              <Grid container alignItems="top">
                <Grid item sm={1}></Grid>
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
                </Grid>
                <Grid item sm={1}></Grid>
                <Grid item xs={3} sm={2}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      borderRadius: 10,
                      px: 2,
                      py: 2,
                      border: '1px solid #D1D1D1',
                      mr: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '18px',
                        color: 'primaryPalette.black',
                        borderBottom: '1px solid #3A3A3A',
                        display: 'block',
                        lineHeight: '16px',
                      }}
                    >
                      +91
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <InputField
                    sx={{
                      borderRadius: '100vw',
                      outline: 'none',
                      backgroundColor: '#dedede',
                      '& fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': {
                        backgroundColor: '#6F7E8C',
                      },
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
                      sx: {
                        borderRadius: '40px',
                        fontSize: '16px',
                        '&:focus': {
                          backgroundColor: 'blue',
                        },
                      },
                    }}
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
                  Generate OTP
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
                  Don't have an account yet?
                  <Link
                    style={{ color: '#3A3A3A' }}
                    href={{
                      pathname: `/sign-up`,
                      query: { mobileNumber: `91${values.mobileNumber}` },
                    }}
                  >
                    Sign Up here
                  </Link>
                </ParagraphHeading>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default LoginForm;
