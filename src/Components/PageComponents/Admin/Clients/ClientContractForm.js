import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { MyFormContext } from '@/pageComponents/Admin/Clients/JDStepper';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import PreviewFile from '@/reUsableComponents/PreviewFile';
import PreviewType2 from '@/reUsableComponents/PreviewFile/PreviewType2';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import {
  getAllowedExt,
  isValidFileType,
} from '@/utils/CommonFunctions/ImageDocVliadtion';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhotoIcon from '@mui/icons-material/Photo';
import {
  FormHelperText,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Form, Formik, useField, useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  startDate: null,
  endDate: null,
  dateOfInvoice: null,
  uploadedFile: '',
  id: '',
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const FORM_VALIDATION = Yup.object().shape({
  startDate: Yup.date()
    .nullable()
    .test('is-today-or-after-createdDate', function (value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, milliseconds

      const createdDate = this.resolve(Yup.ref('createdDate'));
      if (createdDate) {
        const createdDateObj = new Date(createdDate);
        createdDateObj.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, milliseconds

        if (value && value >= createdDateObj) {
          return true; // Date is after or equal to createdDate
        } else {
          const createdDateFormatted =
            createdDateObj.toLocaleDateString('en-GB');
          return this.createError({
            message: `Start Date must be after or equal to ${createdDateFormatted}`,
          });
        }
      }

      if (value && value >= today) {
        return true; // Date is today or in the future
      } else {
        return this.createError({
          message: "Start Date must be today's date or after the created date",
        });
      }
    })
    .required('Start Date is required'),

  endDate: Yup.date()
    .nullable()
    .when('startDate', (startDate, schema) => {
      if (startDate && !isNaN(new Date(startDate).getTime())) {
        // Check if startDate is a valid date
        return schema.min(startDate, 'End Date must be after the Start Date');
      }
      return schema; // If startDate is not valid, return the schema without modification
    })
    .test(
      'is-greater',
      'End Date must be greater than Start Date',
      function (value) {
        const startDate = this.resolve(Yup.ref('startDate'));
        return !startDate || !value || value > startDate; // Allow if either date is empty or endDate is after startDate
      }
    )
    .required('End Date is required'),

  // status: nameValidation('Status', true),
  dateOfInvoice: Yup.date().nullable().required('Date of Invoice is required'),
  uploadedFile: Yup.mixed()
    // .required('Please upload Contract Document')
    .test('is-valid-type', 'Please upload a file in PDF format', value => {
      if (!value) return true; // If value doesn't exist, return true

      return isValidFileType(value.name, 'file');
    })
    .test('is-valid-size', 'Max allowed size is 2MB', value => {
      if (!value) return true; // If value doesn't exist, return true

      return value.size <= 2097152;
    }),
});

const ClientContractForm = ({ onSubmit }) => {
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

  const [count, setCount] = useState(1);
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (
      stepOneData?.clientContracts &&
      stepOneData?.clientContracts.length > 0
    ) {
      const firstClientContract = stepOneData?.clientContracts[0];
      console.log(firstClientContract, 'firstClientContract');

      let formValues = {
        startDate: firstClientContract?.startDate,
        endDate: firstClientContract?.endDate,
        // status: firstClientContract?.status,
        dateOfInvoice: firstClientContract?.dateOfInvoice,
        uploadedFile: firstClientContract?.contractDocument,
        ...firstClientContract,
      };
      console.log(formValues);
      setInitialValues(prevValues => ({
        ...prevValues,
        ...formValues,
      }));
    }
  }, [stepOneData?.clientContracts]);

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
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  justifyContent="space-between"
                  alignItems={'flex-start'}
                >
                  <Grid item xs={12} md={6}>
                    <MuiDateTimePicker
                      formatValue={'date'}
                      textLabelStyle={textLabel}
                      name="startDate"
                      textLabel="Start Date"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiDateTimePicker
                      formatValue={'date'}
                      textLabelStyle={textLabel}
                      name="endDate"
                      textLabel="End Date"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiDateTimePicker
                      formatValue={'date'}
                      textLabelStyle={textLabel}
                      name="dateOfInvoice"
                      textLabel="Date of Invoice"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RenderUploadButton
                      textLabel="Upload Contract Document"
                      inputName="uploadedFile"
                      fileType="file"
                      title="Upload Contract Document "
                      otherProps={otherPropsNotRequired}
                    />
                  </Grid>

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
              </Grid>
            </Form>
          )}
        </Formik>
      </LoginFormCard>
    </AuthFormLayout>
  );
};
export default ClientContractForm;

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
  console.log(values[inputName], 'names');

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
              {values[inputName].name ? (
                <PreviewType2
                  className={{ margin: 'auto' }}
                  width={'40%'}
                  maxWidth={'200px'}
                  height={'auto'}
                  file={values[inputName]}
                />
              ) : (
                <PreviewFile
                  className={{ margin: 'auto' }}
                  width={'40%'}
                  maxWidth={'200px'}
                  height={'auto'}
                  file={values[inputName]}
                />
              )}

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
        <FormHelperText
          error
          id="standard-weight-helper-text-selectValuesId"
          style={{ marginLeft: '14px' }}
        >
          {mata.error}
        </FormHelperText>
      )}
    </>
  );
};
