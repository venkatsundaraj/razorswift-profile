import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { textLabel } from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import {
  AssessmentApi,
  IntegrationApi,
  SkillPlatformApi,
} from '@/swagger_api/*';
import { reverseCheckAndSet } from '@/utils/CommonFunctions/Functions';
import { staticDropDownValidation } from '@/utils/validationSchema';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  styled,
  useTheme,
} from '@mui/material';
import Switch from '@mui/material/Switch';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(10px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const AddAssessmentForm = () => {
  const [isSelfAssessment, setIsSelfAssessment] = useState(true);
  const [skillPlatForms, setSkillPlatForms] = useState([]);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const integrationApi = useMemo(() => new IntegrationApi(), []);
  const assessmentApi = useMemo(() => new AssessmentApi(), []);
  const [integrationValues, setIntegrationValues] = useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const { setLoading } = useContext(LoadingContext);
  const INITIAL_FORM_STATE = {
    tpAssessmentId: null, //integer
    title: '', //textfiled
    note: '', //textfiled
    integrationId: '',
    ...(isSelfAssessment && {
      assessmentSkills: [
        {
          skillLevel: '', // select
          tpSectionName: '', // textfield
          skillPlatformId: '', // getskillplatformmaster
        },
      ],
    }),
  };
  const [assessmentInitialValues, setAssessmentInitialValues] =
    useState(INITIAL_FORM_STATE);

  const FORM_VALIDATION = Yup.object().shape({
    tpAssessmentId: Yup.number()
      .typeError('Tp Assessment Id is required')
      .integer('Tp Assessment Id must be an integer')
      .min(0, 'Tp Assessment Id cannot be negative')
      .required('Tp Assessment Id is required'),
    title: Yup.string().trim().required('Title is required'),
    // note: Yup.string().required('Note is required'),
    integrationId: Yup.mixed().required('Assessment Platform is required'),
    ...(isSelfAssessment && {
      assessmentSkills: Yup.array()
        .min(1, 'At least one assessment skill is required')
        .of(
          Yup.object().shape({
            tpSectionName: Yup.string().trim().required('Section is required'),
            skillPlatformId: Yup.mixed().required('Skill Platform Required'),
            //skillLevel: Yup.string().required('Skill level is required'),
            skillLevel: staticDropDownValidation(
              'Skill Level',
              true,
              skillLevels
            ),
          })
        ),
    }),
  });

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      skillLevel: 1, //select
      tpSectionName: '', //textfiled

      skillPlatformId: '', //getskillplaftprformaster
    });
    setCount(count + 1);
  };
  const handleRemove = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    setCount(count - 1);
  };
  const GetSkillPlatForms = useCallback(async () => {
    try {
      const response = await skillPlatformApi.apiSkillPlatformGet();
      const trim =
        response?.body?.result?.map((res, index) => ({
          year: res.id,
          title: res.name,
          skillId: res.skillId,
        })) || [];
      setSkillPlatForms(trim);
    } catch (error) {
      console.log(error);
    }
  }, [skillPlatformApi]);

  const GetIntegration = useCallback(async () => {
    const opts = {
      type: 1,
      companyName: '',
    };
    try {
      const response =
        await integrationApi.apiIntegrationGetAllByNameAndTypeGet(opts);
      const trim =
        response?.body?.result?.map((res, index) => ({
          year: res.id,
          title: res.companyName,
        })) || [];
      setIntegrationValues(trim);
    } catch (error) {
      console.log(error);
    }
  }, [integrationApi]);

  useEffect(() => {
    GetSkillPlatForms();
    GetIntegration();
  }, [GetSkillPlatForms, GetIntegration]);

  const handleApiResponse = (response, successMessage, isSelfAssessment) => {
    if (response.body.result) {
      // Display success message if response is successful
      dispatch(
        setAlertPopup({
          message: successMessage,
          type: 'success',
          duration: 3000,
        })
      );
      const url = '/admin/assessment/assessmentlist/';
      if (!isSelfAssessment) {
        const dropdownvalue = { type: 'jdassessment' };
        router.push({
          pathname: url,
          query: dropdownvalue,
        });
      } else {
        router.push('/admin/assessment/assessmentlist/');
      }
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

  const addAssessment = async values => {
    console.log(values);
    setLoading(true);

    const assessmentSkillsArray = values.assessmentSkills;
    const assessmentSkillsArrayMapped = assessmentSkillsArray.map(skill => ({
      skillLevel: skill.skillLevel, //select
      tpSectionName: skill.tpSectionName,
      skillPlatformId: skill.skillPlatformId.year,
      skillId: skill.skillPlatformId.skillId, //textfiled
    }));

    const postValues = {
      tpAssessmentId: parseInt(values.tpAssessmentId), // integer
      title: values.title, // textfield
      note: values.note, // textfield
      integrationId: values.integrationId.year, // getautocmplete integration
      isSelfAssessment: isSelfAssessment,
      ...(isSelfAssessment && {
        assessmentSkills: assessmentSkillsArrayMapped,
      }),
    };
    console.log(postValues);
    const opts = {};
    opts.body = reverseCheckAndSet(postValues);
    try {
      const response = await assessmentApi.apiAssessmentPost(opts);
      setLoading(false);
      handleApiResponse(
        response,
        'Assessment added successfully',
        isSelfAssessment
      );
    } catch (error) {
      setLoading(false);
      console.error('Error while creating assessment:', error);
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
    <MainCard
      title={
        <TitleBackButton
          title={'Add New Assessment'}
          onClick={() => router.back()}
        />
      }
    >
      <Formik
        enableReinitialize
        initialValues={{
          ...assessmentInitialValues,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          addAssessment(values, { resetForm });
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
          <Form>
            <Stack
              direction="row"
              spacing={1}
              alignItems="end"
              justifyContent={'flex-end'}
            >
              <SectionHeader sx={{ padding: 0 }}>Self Assessment</SectionHeader>
              <AntSwitch
                checked={!isSelfAssessment}
                onChange={() => {
                  // setAssessmentInitialValues(INITIAL_FORM_STATE);
                  if (isSelfAssessment)
                    setFieldValue('assessmentSkills', [
                      {
                        skillLevel: 1, // select
                        tpSectionName: '', // textfield
                        skillPlatformId: '', // getskillplatformmaster
                      },
                    ]);
                  setIsSelfAssessment(!isSelfAssessment);
                }}
                inputProps={{ 'aria-label': 'ant design' }}
                // disabled={type.name === 'Jd Assessment'}
              />
              <SectionHeader sx={{ padding: 0 }}>Jobs Assessment</SectionHeader>
            </Stack>

            <Box
              sx={{
                border: '1px solid black',
                margin: 2,
                padding: 5,
                backgroundColor: 'white',
              }}
            >
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} md={12}>
                  <TextfieldWrapper
                    name="title"
                    textLabelStyle={textLabel}
                    textLabel="Title"
                    otherProps={otherPropsRequired}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <GetValuesAutocomplete
                    otherProps={otherPropsRequired}
                    options={integrationValues}
                    textLabelStyle={textLabel}
                    name="integrationId"
                    label="Assessment Platform"
                    placeHolder="Select Assessment Platform"
                    value={values.integrationId}
                    onChange={(e, value) => {
                      setFieldValue('integrationId', value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="tpAssessmentId"
                    textLabelStyle={textLabel}
                    textLabel="Tp Assessment Id"
                    otherProps={otherPropsRequired}
                    onChange={e => {
                      setFieldValue(
                        'tpAssessmentId',
                        e.target.value.replace(/[^0-9]/g, '') // Replace non-numeric characters with empty string
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextfieldWrapper
                    name="note"
                    multiline
                    minRows={4}
                    textLabelStyle={textLabel}
                    textLabel="Remarks"
                    otherProps={otherPropsNotRequired}
                  />
                </Grid>

                {isSelfAssessment && (
                  <Grid item xs={12}>
                    <FieldArray name="assessmentSkills">
                      {arrayHelpers => (
                        <>
                          {values.assessmentSkills &&
                            values.assessmentSkills.map(
                              (assessmentSkills, index) => (
                                <Grid
                                  container
                                  spacing={2}
                                  key={index}
                                  justifyContent="space-between"
                                  alignItems={'flex-start'}
                                >
                                  <Grid item xs={3}>
                                    <TextfieldWrapper
                                      name={`assessmentSkills.${index}.tpSectionName`}
                                      readOnly={false}
                                      textLabelStyle={textLabel}
                                      textLabel="Section"
                                      otherProps={otherPropsRequired}
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Stack spacing={1.5}>
                                      <GetValuesAutocomplete
                                        otherProps={otherPropsRequired}
                                        options={skillPlatForms}
                                        textLabelStyle={textLabel}
                                        name={`assessmentSkills.${index}.skillPlatformId`}
                                        label="Skill Platform"
                                        placeHolder="Select Skill Platform"
                                        value={
                                          values?.assessmentSkills
                                            ?.skillPlatformId
                                        }
                                        onChange={(e, value) => {
                                          setFieldValue(
                                            `assessmentSkills.${index}.skillPlatformId`,
                                            value ? value : ''
                                          );
                                        }}
                                      />
                                    </Stack>
                                  </Grid>

                                  <Grid item xs={3}>
                                    <SelectWrapper
                                      name={`assessmentSkills.${index}.skillLevel`}
                                      textLabel="Skill Level"
                                      textLabelStyle={textLabel}
                                      options={skillLevels}
                                      placeholder="Select Skill Level"
                                      inputProps={otherPropsRequired}
                                    />
                                  </Grid>
                                  <Grid item xs={2} alignSelf="center">
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      {values.assessmentSkills.length > 1 && (
                                        <IconButton
                                          type="button"
                                          disableRipple
                                          size="large"
                                          aria-label="back"
                                          color="primary"
                                          onClick={() =>
                                            handleRemove(arrayHelpers, index)
                                          }
                                        >
                                          <Delete />
                                        </IconButton>
                                      )}
                                    </Stack>
                                  </Grid>
                                </Grid>
                              )
                            )}
                        </>
                      )}
                    </FieldArray>
                    <Stack alignItems={'flex-end'}>
                      {false && (
                        <Tooltip title="Add version" arrow placement="right">
                          <IconButton
                            type="button"
                            disableRipple
                            size="large"
                            aria-label="back"
                            color="primary"
                            onClick={() => handleAdd(values.assessmentSkills)}
                            // disabled={count >= 5}
                          >
                            <AddCircleOutlineOutlined />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </Grid>
                )}

                <Grid item xs={12} alignSelf="center">
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
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
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};
export default AddAssessmentForm;
