import FormCard from '@/cardComponents/FormCard';
import Textfield from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { emailValidation } from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import { Grid, Stack, styled, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

const textLabelStyle = styled(Typography)(({ theme }) => ({
  color: ' rgba(106, 106, 106, 1)',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '15.6px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '11px',
    lineHeight: '13.2px',
  },
}));

export const toggleButtonArrayValues = [
  { id: 1, value: 'Yes', title: 'Yes' },
  { id: 2, value: 'No', title: 'No' },
];

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
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    '&::after': {
      position: 'absolute',

      width: '100%',
      height: '100%',
    },
  },
}));

const NameText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontSize: '24px',
  fontWeight: '700',

  lineHeight: '38.31px',
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    lineHeight: '32px',
  },
}));
const HeadLineText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.primary.main,
  fontSize: '16px',
  fontWeight: '600',

  lineHeight: '29.48px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '24px',
  },
}));

const INITIAL_FORM_STATE = {
  email: '',
  contactNumber: '',
};
const FORM_VALIDATION = Yup.object().shape({
  email: emailValidation('Email', true),
  // contactNumber: Yup.string()
  //   .required('Contact Number required')
  //   .matches(phoneRegExp, 'Enter a valid Contact Number ')
  //   .min(10, 'Contact Number is to short')
  //   .max(10, 'Contact Number is to long'),
});

const ContactInfo = () => {
  const theme = useTheme();
  const [readOnly, setReadOnly] = useState(true);
  const { data } = useContext(DataContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);
  // useEffect(() => {
  //   setInitialValues({
  //     email: data?.candidatePersonalData?.email,
  //     contactNumber: `+${data?.candidatePersonalData?.contactNumber}`,

  //   });
  // }, [data]);
  useEffect(() => {
    const contactNumber = data?.candidatePersonalData?.contactNumber;
    let formattedNumber = '';

    if (contactNumber) {
      formattedNumber = contactNumber.substring(contactNumber.length - 10);
    }

    setInitialValues({
      email: data?.candidatePersonalData?.email,
      contactNumber: formattedNumber,
    });
  }, [data]);

  const textLabel = {
    color: ' rgba(106, 106, 106, 1)',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '15.6px',
    textAlign: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
      fontSize: '11px',
      lineHeight: '13.2px',
    },
  };
  return (
    <Stack spacing={2}>
      <FormHeaderComponents
        title="Contact Info"
        isButtonNotRequired={readOnly}
        workingFunction={() => setReadOnly(false)}
      />

      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          setReadOnly(true);
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
          formik,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormCard>
                <Grid
                  sx={{ maxWidth: '550px' }}
                  container
                  spacing={{ xs: 2, sm: 2, md: 2 }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={7}>
                    <Textfield
                      readOnly={readOnly}
                      name="email"
                      textLabelStyle={textLabel}
                      textLabel="Email Id"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Textfield
                      readOnly={readOnly}
                      name="contactNumber"
                      textLabelStyle={textLabel}
                      textLabel="Mobile Number"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                </Grid>
              </FormCard>
              {!readOnly && (
                <SubmissionButton onClick={handleSubmit}>
                  Update
                </SubmissionButton>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default ContactInfo;
