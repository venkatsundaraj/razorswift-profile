import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import { solutionsData } from '@/constants/Aspirants/aspirantPageData';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { reverseCheckAndSet } from '@/utils/CommonFunctions/Functions';
import { callApi } from '@/utils/apirequest';
import { capitalizeFirstletter } from '@/utils/getCourseList';
import {
  alphabetsValidationSchema,
  emailValidation,
  messageValidation,
  nameValidationwithNoRegex,
  validateContactNumber,
} from '@/utils/helpers/validationSchemas';
import { Box, Stack } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import ExtraParagraphHeading from '../headingComponents/ExtraParagraphHeading';
import InputField from './FormUI/InputField/InputField';
import SelectWrapper from './FormUI/Select/SelectWrapper';

const initialValues = {
  fullName: '',
  email: '',
  mobileNumber: '',
  companyName: '',
  moreInfo: '',
  reason: 'Aspirant',
};

const queryValue = ['partner', 'business'];

const validationSchema = Yup.object().shape({
  fullName: alphabetsValidationSchema('fullName', true),
  email: emailValidation('Email', true),
  mobileNumber: validateContactNumber('Mobile Number', true),
  moreInfo: messageValidation('More Info', true),
  companyName: nameValidationwithNoRegex('Company Name', false),
});

function FormSection() {
  const searchParams = useSearchParams();
  const { loading, setLoading } = useContext(LoadingContext);
  if (queryValue.includes(searchParams.get('from'))) {
    initialValues.reason = capitalizeFirstletter(searchParams.get('from'));
  }

  return (
    <Box sx={{ padding: '16px 0' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            setSubmitting(true);
            setLoading(true);

            console.log(values);
            const response = await callApi(
              'contactRequest',
              reverseCheckAndSet(values)
            );

            if (response?.data) {
              resetForm();
              return toast.success(response.data);
            }
          } catch (err) {
            if (err instanceof AxiosError) {
              console.log(err);
            }
            return toast.error(
              'Something went wrong. Please try after some time'
            );
          } finally {
            setSubmitting(false);
            setLoading(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="start"
              gap={2}
            >
              <ExtraParagraphHeading
                sx={{ color: 'violetPalette.dark', display: 'none' }}
              >
                I am an/a
              </ExtraParagraphHeading>
              <SelectWrapper
                placeholder="Looking for"
                name="reason"
                defaultState={initialValues.reason}
                label="Reason"
                textlabel="Reason"
                required
                solutionsData={solutionsData}
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
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
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
                  '&:after': {
                    content: "''",
                    position: 'absolute',
                    width: '98%',
                    zIndex: '-1',
                    backgroundColor: 'pinkPalette.navLight',
                    height: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%) rotate(-4deg)',
                    borderRadius: 4,
                  },
                }}
              />
            </Stack>
            <Stack flexDirection="column" gap={3} alignItems="start">
              <InputField
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.fullName}
                label="Full Name"
                variant="standard"
                error={errors.fullName}
              />

              <InputField
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.companyName}
                label="Company Name"
                variant="standard"
                error={errors.companyName}
              />

              <InputField
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                value={values.email}
                label="Email ID"
                variant="standard"
                error={errors.email}
              />

              <InputField
                name="mobileNumber"
                onChange={e => {
                  setFieldValue(
                    'mobileNumber',
                    e.target.value.replace(/[^0-9]/g, '')
                  );
                }}
                onBlur={handleBlur}
                type="tel"
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                  '& input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                }}
                max={10}
                value={values.mobileNumber}
                label="Mobile Number"
                variant="standard"
                error={errors.mobileNumber}
              />

              <InputField
                name="moreInfo"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                multiline
                rows={4}
                value={values.moreInfo}
                label="Your Message"
                variant="standard"
                error={errors.moreInfo}
              />

              <SubmitButton
                disabled={isSubmitting}
                type="submit"
                sx={{
                  backgroundColor: '#EE5064',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#EE5064',
                    color: '#fff',
                  },
                }}
              >
                Submit
              </SubmitButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default FormSection;
