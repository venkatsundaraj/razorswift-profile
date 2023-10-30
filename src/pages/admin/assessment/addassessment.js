import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { textLabel } from '@/src/Components/LabelComponents/TextLabel';
import { AssessmentTypes, skillLevels } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import {
  AssessmentApi,
  ClientApi,
  IntegrationApi,
  JobDescriptionApi,
  SkillPlatformApi,
} from '@/swagger_api/*';
import {
  debounce,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
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
import { useEffect, useMemo, useState } from 'react';
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

const AddAssessment = () => {
  const [isSelfAssessment, setIsSelfAssessment] = useState(true);
  const [value, setValue] = useState(AssessmentTypes[0].id);
  const [skillPlatForms, setSkillPlatForms] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [jdList, setJdList] = useState([]);
  const clientApi = useMemo(() => new ClientApi(), []);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const assessmentApi = useMemo(() => new AssessmentApi(), []);

  const [integrationValues, setIntegrationValues] = useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const INITIAL_FORM_STATE = {
    tpAssessmentId: '', //integer
    title: '', //textfiled
    note: '', //textfiled
    integrationId: '',
    ...(isSelfAssessment && {
      assessmentSkills: [
        {
          skillLevel: 1, // select
          tpSectionName: '', // textfield
          skillPlatformId: '', // getskillplatformmaster
        },
      ],
    }),
    ...(!isSelfAssessment && {
      clientId: '',
      jdId: '',
    }),
  };

  const FORM_VALIDATION = Yup.object().shape({
    tpAssessmentId: Yup.string().required('Tp Assessment Id is required'),
    title: Yup.string().required('Title is required'),
    // note: Yup.string().required('Note is required'),
    integrationId: Yup.mixed().required('Integration Id is required'),
    ...(isSelfAssessment && {
      assessmentSkills: Yup.array()
        .min(1, 'At least one assessment skill is required')
        .of(
          Yup.object().shape({
            tpSectionName: Yup.string().required('Section name is required'),
            skillPlatformId: Yup.mixed().required('skillPlatformId Required'),
            skillLevel: Yup.string().required('Skill level is required'),
          })
        ),
    }),
    ...(!isSelfAssessment && {
      clientId: Yup.mixed().required('Please select a client'),
      jdId: Yup.mixed().required('Please select Job opening'),
    }),
  });

  useEffect(() => {
    GetSkillPlatForms();
    GetIntegration();
  }, []);

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

  async function GetSkillPlatForms() {
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
  }
  async function GetIntegration() {
    const integrationApi = new IntegrationApi();
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
  }

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
      router.push('/admin');
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

    const assessmentSkillsArray = values.assessmentSkills;
    const assessmentSkillsArrayMapped = assessmentSkillsArray.map(skill => ({
      skillLevel: skill.skillLevel, //select
      tpSectionName: skill.tpSectionName,
      skillPlatformId: skill.skillPlatformId.year,
      skillId: skill.skillPlatformId.skillId, //textfiled
    }));

    const postValues = {
      tpAssessmentId: values.tpAssessmentId, // integer
      title: values.title, // textfield
      note: values.note, // textfield
      integrationId: values.integrationId.year, // getautocmplete integration
      ...(isSelfAssessment
        ? { jdId: values?.jdId?.year }
        : { assessmentSkills: assessmentSkillsArrayMapped }),
    };
    const opts = {};
    opts.body = reverseCheckAndSet(postValues);
    try {
      const response = await assessmentApi.apiAssessmentPost(opts);
      handleApiResponse(response, 'Assessment added successfully');
    } catch (error) {
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

  const handleInputChangeClientName = debounce(async event => {
    await clientApi
      .apiClientGetAllByNameGet()
      .then(async response => {
        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];
        setClientList(trim);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 300);

  const getJdListBasedOnClient = async id => {
    if (typeof id !== 'number') {
      return; // or throw an error, depending on your use case
    }
    try {
      const response =
        await jobDescriptionApi.apiJobDescriptionGetAllByClientIdClientIdGet(
          id
        );
      const trim =
        response?.body?.result?.map((res, index) => ({
          title: res?.title,
          year: res?.id,
        })) || [];
      setJdList(trim);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {/* <>
        <Typography variant='h2' mt={2} mb={2} ml={3} align='left' sx={{ fontSize: '24px' }}>
          Add New Assessment
        </Typography>
      </> */}
      <MainCard
        title={
          <TitleBackButton
            title={'Add New Assessment'}
            onClick={() => router.back()}
          />
        }
      >
        {/* <Stack direction='row' spacing={1} alignItems='end' justifyContent={'flex-end'}>
          <SectionHeader sx={{ padding: 0 }}>Self assessment</SectionHeader>
          <AntSwitch
            checked={isSelfAssessment}
            onChange={() => setIsSelfAssessment(!isSelfAssessment)}
            inputProps={{ 'aria-label': 'ant design' }}
            // disabled={type.name === 'Jd Assessment'}
          />
          <SectionHeader sx={{ padding: 0 }}>Jd assessment</SectionHeader>
        </Stack> */}

        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
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
                    <TextfieldWrapper
                      name="tpAssessmentId"
                      textLabelStyle={textLabel}
                      textLabel="Tp assessment id"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <GetValuesAutocomplete
                      otherProps={otherPropsRequired}
                      options={integrationValues}
                      textLabelStyle={textLabel}
                      name="integrationId"
                      label="Integration Id"
                      placeHolder="Select your Integration Id"
                      value={values.integrationId}
                      onChange={(e, value) => {
                        setFieldValue('integrationId', value);
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
                                        textLabel="Section name"
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
                                          label="Skill Platform Id"
                                          placeHolder="Select your Integration Id"
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
                                        placeholder="Select level"
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
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                )
                              )}
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
                            onClick={() => handleAdd(values.assessmentSkills)}
                            // disabled={count >= 5}
                          >
                            <AddCircleOutlineOutlined />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Grid>
                  )}
                  {!isSelfAssessment && (
                    <Grid item xs={12} md={6}>
                      <HandleInputChangeAutocomplete
                        isNotAdd={true}
                        readOnly={false}
                        otherProps={otherPropsRequired}
                        options={clientList}
                        handleInputChange={handleInputChangeClientName}
                        name="clientId"
                        textLabelStyle={textLabel}
                        label="Select client "
                        placeHolder="Select client"
                        value={values?.clientId}
                        onChange={(e, value) => {
                          setFieldValue('clientId', value);
                          if (value) {
                            getJdListBasedOnClient(value?.year);
                          }
                        }}
                      />
                    </Grid>
                  )}
                  {!isSelfAssessment && (
                    <Grid item xs={12} md={6}>
                      <GetValuesAutocomplete
                        isNotAdd={true}
                        otherProps={otherPropsRequired}
                        options={jdList}
                        textLabelStyle={textLabel}
                        name="jdId"
                        label="Job opening"
                        placeHolder="Select job opening"
                        value={values.jdId}
                        onChange={(e, value) => {
                          setFieldValue('jdId', value);
                        }}
                      />
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
    </AdminLayout>
  );
};
export default AddAssessment;
