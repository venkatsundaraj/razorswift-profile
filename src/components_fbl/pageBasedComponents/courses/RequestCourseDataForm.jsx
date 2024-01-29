import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { requestCourseDataFromEmail } from '@/utils/getCourseList';
import {
  alphabetsValidationSchema,
  emailValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import { Button, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import ExtraParagraphHeading from '../../headingComponents/ExtraParagraphHeading';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  mobileNumber: '',
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: alphabetsValidationSchema('Full Name', true),
  email: emailValidation('Email', true),
  mobileNumber: validateContactNumber('Mobile Number', true),
});

function RequestCourseDataForm({ coursesList, filteredData, handleClose }) {
  const { loading, setLoading } = useContext(LoadingContext);

  const SubmitDetails = async function (values, { resetForm, setSubmitting }) {
    try {
      setLoading(true);
      console.log({ ...values, course_id: filteredData.id });
      const response = await requestCourseDataFromEmail({
        ...values,
        course_id: filteredData.id,
      });
      console.log(response);
      if (!response) throw new Error('Something went Wrong');
      if (response.status === 'Information has been sent over email.') {
        resetForm();
        handleClose();
        toast.success(coursesList.more_info.confirmation_message);
      }
    } catch (err) {
      console.log(err);
      return toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      gap={2}
      sx={{ padding: 4, maxWidth: '600px' }}
    >
      {coursesList.more_info.popup_description ? (
        <ParagraphHeading
          sx={{
            fontSize: '18px',
            color: 'primaryPalette.black',
            textAlign: 'center',
          }}
        >
          {coursesList.more_info.popup_description}
        </ParagraphHeading>
      ) : null}
      {filteredData.name ? (
        <ExtraParagraphHeading
          sx={{
            color: 'primaryPalette.black',
            textAlign: 'center',
          }}
        >
          {filteredData.name}
        </ExtraParagraphHeading>
      ) : null}

      <Formik
        initialValues={INITIAL_FORM_STATE}
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
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack
              flexDirection="column"
              alignItems="start"
              justifyContent="center"
              gap="20px"
            >
              <Grid container alignItems="center">
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
                    type="email"
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
                <Grid item xs={12} sm={12}>
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

              <Stack
                sx={{
                  alignSelf: 'center',
                }}
                flexDirection="column"
                alignItems="center"
                gap="14px"
              >
                {coursesList.more_info.popup_button_label ? (
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    sx={{
                      border: '1px solid #A62973',
                      borderRadius: '25px',
                      padding: '8px 20px',
                    }}
                  >
                    {coursesList.more_info.popup_button_label}
                  </Button>
                ) : null}
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

export default RequestCourseDataForm;
