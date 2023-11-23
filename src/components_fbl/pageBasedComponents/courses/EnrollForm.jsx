import CheckboxWrapper from '@/components_fbl/FormComponents/FormUI/Checkbox/CheckboxWrapper';
import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import { alphabetsValidationSchema } from '@/utils/validationSchema';
import styled from '@emotion/styled';
import { Box, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  fullName: '',
  //   email: '',
  //   mobileNumber: '',
  //   acceptTermsAndConditions: true,
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
  //   email: emailValidation('Email', true),
  //   mobileNumber: validateContactNumber('Mobile Number', true),
  //   acceptTermsAndConditions: Yup.boolean().oneOf(
  //     [true],
  //     'The acceptance of Terms and Conditions is required.'
  //   ),
});

function EnrollForm() {
  const enrollUser = async function (values, { setSubmittin, resetForm }) {
    console.log(values);
  };
  return (
    <Box>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { setSubmittin, resetForm }) => {
          enrollUser(values, { setSubmittin, resetForm });
        }}
      >
        {({ handleChange, handleBlur, values, errors, isSubmitting }) => (
          <Form>
            <Stack
              flexDirection="column"
              alingItems="center"
              gap={3}
              sx={{ padding: 4 }}
            >
              <Stack alingItems="center" justifyContent="space-between"></Stack>
              <Typography
                sx={{
                  color: '#000000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 'clamp(24px, 2vw, 32px)',
                }}
              >
                Welcome to your Upskilling journey
              </Typography>
              <Grid
                container
                spacing={2}
                alingItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
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
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Stack justifyContent="center" flexDirection="row">
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
                  </Stack>
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
                    Submit
                  </SubmitButton>
                </Stack>
              </Grid>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default EnrollForm;
