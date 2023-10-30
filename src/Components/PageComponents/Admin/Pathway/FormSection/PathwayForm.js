import MainCard from '@/cardComponents/MainCard';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import {
  clientApi,
  jobDescriptionApi,
  pathwayTypeApi,
  skillPlatformApi,
} from '@/src/data/swaggerApi_data';
import { setAlertPopup } from '@/store/alertSlice';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import {
  multiLineValidation,
  nameValidationwithNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { Divider, Grid, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const PATHWAY_TYPES = {
  SKILL: 'Skill',
  COMPANY: 'Company',
  JOBS: 'Jobs',
};

const PathwayForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const [isSkillBased, setIsSkillBased] = useState(true);
  const [pathwayType, setPathwayType] = useState('');
  const dispatch = useDispatch();
  const [skillPlatformList, setSkillPlatformList] = useState([]);
  const [pathwayTypeList, setPathwayTypeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [jobDescriptionList, setJobDescriptionList] = useState([]);
  const [stepMasters, stepStepMasters] = useState([
    {
      id: 1,
      stepName: 'create profile',
      isMandate: true,
      attributes: [
        {
          mainHeader: 'Reference',
          details: [
            {
              id: 1,
              label: 'Name',
              type: 'text',
              isRequired: true,
              fieldName: 'name',
              value: '',
            },
            {
              id: 2,
              label: 'Link',
              type: 'url',
              isRequired: true,
              fieldName: 'link',
              value: '',
            },
            {
              id: 3,
              label: 'Date',
              type: 'date',
              isRequired: true,
              fieldName: 'date',
              value: '',
            },
          ],
        },
        {
          mainHeader: 'Outcome',
          details: [
            {
              id: 1,
              label: 'Pass',
              type: 'text',
              isRequired: true,
              fieldName: 'pass',
              value: '',
            },
            {
              id: 2,
              label: 'Fail',
              type: 'text',
              isRequired: true,
              fieldName: 'fail',
              value: '',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      stepName: 'Assessment',
      isMandate: false,
      description: '',
      is_active: true,
      attributes: [
        {
          mainHeader: 'Outcome',
          details: [
            {
              id: 1,
              label: 'Min marks',
              type: 'number',
              isRequired: true,
              fieldName: 'minMarks',
              value: '',
            },
            {
              id: 2,
              label: 'Max marks',
              type: 'number',
              isRequired: true,
              fieldName: 'maxMarks',
              value: '',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      stepName: 'Courses',
      isMandate: false,
    },
  ]);
  const [formInitialValues, setFormInitialValues] = useState(null);

  useEffect(() => {
    const updatedStepMasters = stepMasters.map(step => ({
      ...step,
      isSelectedItemList: false,
    }));
    stepStepMasters(updatedStepMasters);
  }, []);

  const PathWayTypes = [
    { id: 1, value: 1, name: 'Jobs' },
    { id: 2, value: 2, name: 'Skill' },
    { id: 3, value: 3, name: 'Company' },
  ];

  const INITIAL_FORM_STATE = {
    pathwayType: '',
    title: '',
    description: '',
    ...(pathwayType === 'Skill' && {
      skill: '',
      skill_level: '',
    }),
    ...(pathwayType === 'Company' && {
      company: '',
    }),
    ...(pathwayType === 'Jobs' && {
      jobDescription: '',
    }),
  };
  const FORM_VALIDATION = Yup.object().shape({
    title: nameValidationwithNoRegex('Title', true),
    description: multiLineValidation('Description', true),
    pathwayType: staticDropDownValidation('Path Way', true, PathWayTypes),
    ...(pathwayType === 'Skill' && {
      skill: Yup.mixed().required('Skill platform is required'),
      skill_level: staticDropDownValidation('Skill Level', true, skillLevels),
    }),
    ...(pathwayType === 'Company' && {
      company: Yup.mixed().required('Company is required'),
    }),
    ...(pathwayType === 'Jobs' && {
      jobDescription: Yup.mixed().required('Job Description is required'),
    }),
  });

  const SubmitDetails = async (values, { resetForm }) => {
    console.log('sub', values);
    const updatedStepMasters = stepMasters.map(step =>
      step.id === formInitialValues.id ? { ...formInitialValues } : step
    );
    console.log(updatedStepMasters);
    dispatch(
      setAlertPopup({
        message: 'Pathway created successfully',
        type: 'success',
        duration: 3000,
      })
    );
  };

  const handleInputSkillPlatformName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await skillPlatformApi.apiSkillPlatformGetAllByNameGet(
          opts
        );

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setSkillPlatformList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillPlatformApi.apiSkillPlatformGetAllByNameGet, setSkillPlatformList]
  );
  const handleInputCompanyName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await clientApi.apiClientGetAllByNameGet(opts);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setCompanyList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillPlatformApi.apiSkillPlatformGetAllByNameGet, setSkillPlatformList]
  );
  const handleInputJobDescriptionName = useCallback(async (event, newValue) => {
    let opts = {
      name: newValue,
    };
    console.log(newValue);

    try {
      const response = await jobDescriptionApi.apiJobDescriptionGet();

      const trim =
        response?.body?.result?.map((res, index) => ({
          title: res?.title,
          year: res?.id,
        })) || [];

      setJobDescriptionList(trim);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleInputPathwayTypeName = useCallback(async (event, newValue) => {
    let opts = {
      name: newValue,
    };
    console.log(newValue);

    try {
      const response = await pathwayTypeApi.apiPathwayTypeGetAllByNameGet(opts);

      const trim =
        response?.body?.result?.map((res, index) => ({
          title: res?.name,
          year: res?.id,
        })) || [];

      setPathwayTypeList(trim);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    handleInputSkillPlatformName('');
    handleInputCompanyName('');
    handleInputPathwayTypeName('');
  }, [
    handleInputSkillPlatformName,
    handleInputCompanyName,
    handleInputPathwayTypeName,
  ]);
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      //   enableReinitialize
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, { resetForm }) => SubmitDetails(values, { resetForm })}
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
        <>
          <MainCard title="PathWay Creation">
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={6} md={6} alignSelf="flex-start">
                  <HandleInputChangeAutocomplete
                    isNotAdd={true}
                    otherProps={otherPropsRequired}
                    options={pathwayTypeList}
                    handleInputChange={handleInputPathwayTypeName}
                    textLabelStyle={textLabel}
                    name="pathwayType"
                    label="Pathway Type"
                    placeHolder="Select Pathway"
                    value={values.pathwayType}
                    onChange={(e, value) => {
                      const confirmChange = async () => {
                        setFieldValue('pathwayType', value);
                        setPathwayType(value?.title || '');
                        if (value.title === 'Skill') {
                          setFieldValue('skill', '');
                          setFieldValue('skill_level', '');
                          handleInputSkillPlatformName('');
                        } else if (value.title === 'Company') {
                          setFieldValue('company', '');
                          handleInputCompanyName('');
                        } else if (value.title === 'Jobs') {
                          setFieldValue('jobDescription', '');
                          handleInputJobDescriptionName('');
                        }
                      };

                      const revertAction = () => {
                        setFieldValue('pathwayType', '');
                        setPathwayType('');
                        dispatch(
                          setAlertPopup({
                            message: 'You have reverted the action',
                            type: 'info',
                            duration: 3000,
                          })
                        );
                      };

                      if (value) {
                        showConfirmationDialog(
                          'Are you sure?',
                          'Your want the change Pathway Type!',
                          confirmChange,
                          revertAction
                        );
                      } else {
                        setFieldValue('pathwayType', '');
                        setPathwayType('');
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextfieldWrapper
                    name="title"
                    textLabelStyle={textLabel}
                    textLabel="Title"
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextfieldWrapper
                    name="description"
                    multiline
                    minRows={4}
                    textLabelStyle={textLabel}
                    textLabel="Description"
                    otherProps={otherPropsRequired}
                  />
                </Grid>

                {pathwayType === 'Skill' && (
                  <Grid item xs={6} md={6}>
                    <HandleInputChangeAutocomplete
                      isNotAdd={true}
                      otherProps={otherPropsRequired}
                      options={skillPlatformList}
                      handleInputChange={handleInputSkillPlatformName}
                      textLabelStyle={textLabel}
                      name="skill"
                      label="Skills"
                      placeHolder="Select Skill"
                      value={values.skill}
                      onChange={(e, value) => {
                        setFieldValue('skill', value);
                      }}
                    />
                  </Grid>
                )}

                {pathwayType === 'Skill' && (
                  <Grid item xs={6} md={6} alignSelf="flex-start">
                    <SelectWrapper
                      name={`skill_level`}
                      textLabel="Skill Level"
                      textLabelStyle={textLabel}
                      options={skillLevels}
                      placeholder="Select level"
                      inputProps={otherPropsRequired}
                    />
                  </Grid>
                )}

                {pathwayType === 'Company' && (
                  <Grid item xs={6} md={6}>
                    <HandleInputChangeAutocomplete
                      isNotAdd={true}
                      otherProps={otherPropsRequired}
                      options={companyList}
                      handleInputChange={handleInputCompanyName}
                      textLabelStyle={textLabel}
                      name="company"
                      label="Company"
                      placeHolder="Select Company"
                      value={values.company}
                      onChange={(e, value) => {
                        setFieldValue('company', value);
                      }}
                    />
                  </Grid>
                )}

                {pathwayType === 'Jobs' && (
                  <Grid item xs={6} md={6}>
                    <HandleInputChangeAutocomplete
                      isNotAdd={true}
                      otherProps={otherPropsRequired}
                      options={jobDescriptionList}
                      handleInputChange={handleInputJobDescriptionName}
                      textLabelStyle={textLabel}
                      name="jobDescription"
                      label="Jobs"
                      placeHolder="Select Jobs"
                      value={values.jobDescription}
                      onChange={(e, value) => {
                        setFieldValue('jobDescription', value);
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Form>
            <Divider sx={{ marginY: 3 }} />
            <Stack alignItems={'center'}>
              {
                // <Button
                //   sx={{ mt: 2 }}
                //   variant="contained"
                //   onClick={handleSaveClick}
                // >
                //   Submit
                // </Button>
                <SubmissionButton onClick={handleSubmit}>
                  Submit
                </SubmissionButton>
              }
            </Stack>
          </MainCard>
        </>
      )}
    </Formik>
  );
};
export default PathwayForm;
