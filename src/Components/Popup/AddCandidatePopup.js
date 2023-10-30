import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import PreviewFile from '@/reUsableComponents/PreviewFile';
import { setAlertPopup } from '@/store/alertSlice';
import { AccountApi, CandidateApi } from '@/swagger_api/*';
import {
  getAllowedExt,
  isValidFileType,
} from '@/utils/CommonFunctions/ImageDocVliadtion';
import {
  alphabetsValidationSchema,
  emailValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhotoIcon from '@mui/icons-material/Photo';
import {
  Box,
  FormHelperText,
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Form, Formik, useField, useFormikContext } from 'formik';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

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
  fullName: '',
  email: '',
  contactNumber: '',
  isOTPValidated: true,
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: alphabetsValidationSchema('Full Name', true),
  email: emailValidation('Email', true),
  contactNumber: validateContactNumber('Contact Number', true),
});

const AddCandidatePopup = ({
  isDialogOpened,
  handleCloseDialog,
  candidatesGet,
}) => {
  const [candidateId, setCandidateId] = useState(null);
  const [readonlyMode, setReadonlyMode] = useState(false);
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadingContext);
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
  const RegistrationSubmitDetails = async values => {
    setLoading(true);
    console.log(values, 'values');
    var accountApi = new AccountApi();
    const opts = {
      body: {
        fullName: values.fullName,
        email: values.email,
        contactNumber: `${values.contactNumber}`,
        isOTPValidated: true,
      },
    };
    await accountApi
      .apiAccountRegisterCandidatePost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'Authentication Successful.') {
          dispatch(
            setAlertPopup({
              message: 'Registered Successfully.',
              type: 'success',
              duration: 3000,
            })
          );
          setCandidateId(response?.body?.result?.candidateId);
          setReadonlyMode(true);

          console.log(response?.body?.result?.candidateId, 'candidateId');
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };

  const ResumeUpload = async (values, { resetForm }) => {
    setLoading(true);
    var candidateApi = new CandidateApi();
    const opts = {
      resumeFile: values['resumeFile'] === '' ? null : values['resumeFile'],
    };
    console.log(opts['resumeFile']);
    await candidateApi
      .apiCandidateUpdateBasicDocumentDetailsCandidateIdPost(candidateId, opts)
      .then(async response => {
        setLoading(false);
        console.log('Response', response);
        if (
          response.body.message === 'Updated Successfully.' ||
          response.body.message === 'Created Successfully.'
        ) {
          dispatch(
            setAlertPopup({
              message: 'Updated Successfully.',
              type: 'success',
              duration: 3000,
            })
          );
          closePopup();
          resetForm();
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
          resetForm();
        }
      })
      .catch(function (error) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };
  const closePopup = () => {
    handleCloseDialog();
    setCandidateId(null);
    setReadonlyMode(false);
  };

  return (
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          closePopup();
        }
      }}
      aria-labelledby="leave-popup"
      open={isDialogOpened}
      fullWidth
      maxWidth="sm"
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
          closePopup();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          Add Candidate
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
        <Box marginBottom={3}>
          <Formik
            enableReinitialize
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values, { resetForm }) =>
              RegistrationSubmitDetails(values, { resetForm })
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
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <Grid item xs={12} md={4}>
                    <TextfieldWrapper
                      name="fullName"
                      textLabelStyle={textLabel}
                      textLabel="Full Name"
                      readOnly={readonlyMode}
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextfieldWrapper
                      name="email"
                      textLabelStyle={textLabel}
                      textLabel="Email"
                      readOnly={readonlyMode}
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextfieldWrapper
                      name="contactNumber"
                      textLabelStyle={textLabel}
                      textLabel="Contact Number"
                      otherProps={otherPropsRequired}
                      readOnly={readonlyMode}
                    />
                  </Grid>
                  {candidateId ? null : (
                    <Grid item container justifyContent="center">
                      <Grid item>
                        <ShadowButtonSubmit
                          height="40px"
                          width="100%"
                          minwidth="250px"
                          maxwidth="450px"
                          backgroundcolor={theme.palette.primary.main}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          <ButtonText color="#fff">Submit</ButtonText>
                        </ShadowButtonSubmit>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Box marginTop={3}>
          {candidateId && (
            <Formik
              enableReinitialize
              initialValues={{
                resumeFile: null,
              }}
              validationSchema={Yup.object({
                resumeFile: Yup.mixed()
                  .required('Please upload your resume')
                  .test(
                    'is-valid-type',
                    'Please upload a file in PDF format',
                    value =>
                      isValidFileType(value && value.name.toLowerCase(), 'file')
                  )
                  .test(
                    'is-valid-size',
                    'Max allowed size is 2MB',
                    value => value && value.size <= 2097152
                  ),
              })}
              onSubmit={(values, { resetForm }) =>
                ResumeUpload(values, { resetForm })
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
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={6}>
                      <RenderUploadButton
                        textLabel="Upload your CV or resume"
                        inputName="resumeFile"
                        fileType="file"
                        title="Upload resume"
                        otherProps={otherPropsNotRequired}
                      />
                    </Grid>
                    <Grid item container justifyContent="center">
                      <Grid item>
                        <ShadowButtonSubmit
                          height="40px"
                          width="100%"
                          minwidth="250px"
                          maxwidth="450px"
                          backgroundcolor={theme.palette.primary.main}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          <ButtonText color="#fff">Upload</ButtonText>
                        </ShadowButtonSubmit>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default AddCandidatePopup;
const RenderUploadButton = ({
  errors,
  inputName,
  fileType,
  textLabel,
  title,
  otherProps,
}) => {
  let allowedExts = getAllowedExt(fileType);

  const { values, setFieldValue } = useFormikContext();
  const [field, mata] = useField(inputName);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontFamily: 'Urbanist',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '19.8px',
            color: mata && mata?.touched && mata?.error ? '#f44336' : '#434343',
          }}
        >
          {textLabel} {otherProps?.required ? '*' : ''}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: 45,
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23DDDDDDFF' stroke-width='3' stroke-dasharray='none' stroke-dashoffset='0' stroke-linecap='square' rx='8' ry='8'/%3e%3c/svg%3e\")",
          }}
        >
          {values[inputName] ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%', paddingX: 2 }}
            >
              <PreviewFile
                className={{ margin: 'auto' }}
                width={'40%'}
                maxWidth={'200px'}
                height={'auto'}
                file={values[inputName]}
              />
              <IconButton
                disableRipple
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  id={inputName}
                  name={inputName}
                  type="file"
                  accept={allowedExts}
                  onChange={event => {
                    setFieldValue(inputName, event.currentTarget.files[0]);
                  }}
                />
                <Typography>Re-upload</Typography>
              </IconButton>
            </Stack>
          ) : (
            <IconButton
              disableRipple
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                id={inputName}
                name={inputName}
                type="file"
                accept={allowedExts}
                onChange={event => {
                  setFieldValue(inputName, event.currentTarget.files[0]);
                }}
              />
              {fileType === 'image' ? <PhotoIcon /> : <InsertDriveFileIcon />}
              <Typography>{title}</Typography>
            </IconButton>
          )}
        </Stack>
      </Stack>

      {mata.touched && mata.error && (
        <FormHelperText error id="standard-weight-helper-text-selectValuesId">
          {mata.error}
        </FormHelperText>
      )}
    </>
  );
};
