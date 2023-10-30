import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';

import { ButtonText } from '@/reUsableComponents/FormComponets';
import { contactTypes } from '@/src/data/DropDownValues';
import { setAlertPopup } from '@/store/alertSlice';
import { ContactApi } from '@/swagger_api/*';
import { reverseCheckAndSet } from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  emailValidation,
  nameOtherValidationContact,
  nameValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import { Grid, Typography, useTheme } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

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
});

const ClientContactPopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  ClientContactGet,
  editContactInfo,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const clientDetails = useMemo(
    () => localStorageUtil.getItem('clientDetails'),
    []
  );
  const contactApi = useMemo(() => new ContactApi(), []);

  const SubmitDetails = async values => {
    // Extract clientId and contact from clientDetails
    const { clientId } = clientDetails?.contact || {};

    // Create SubmittedValues object with extracted values
    const SubmittedValues = {
      ...values,
      clientId: clientId || '',
      sourceId: clientId || '',
    };

    if (popUpInfo?.id) {
      // Call editClientsContact for existing client contact
      await editClientsContact(SubmittedValues);
    } else {
      // Call addClientsContact for new client contact
      await addClientsContact(SubmittedValues);
    }
  };

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
      ClientContactGet();
      handleCloseDialog();
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

  const addClientsContact = async submittedValues => {
    const opts = {
      body: {
        ...reverseCheckAndSet(submittedValues),
      },
    };
    try {
      // Call API endpoint for adding client contact
      const response = await contactApi.apiContactPost(opts);
      // Handle API response using common logic
      handleApiResponse(response, 'Client contact created successfully');
    } catch (error) {
      console.error('Error while creating client contact:', error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    }
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
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleCloseDialog();
        }
      }}
      aria-labelledby="leave-popup"
      open={isDialogOpened}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
    >
      <BootstrapDialogTitle
        id="leave-popup"
        sx={{ p: '13px 17px', color: 'black' }}
        onClose={() => {
          handleCloseDialog();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          {popUpInfo?.id ? 'Edit' : 'Add'} Contact
        </Typography>
      </BootstrapDialogTitle>

      <DialogContent
        sx={{
          width: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 5,
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            ...INITIAL_FORM_STATE,
            ...editContactInfo,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) =>
            SubmitDetails(values, { resetForm })
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
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={3}
                justifyContent="space-between"
                alignItems={'flex-start'}
              >
                <Grid item xs={12} md={6}>
                  <SelectWrapper
                    readOnly={popUpInfo?.id}
                    name="contactType"
                    textLabel="Contact type"
                    textLabelStyle={textLabel}
                    options={contactTypes}
                    placeholder="Select contact type"
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
                    readOnly={Boolean(editContactInfo?.id)}
                    textLabelStyle={textLabel}
                    textLabel="Contact Number"
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="email"
                    readOnly={Boolean(editContactInfo?.id)}
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
                {/* <Grid item xs={12} md={6}></Grid> */}

                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ShadowButtonSubmit
                    height="40px"
                    width="100%"
                    minwidth="250px"
                    maxwidth="250px"
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
                                  readOnly={false}
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
                                  readOnly={false}
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
                                  readOnly={false}
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
                                  readOnly={false}
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
                                  readOnly={false}
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
                                  readOnly={false}
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
                                  readOnly={false}
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
                                  readOnly={false}
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
            </Form>
          )}
        </Formik>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default ClientContactPopup;
