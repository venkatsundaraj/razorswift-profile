import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { MyFormContext } from '@/pageComponents/Admin/Clients/JDStepper';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { contactTypes } from '@/src/data/DropDownValues';
import {
  emailValidation,
  nameOtherValidationContact,
  nameValidation,
  staticDropDownValidation,
  validateContactNumber,
} from '@/src/utils/validationSchema';
import { Grid, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
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
  contactType: staticDropDownValidation('Contact Type', true, contactTypes),
  firstName: nameValidation('First Name', true),
  middleName: nameValidation('Middle Name', false),
  lastName: nameValidation('Last Name', true),
  contactNumber: validateContactNumber('Contact Number', true),
  email: emailValidation('Email', true),
  designation: nameOtherValidationContact('Designation', true),
  department: nameOtherValidationContact('Department', false),
});

const ClientContactForm = ({ onSubmit }) => {
  const {
    activeStep,
    setActiveStep,
    stepOneData,
    setStepOneData,
    stepTwoData,
    setStepTwoData,
    stepThreeData,
    setStepThreeData,
  } = useContext(MyFormContext);

  const theme = useTheme();

  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);

  const [count, setCount] = useState(1);

  useEffect(() => {
    if (stepTwoData) {
      console.log(stepTwoData, stepTwoData);
      const contactNumber = stepTwoData.contactNumber.substring(
        stepTwoData.contactNumber.length - 10
      );
      // Updated contactValue object with last ten digits
      const updatedContactValue = { ...stepTwoData, contactNumber };
      setInitialValues(updatedContactValue);
    } else if (stepOneData?.contacts?.length) {
      const contactValues = stepOneData.contacts[0];
      console.log(contactValues, 'ssssssssss');

      // Extracting the last ten digits
      const contactNumber = contactValues.contactNumber.substring(
        contactValues.contactNumber.length - 10
      );

      // Updated contactValue object with last ten digits
      const updatedContactValue = { ...contactValues, contactNumber };

      setInitialValues(updatedContactValue);
    }
  }, [stepOneData?.contacts, stepTwoData]);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      contactType: '',
      firstName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      designation: '',
      department: '',
      clientId: '',
    });
    setCount(count + 1);
  };

  const handleRemove = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    setCount(count - 1);
  };
  const handleSplice = (arrayHelpers, index) => {
    arrayHelpers.splice(index, 1);
    setCount(count - 1);
  };

  return (
    <AuthFormLayout>
      <LoginFormCard>
        <Formik
          enableReinitialize
          initialValues={{
            ...initialValues,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={onSubmit}
        >
          {({
            errors,
            initialTouched,
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
              <Grid item xs={12} spacing={4}>
                <Grid
                  container
                  spacing={3}
                  justifyContent="space-between"
                  alignItems={'flex-start'}
                >
                  <Grid item xs={12} md={6}>
                    <SelectWrapper
                      readOnly={values.id}
                      name="contactType"
                      textLabel="Contact Type"
                      textLabelStyle={textLabel}
                      options={contactTypes}
                      placeholder="Select contact type"
                      inputProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="firstName"
                      textLabelStyle={textLabel}
                      textLabel="First Name"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="middleName"
                      textLabelStyle={textLabel}
                      textLabel="Middle Name"
                      otherProps={otherPropsNotRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="lastName"
                      textLabelStyle={textLabel}
                      textLabel="Last Name"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="contactNumber"
                      textLabelStyle={textLabel}
                      textLabel="Contact Number"
                      otherProps={otherPropsRequired}
                      readOnly={values.id}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="email"
                      textLabelStyle={textLabel}
                      textLabel="Email"
                      otherProps={otherPropsRequired}
                      readOnly={values.id}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="designation"
                      textLabelStyle={textLabel}
                      textLabel="Designation"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="department"
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
                      
                      textLabelStyle={textLabel}
                      textLabel='Blood group'
                      otherProps={otherPropsNotRequired}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name='note'
                      
                      textLabelStyle={textLabel}
                      textLabel='Note'
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name='sourceType'
                      
                      textLabelStyle={textLabel}
                      textLabel='Source type'
                      otherProps={otherPropsRequired}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} md={6}></Grid> */}
                  <Grid item xs={12} md={6} textAlign="center">
                    <ShadowButtonSubmit
                      height="50px"
                      width="100%"
                      minwidth="250px"
                      maxwidth="350px"
                      backgroundcolor={theme.palette.primary.main}
                      type="button"
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      <ButtonText color="#fff">Back</ButtonText>
                    </ShadowButtonSubmit>
                  </Grid>
                  <Grid item xs={12} md={6} textAlign="center">
                    <ShadowButtonSubmit
                      height="50px"
                      width="100%"
                      minwidth="250px"
                      maxwidth="350px"
                      backgroundcolor={theme.palette.primary.main}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <ButtonText color="#fff">Submit</ButtonText>
                    </ShadowButtonSubmit>
                  </Grid>
                </Grid>
                {/* <FieldArray name='clientContacts'>
                    {arrayHelpers => (
                      <>
                        {values.clientContacts &&
                          values.clientContacts.map((clientContacts, index) => (
                            <Grid
                              container
                              spacing={3}
                              key={index}
                              justifyContent='space-between'
                              alignItems={'flex-start'}>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.contactType`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Contact type'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.contactType`);
                                  }}
                                />
                              </Grid>

                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.firstName`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='First name'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.firstName`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.middleName`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Middle name'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.middleName`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.lastName`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Last name'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.lastName`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.contactNumber`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Contact number'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.contactNumber`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.email`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Email'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.email`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.designation`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Designation'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.designation`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.department`}
                                  
                                  textLabelStyle={textLabel}
                                  textLabel='Department'
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(`clientContacts.${index}.department`);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={2} alignSelf='center'>
                                <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                                  {clientcontactsInfoEdit.clientContacts[index].id !== null &&
                                  clientcontactsInfoEdit.clientContacts[index].hasOwnProperty('candidateId') ? (
                                    <IconButton
                                      type='button'
                                      disableRipple
                                      size='large'
                                      aria-label='back'
                                      color='primary'
                                      onClick={() => deleteSkillPlatForm(values)}>
                                      <Delete />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      type='button'
                                      disableRipple
                                      size='large'
                                      aria-label='back'
                                      color='primary'
                                      onClick={() => handleSplice(clientcontactsInfoEdit.clientContacts, index)}>
                                      <Delete />
                                    </IconButton>
                                  )}

                                  {clientcontactsInfoEdit.clientContacts[index].id !== null &&
                                  clientcontactsInfoEdit.clientContacts[index].hasOwnProperty('candidateId') ? (
                                    <IconButton
                                      type='submit'
                                      disableRipple
                                      size='large'
                                      aria-label='back'
                                      color='primary'>
                                      <SaveIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      type='submit'
                                      disableRipple
                                      size='large'
                                      aria-label='back'
                                      color='primary'>
                                      <AddTaskIcon />
                                    </IconButton>
                                  )}
                                </Stack>
                              </Grid>
                            </Grid>
                          ))}
                      </>
                    )}
                  </FieldArray> */}
                {/* <Stack alignItems={'flex-end'}>
                    <Tooltip title='Add version' arrow placement='right'>
                      <IconButton
                        type='button'
                        disableRipple
                        size='large'
                        aria-label='back'
                        color='primary'
                        onClick={() => handleAdd(values.clientContacts)}
                        // disabled={count >= 5}
                      >
                        <AddCircleOutlineOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack> */}
              </Grid>
            </Form>
          )}
        </Formik>
      </LoginFormCard>
    </AuthFormLayout>
  );
};

export default ClientContactForm;
