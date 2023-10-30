import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import {
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';
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
  clientContacts: [
    {
      //id: '',
      contactType: '',
      firstName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      designation: '',
      department: '',
      clientId: '',
    },
  ],
};
const INITIAL_FORM = {
  clientContacts: [
    {
      id: '',
      contactType: '1',
      firstName: ' A',
      middleName: 'B',
      lastName: 'C',
      contactNumber: 8971166886,
      email: 'sup@gmail.com',
      designation: 'abc',
      department: 'cds',
      clientId: '',
    },
  ],
};
const FORM_VALIDATION = Yup.object().shape({
  clientContacts: [
    {
      contactType: '',
      firstName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      designation: '',
      department: '',
      clientId: '',
    },
  ],
});

const ClientContactForm = () => {
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
  const [screenStatus, setScreenStatus] = useState('1');
  const [count, setCount] = useState(1);
  const [clientcontactsInfoEdit, setClientcontactsInfoEdit] =
    useState(INITIAL_FORM_STATE);
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
  const handleEdit = () => {
    console.log(clientcontactsInfoEdit, 'kk');
    setClientcontactsInfoEdit({
      ...INITIAL_FORM,
    });
    setScreenStatus('2');
  };
  return (
    <AuthFormLayout>
      <Formik
        initialValues={{
          ...clientcontactsInfoEdit,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => {
          console.log(values, ' val');
          setScreenStatus('1');
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
          <Stack>
            <FormHeaderComponents
              title={`Client Contact Form `}
              isButtonNotRequired={true}
            />
            <Stack direction="row" justifyContent="space-between">
              <FormHeaderComponents
                title={`Edit Client Contact Form `}
                workingFunction={handleEdit}
              />
              <IconButton
                size="small"
                disableRipple
                onClick={() => {
                  resetForm();
                  console.log('reset');
                  setClientcontactsInfoEdit({
                    ...INITIAL_FORM_STATE,
                  });
                }}
              >
                <ClearIcon color="primary" />
              </IconButton>
            </Stack>
            <Form onSubmit={handleSubmit}>
              <LoginFormCard>
                <Grid item xs={12}>
                  <FieldArray name="clientContacts">
                    {arrayHelpers => (
                      <>
                        {values.clientContacts &&
                          values.clientContacts.map((clientContacts, index) => (
                            <Grid
                              container
                              spacing={3}
                              key={index}
                              justifyContent="space-between"
                              alignItems={'flex-start'}
                            >
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.contactType`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Contact type"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.contactType`
                                    );
                                  }}
                                />
                              </Grid>

                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.firstName`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="First name"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.firstName`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.middleName`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Middle name"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.middleName`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.lastName`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Last name"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.lastName`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.contactNumber`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Contact number"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.contactNumber`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.email`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Email"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.email`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.designation`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Designation"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.designation`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextfieldWrapper
                                  name={`clientContacts.${index}.department`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Department"
                                  otherProps={{ ...otherProps }}
                                  onChange={e => {
                                    setFieldValue(
                                      `clientContacts.${index}.department`
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid item xs={2} alignSelf="center">
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  {clientcontactsInfoEdit.clientContacts[index]
                                    .id !== null &&
                                  clientcontactsInfoEdit.clientContacts[
                                    index
                                  ].hasOwnProperty('candidateId') ? (
                                    <IconButton
                                      type="button"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                      onClick={() =>
                                        deleteSkillPlatForm(values)
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      type="button"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                      onClick={() =>
                                        handleSplice(
                                          clientcontactsInfoEdit.clientContacts,
                                          index
                                        )
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                  )}

                                  {clientcontactsInfoEdit.clientContacts[index]
                                    .id !== null &&
                                  clientcontactsInfoEdit.clientContacts[
                                    index
                                  ].hasOwnProperty('candidateId') ? (
                                    <IconButton
                                      type="submit"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                    >
                                      <SaveIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      type="submit"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                    >
                                      <AddTaskIcon />
                                    </IconButton>
                                  )}
                                </Stack>
                              </Grid>
                            </Grid>
                          ))}
                      </>
                    )}
                  </FieldArray>
                  <Stack alignItems={'flex-end'}>
                    <Tooltip title="Add version" arrow placement="right">
                      <IconButton
                        type="button"
                        disableRipple
                        size="large"
                        aria-label="back"
                        color="primary"
                        onClick={() => handleAdd(values.clientContacts)}
                        // disabled={count >= 5}
                      >
                        <AddCircleOutlineOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              </LoginFormCard>
            </Form>
          </Stack>
        )}
      </Formik>
    </AuthFormLayout>
  );
};
export default ClientContactForm;
