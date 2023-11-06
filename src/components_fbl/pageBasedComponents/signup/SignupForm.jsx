import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
import { solutionsData } from '@/constants/Aspirants/aspirantPageData';
import {
  alphabetsValidationSchema,
  emailValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import SelectWrapper from '../../FormComponents/FormUI/Select/SelectWrapper';

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

function SignupForm() {
  const router = useRouter();
  const [signUpInitialValues, setSignUpInitialValues] = useState({
    ...INITIAL_FORM_STATE,
    mobileNumber: router?.query?.mobile
      ? router?.query?.mobile.substring(2)
      : '',
  });

  return (
    <Box>
      <Formik initialValues={signUpInitialValues}>
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
          <Form>
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
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={7}>
                  <InputLabel
                    htmlFor="filled-hidden-label-small"
                    sx={{
                      mb: 1.4,
                      fontSize: 'clamp(16px, 1.6vw, 18px)',
                      color: 'primaryPalette.black',
                      fontWeight: '500',
                    }}
                  >
                    Full Name / Company Name
                  </InputLabel>
                  <InputField
                    sx={{
                      borderRadius: '100vw',
                      outline: 'none',
                      backgroundColor: '#dedede',
                      '& fieldset': { border: 'none' },
                    }}
                    fullWidth
                    hiddenLabel
                    id="filled-hidden-label-small"
                    type="text"
                    variant="filled"
                    name="Company Name"
                    label=""
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: '40px' },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={11}>
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
                    hiddenLabel
                    id="filled-hidden-label-small"
                    type="text"
                    variant="filled"
                    name="Email"
                    label=""
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: '40px' },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={11}>
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
                    hiddenLabel
                    id="filled-hidden-label-small"
                    type="tel"
                    variant="filled"
                    name="mobileNumber"
                    label=""
                    InputProps={{
                      disableUnderline: true,
                      sx: { borderRadius: '40px' },
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
                <ParagraphHeading sx={{ color: 'primaryPalette.black' }}>
                  <Link style={{ color: '#3A3A3A' }} href="/login">
                    Click here
                  </Link>{' '}
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
