import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import MainCard from '@/cardComponents/MainCard';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { contactTypes } from '@/src/data/DropDownValues';
import { setAlertPopup } from '@/store/alertSlice';
import { ContactApi } from '@/swagger_api/api/CityApi';
import {
  extractLastTenDigits,
  formatContactNumber,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  emailValidation,
  nameOtherValidationContact,
  nameValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import { Box, Grid, Stack, Typography, styled, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  contactType: '',
  firstName: '',
  middleName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  designation: '',
  department: '',
  // note: '',
  sourceId: '',
  // sourceType: '',
  clientId: '',
};

const FORM_VALIDATION = Yup.object().shape({
  contactType: Yup.string()
    .required('Contact Type is required')
    .oneOf(
      contactTypes.map(item => String(item.value)),
      'Please select the Contact Type from the drop down'
    ),
  firstName: nameValidation('First Name', true),
  middleName: nameValidation('Middle Name', false),
  lastName: nameValidation('Last Name', true),
  contactNumber: validateContactNumber('Contact Number', true),
  email: emailValidation('Email', true),
  designation: nameOtherValidationContact('Designation', true),
  department: nameOtherValidationContact('Department', false),
  // note: Yup.string().min(1).max(100, 'Note cannot be more than 100 characters').required('Note is required'),
  // sourceType: Yup.string()
  //   .min(1)
  //   .max(100, 'Source type cannot be more than 100 characters')
  //   .matches(commonRegExp, 'Source type cannot contain numbers or special characters')
  //   .required('Source type is required'),
});
const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '16px',
  lineHeight: lineHeight || '19px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#434343',
  fontWeight: weight || '500',
  fontSize: '13px',
  lineHeight: lineHeight || '18px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '11px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Profile = () => {
  const [readOnly, setReadOnly] = useState(true);
  const theme = useTheme();
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);
  const dispatch = useDispatch();
  const clientDetails = useMemo(
    () => localStorageUtil.getItem('clientDetails'),
    []
  );
  const id = clientDetails?.contact?.id;
  const contactApi = useMemo(() => new ContactApi(), []);

  const GetContact = useCallback(async () => {
    try {
      const response = await contactApi.apiContactIdGet(id);
      if (response.body.result) {
        console.log('response', response.body.result);
        setInitialValues(response.body.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [contactApi, id]);

  useEffect(() => {
    GetContact();
  }, [GetContact]);

  const handleApiResponse = (response, successMessage) => {
    if (response.body.result) {
      // Display success message if response is successful
      dispatch(
        setAlertPopup({
          message: successMessage,
          type: 'success',
          duration: 3000,
        })
      );
      GetContact();
      setReadOnly(true);
    } else {
      // Display error message if response is not successful
      dispatch(
        setAlertPopup({
          message: response.body.message,
          type: 'error',
          duration: 3000,
        })
      );
    }
    console.log(response);
  };

  const editClientsContact = async submittedValues => {
    const opts = {
      body: {
        ...reverseCheckAndSet(submittedValues),
      },
    };
    try {
      // Call API endpoint for editing client contact
      const response = await contactApi.apiContactPut(opts);

      // Handle API response using common logic
      handleApiResponse(response, 'Client contact updated successfully');
    } catch (error) {
      console.error('Error while updating client contact:', error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  return (
    <ClientLayout>
      <MainCard title="Profile">
        <Stack spacing={2}>
          {readOnly && (
            <Box alignSelf={'flex-end'}>
              <ShadowButtonSubmit
                height="50px"
                width="100px"
                minwidth="100px"
                maxwidth="250px"
                backgroundcolor={theme.palette.primary.main}
                type="button"
                disableRipple // Disable ripple effect on button click
                // Disable button interaction
                onClick={() => setReadOnly(false)}
              >
                <ButtonText color="#fff">Edit</ButtonText>
              </ShadowButtonSubmit>
            </Box>
          )}
          {readOnly && (
            <MainCard style={{ height: '380px' }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1.5}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="First Name"
                      name={initialValues?.firstName || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Middle Name"
                      name={initialValues?.middleName || '-'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Last Name"
                      name={initialValues?.lastName || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Contact Number"
                      name={
                        formatContactNumber(initialValues?.contactNumber) || '-'
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values title="Email" name={initialValues?.email || '-'} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Designation"
                      name={initialValues?.designation || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Department"
                      name={initialValues?.department || '-'}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6} md={4}>
                    <Values title='Source type' name={initialValues?.sourceType || '-'} />
                  </Grid> */}
                </Grid>
              </Stack>
            </MainCard>
          )}

          {!readOnly && (
            <Formik
              enableReinitialize
              initialValues={{
                ...extractLastTenDigits(initialValues),
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                editClientsContact(reverseCheckAndSet(values));
                console.log('put', reverseCheckAndSet(values));
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
                    <Grid
                      container
                      spacing={3}
                      justifyContent="space-between"
                      alignItems={'flex-start'}
                    >
                      <Grid item xs={12} md={6}>
                        <SelectWrapper
                          name="contactType"
                          textLabel="Contact Type"
                          readOnly={true}
                          textLabelStyle={textLabel}
                          options={contactTypes}
                          placeholder="Select Contact Type"
                          inputProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="firstName"
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel="First Name"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="middleName"
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel="Middle Name"
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="lastName"
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel="Last Name"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="contactNumber"
                          readOnly={true}
                          textLabelStyle={textLabel}
                          textLabel="Contact Number"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="email"
                          readOnly={true}
                          textLabelStyle={textLabel}
                          textLabel="Email"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="designation"
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel="Designation"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="department"
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel="Department"
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                    <DateTimePicker
                      formatValue={'date'}
                      textLabelStyle={textLabel}
                      name='dateOfBirth'
                      textLabel='Date of birth'
                      inputProps={otherPropsNotRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectWrapper
                      textLabelStyle={textLabel}
                      name='gender'
                      textLabel='Gender'
                      options={gender}
                      placeholder='Select gender'
                      inputProps={otherPropsNotRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name='bloodGroup'
                      readOnly={false}
                      textLabelStyle={textLabel}
                      textLabel='Blood group'
                      otherProps={otherPropsNotRequired}
                    />
                  </Grid> */}
                      {/* <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name='note'
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel='Note'
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name='sourceType'
                          readOnly={false}
                          textLabelStyle={textLabel}
                          textLabel='Source type'
                          otherProps={otherPropsRequired}
                        />
                      </Grid> */}
                    </Grid>

                    <Stack
                      direction={'row'}
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      <SubmissionButton
                        onClick={() => {
                          resetForm();
                          setReadOnly(true);
                        }}
                      >
                        Cancel
                      </SubmissionButton>
                      <SubmissionButton
                        onClick={() => {
                          handleSubmit();
                          console.log('clickrt');
                        }}
                      >
                        Update
                      </SubmissionButton>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </Stack>
      </MainCard>
    </ClientLayout>
  );
};

export default Profile;
const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
