import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import PreviewFile from '@/reUsableComponents/PreviewFile';
import { CandidateApi } from '@/swagger_api/*';
import { EducationInstituteApi } from '@/swagger_api/api/EducationInstituteApi';
import { debounce, trimObjectValues } from '@/utils/CommonFunctions/Functions';
import {
  getAllowedExt,
  isValidFileType,
} from '@/utils/CommonFunctions/ImageDocVliadtion';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { addifnotexistdropdownValidationSchema } from '@/utils/validationSchema';
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
import IconButton from '@mui/material/IconButton';
import MuiToggleButton from '@mui/material/ToggleButton';
import { Form, Formik, useField, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

const otherProps = { size: 'large', required: true };
const FullScreenImage = styled('img')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: '#fff',
});

export const toggleButtonArrayValues = [
  { id: 1, value: true, title: 'Yes' },
  { id: 2, value: false, title: 'No' },
];

const projectSkillValue = [
  { id: 1, skillName: 'javascript', value: 1 },
  { id: 2, skillName: 'react', value: 2 },
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

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  // margin: 5,
  fontWeight: '500',
  '&.MuiToggleButton-root , &.MuiToggleButton-root:hover': {
    color: '#000000',
    border: '2px solid #DDDDDD',
    borderRadius: 9,
    borderLeftRadius: 9,
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    fontWeight: '500',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main} !important`,
    background: 'rgba(117, 22, 152, 0.2)',
  },
}));

// const FORM_VALIDATION = Yup.object().shape({
//   isStudent: Yup.boolean().required('Student Info is required'),
//   primaryEducation: Yup.mixed().when('isStudent', {
//     is: true,
//     then: Yup.mixed().required('Please select  college name'),
//     otherwise: Yup.mixed(),
//   }),
//   collegeId: Yup.mixed().when('isStudent', {
//     is: true,
//     then: Yup.mixed()
//       .required('Please upload college id is required')
//       .test('is-valid-type', 'Please upload a file in jpeg, jpg, or png format', value =>
//         isValidFileType(value && value.name.toLowerCase(), 'image')
//       )
//       .test('is-valid-size', 'Max allowed size is 2Mb', value => value && value.size <= 2097152),
//     otherwise: Yup.mixed(),
//   }),

//   resumeFile: Yup.lazy(value => {
//     if (value !== undefined && value !== null && value !== '') {
//       return Yup.mixed()
//         .required('Please upload your resume')
//         .test('is-valid-type', 'Please upload a file in doc, docx, or pdf format', value =>
//           isValidFileType(value && value.name.toLowerCase(), 'file')
//         )
//         .test('is-valid-size', 'Max allowed size is 2Mb', value => value && value.size <= 2097152);
//     }
//     return Yup.mixed();
//   }),
// });
const INITIAL_FORM_STATE = {
  isStudent: true,
  collegeName: '',
  collegeId: null,
  primaryEducation: null,
  resumeFile: '',
};

const FORM_VALIDATION = Yup.object().shape({
  isStudent: Yup.boolean().required('Student Info is required'),
  primaryEducation: Yup.mixed().when('isStudent', {
    is: true,
    then: addifnotexistdropdownValidationSchema('College', 1, 100, true),
    otherwise: Yup.mixed(),
  }),
  collegeId: Yup.mixed().when('isStudent', {
    is: true,
    then: Yup.mixed()
      .required('Please upload your College Id')
      .test(
        'is-valid-type',
        'Please upload a file in jpeg, jpg or png format',
        value => isValidFileType(value && value.name.toLowerCase(), 'image')
      )
      .test(
        'is-valid-size',
        'Max allowed size is 2MB',
        value => value && value.size <= 2097152
      ),
    otherwise: Yup.mixed(),
  }),

  resumeFile: Yup.lazy(value => {
    if (value !== undefined && value !== null && value !== '') {
      return (
        Yup.mixed()
          // .required('Please upload your CV or Resume')
          .test('is-valid-type', 'Please upload a file in pdf format', value =>
            isValidFileType(value && value.name.toLowerCase(), 'file')
          )
          .test(
            'is-valid-size',
            'Max allowed size is 2MB',
            value => value && value.size <= 2097152
          )
      );
    }
    return Yup.mixed().required('Please upload your CV or Resume');
  }),
});

const SetProfileForm = () => {
  const router = useRouter();

  const theme = useTheme();
  const [instituteName, setInstituteName] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [loadingGif, setLoadingGif] = useState(false);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [university, setUniversity] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const imageUrl =
    'https://rsimage.s3.ap-south-1.amazonaws.com/gif_images/_resume_extraction_3.gif';

  useEffect(() => {
    const handleRouteChange = () => {
      window.location.reload();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    handleInputChangeUniversityName('');
  }, []);

  const handleInputChangeUniversityName = debounce(async (event, newValue) => {
    const k = new EducationInstituteApi();
    let opts = {
      name: newValue,
    };

    await k
      .apiEducationInstituteGetAllByNameGet(opts)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          }));

          setInstituteName(trim);
        } else if (response.body.message === 'No Records Found.') {
          setInstituteName([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 300);

  const SubmitDetails = async values => {
    console.log('hi', values);
    // setLoadingGif(true);

    var candidateApi = new CandidateApi();
    var opts = {};
    var k = {};

    if (values?.primaryEducation) {
      if ('inputValue' in values?.primaryEducation) {
        // Set k to the value of the 'inputvalue' key
        k = {
          primaryEducationInstituteName: values.primaryEducation.inputValue,
        };
      } else {
        // Set k to the value of the 'year' key in institution1
        k = {
          primaryEducationInstituteId: values.primaryEducation.year,
          primaryEducationInstituteName: values.primaryEducation.title,
        };
      }
    }

    if (values.isStudent) {
      opts = {
        isStudent: values['isStudent'],
        resumeFile: values['resumeFile'] === '' ? null : values['resumeFile'],
        collegeId: values['collegeId'],
        ...k,
      };
    } else {
      opts = {
        isStudent: values['isStudent'],
        resumeFile: values['resumeFile'] === '' ? null : values['resumeFile'],
      };
    }

    console.log(opts['resumeFile']);
    await candidateApi
      .apiCandidateUpdateBasicDocumentDetailsCandidateIdPost(
        userDetails?.candidateId,
        opts
      )
      .then(async response => {
        console.log(
          'apiCandidateUpdateBasicDocumentDetailsCandidateIdPost',
          response
        );

        if (
          response.body.message === 'Updated Successfully.' ||
          response.body.message === 'Created Successfully.'
        ) {
          if (opts['resumeFile'] !== null) {
            CandidateIdInfoGetSetTimeout();
          } else {
            router.push('/candidateinfo');
          }
        }
      })
      .catch(function (error) {
        setLoadingGif(false);

        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  const CandidateIdInfoGet = async async => {
    setLoadingGif(true);
    console.log(userDetails?.candidateId);
    var candidateApi = new CandidateApi();
    await candidateApi
      .apiCandidateIdGet(userDetails?.candidateId)
      .then(async response => {
        setLoadingGif(false);
        if (response.body.message === 'Record Fetched Successfully.') {
          console.log(response);
          if (
            response.body.result.normalizationStatus === 1 ||
            response.body.result.normalizationStatus === 2
          ) {
            console.log('end');

            router.push('/candidateinfo');
          } else {
          }
        }
      })
      .catch(function (error) {
        setLoadingGif(false);
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  const CandidateIdInfoGetSetTimeout = async () => {
    console.log('CandidateIdInfoGetSetTimeout');

    setLoadingGif(true);
    console.log(userDetails?.candidateId);
    var candidateApi = new CandidateApi();
    console.log('start');
    const startTime = Date.now(); // get the start time in milliseconds
    const interval = setInterval(async () => {
      await candidateApi
        .apiCandidateIdGet(userDetails?.candidateId)
        .then(response => {
          console.log(
            'response.body.result.normalizationStatus',
            response.body.result.normalizationStatus
          );
          const elapsedTime = Date.now() - startTime; // calculate elapsed time
          console.log('elapsed time', elapsedTime);
          if (
            elapsedTime >= 120000 ||
            response.body.result.normalizationStatus === 1 ||
            response.body.result.normalizationStatus === 2
          ) {
            console.log('end');
            clearInterval(interval);

            setLoadingGif(false);
            router.push('/candidateinfo');
          }
          console.log('else condition called');
        })
        .catch(error => {
          setLoadingGif(false);

          console.error(error);
        });
    }, 15 * 1000);
  };

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      {loadingGif ? (
        <Box sx={{ backgroundColor: '#fff', height: '100px', width: '100px' }}>
          <FullScreenImage src={imageUrl} alt="GIF" />
        </Box>
      ) : (
        <AuthFormLayout>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
              console.log('sdd', values);
              const k = trimObjectValues(values);
              console.log(k);
              SubmitDetails(trimObjectValues(values));
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
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2, md: 4 }}
                  justifyContent="space-between"
                >
                  <Grid item xs={12} md={7}>
                    <ToggleButtonForm
                      name="isStudent"
                      textLabel="Are you a Student?"
                    />
                  </Grid>
                  {values.isStudent && (
                    <Grid item xs={12} md={7}>
                      <HandleInputChangeAutocomplete
                        otherProps={otherPropsRequired}
                        options={instituteName}
                        handleInputChange={handleInputChangeUniversityName}
                        textLabelStyle={{}}
                        name="primaryEducation"
                        label="College"
                        placeHolder="Select your College"
                        value={values.primaryEducation}
                        onChange={(e, value) => {
                          setFieldValue('primaryEducation', value);
                        }}
                      />
                    </Grid>
                  )}

                  {values.isStudent && (
                    <Grid item xs={12} md={7}>
                      <RenderUploadButton
                        otherProps={otherPropsRequired}
                        textLabel="Upload your College Id"
                        inputName="collegeId"
                        fileType="image"
                        title="Upload photo"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} md={7}>
                    <RenderUploadButton
                      otherProps={otherPropsRequired}
                      textLabel="Upload your CV or Resume"
                      inputName="resumeFile"
                      fileType="file"
                      title="Upload document"
                    />
                  </Grid>

                  <Grid item xs={12} md={7}>
                    <ShadowButtonSubmit
                      height="50px"
                      width="100%"
                      minwidth="250px"
                      maxwidth="250px"
                      backgroundcolor={theme.palette.primary.main}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <ButtonText color="#fff">Continue</ButtonText>
                    </ShadowButtonSubmit>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </AuthFormLayout>
      )}
    </Box>
  );
};

export default SetProfileForm;

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
      <Stack direction="column" spacing={2}>
        <Typography
          sx={{
            margin: 0.2,
            fontFamily: 'Urbanist',
            fontWeight: '600',
            fontSize: '16px',
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
            height: 50,
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23DDDDDDFF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
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

const ToggleButtonForm = ({
  name,
  options,
  textLabel,
  noTextLabel,
  backgroundColor,
  ...otherProps
}) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);

  const handleChange = (event, newAlignment) => {
    if (newAlignment.value !== null && newAlignment.value !== values[name]) {
      setFieldValue(name, newAlignment.value);
    }
  };

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontFamily: 'Urbanist',
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            color: mata && mata?.touched && mata?.error ? '#f44336' : '#434343',
          }}
        >
          {textLabel} {otherProps?.required ? '*' : ''}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ maxWidth: '250px' }}>
          {toggleButtonArrayValues.map((valueArray, index) => (
            <ToggleButton
              fullWidth
              key={valueArray.id}
              selected={valueArray.value === values[name]}
              value={values[name]}
              onClick={(e, value) => handleChange(e, valueArray)}
            >
              {valueArray.title}
            </ToggleButton>
          ))}
        </Stack>
        {mata.touched && mata.error && (
          <FormHelperText error id="standard-weight-helper-text-selectValuesId">
            {mata.error}
          </FormHelperText>
        )}
      </Stack>
    </>
  );
};
