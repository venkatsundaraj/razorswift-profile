import ShadowButton from '@/buttonComponents/ShadowButton';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';

const ReusableForm = ({
  children,
  onSubmit,
  initialValues,
  validationSchema,
  buttonText,
  readOnly,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values, resetForm);
      }}
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
          <Stack spacing={2}>
            {children}
            <ShadowButton
              height="50px"
              width="100%"
              minWidth="250px"
              maxWidth="250px"
              backgroundColor="#A62973"
              onClick={handleSubmit}
            >
              {buttonText}
            </ShadowButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ReusableForm;
