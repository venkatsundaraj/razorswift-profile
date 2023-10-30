import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import Checkbox from '@/formComponents/FormsUI/Checkbox';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { gstNumberRegExp } from '@/utils/regex';
import { Grid, Stack, Typography, styled, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
const otherProps = { size: 'small', required: true };
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

const INITIAL_FORM_STATE = {
  name: '',
  gstNumber: '',
  status: 1,
  isBranched: true,
  webSite: '',
  companySize: '',
  dateOfOnBoarding: '',
  typeOfService: '',
  isActive: true,
  businessVerticalId: '',
  companyProfile: '',
  clientAddresses: [
    {
      id: '',
      type: '',
      addressType: '',
      clientId: '',
      addressId: '',
      address: {
        id: '',
        street: '',
        cityName: '',
        zipCode: '',
        formattedAddress: '',
        type: '',
        countryId: '',
        stateId: '',
        cityId: '',
      },
    },
  ],
};
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  gstNumber: Yup.string()
    .required('GST number is required')
    .matches(gstNumberRegExp, 'Invalid GST number'),
  status: Yup.string().required('Status is required'),
  isBranched: Yup.boolean().required('Branching status is required'),
  webSite: Yup.string().required('Website URL is required'),
  companySize: Yup.number().required('Company size is required'),
  dateOfOnBoarding: Yup.date().required('Date of onboarding is required'),
  typeOfService: Yup.string().required('Type of service is required'),
  isActive: Yup.boolean().required('Active status is required'),
  businessVerticalId: Yup.string().required('businessVertical is required'),
  companyProfile: Yup.string().required('Company profile is required'),
  clientAddresses: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required('ID is required'),
      type: Yup.string().required('Type is required'),
      addressType: Yup.string().required('Address Type is required'),
      clientId: Yup.string().required('Client ID is required'),
      addressId: Yup.string().required('Address ID is required'),
      address: Yup.object().shape({
        id: Yup.string().required('Address ID is required'),
        street: Yup.string().required('Street is required'),
        cityName: Yup.string().required('City name is required'),
        zipCode: Yup.string().required('Zip code is required'),
        formattedAddress: Yup.string().required(
          'Formatted address is required'
        ),
        type: Yup.string().required('Address type is required'),
        countryId: Yup.string().required('Country ID is required'),
        stateId: Yup.string().required('State ID is required'),
        cityId: Yup.string().required('City ID is required'),
      }),
    })
  ),
});

const RegistrationForm = () => {
  const theme = useTheme();
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
    <AuthFormLayout>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async values => {
          console.log(values, 'jiiii');
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
        }) => (
          <Stack>
            <FormHeaderComponents
              title={`Registration Form `}
              isButtonNotRequired={true}
            />

            <Form onSubmit={handleSubmit}>
              <LoginFormCard>
                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name="name"
                      textLabel="Name"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name="gstNumber"
                      textLabel="GST number"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <SelectWrapper
                      name="status"
                      textLabel="Status"
                      textLabelStyle={textLabel}
                      options={status}
                      placeholder="Select status"
                      inputProps={{ ...otherProps, select: 'true' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Checkbox
                      name="isBranched"
                      legend="Is Branched"
                      label="Is Branched"
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name="webSite"
                      textLabel="Website"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name="companySize"
                      textLabel="Company size"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <MuiDateTimePicker
                      formatValue={'date'}
                      textLabelStyle={textLabel}
                      name="dateOfOnBoarding"
                      textLabel="Date of on boarding"
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name="typeOfService"
                      textLabel="Type of service"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Checkbox
                      name="isActive"
                      legend="Is Active"
                      label="Is Active"
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name=" businessVerticalId"
                      textLabel="Business Vertical Id"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name=" companyProfile"
                      textLabel="Company profile"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name={`clientAddresses[0].address.${'addressType'}`}
                      textLabel="Company addresses"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextfieldWrapper
                      name={`clientAddresses[0].address.${'zipCode'}`}
                      textLabel="Pincode"
                      textLabelStyle={textLabel}
                      otherProps={otherProps}
                    />
                  </Grid>

                  {/* <Grid item xs={12} md={8} textAlign='center'>
                    <ShadowButtonSubmit
                      height='50px'
                      width='100%'
                      minwidth='250px'
                      maxwidth='350px'
                      backgroundcolor={theme.palette.primary.main}
                      type='submit'
                      onClick={handleSubmit}>
                      <ButtonText color='#fff'>Submit</ButtonText>
                    </ShadowButtonSubmit>
                  </Grid> */}
                </Grid>
              </LoginFormCard>
            </Form>
          </Stack>
        )}
      </Formik>
    </AuthFormLayout>
  );
};
export default RegistrationForm;
const status = [
  { id: 1, value: 1, name: 'Active' },
  { id: 2, value: 2, name: 'Inactive' },
];
