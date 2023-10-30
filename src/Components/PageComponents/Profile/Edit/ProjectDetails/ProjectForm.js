import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import FormCard from '@/cardComponents/FormCard';
import CheckboxWrapper from '@/formComponents/FormsUI/Checkbox';
import CkEditorForm from '@/formComponents/FormsUI/CkEditorForm';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { GridComponent } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateEmployerApi,
  CandidateProjectsApi,
  CandidateSkillApi,
} from '@/swagger_api/*';
import { getFirstDayOfCurrentMonth } from '@/utils/CommonFunctions/DateRelatedFunction';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import {
  checkAndSet,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { EditorValidationSchemaNotRequired } from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  title: '',
  employerId: '',
  isAcademic: false,
  startDate: '',
  endDate: '',
  description: '',
  responsibility: '',
  projectSkills: [],
};

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(1, 'Project Title must be must be at least 1 character')
    .max(255, 'Project Title cannot be more than 250 characters')
    .required('Project Title is required'),
  employerId: Yup.mixed().when('isAcademic', {
    is: false,
    then: Yup.mixed().nullable().required('Company is required'),
    otherwise: Yup.mixed().nullable(),
  }),
  isAcademic: Yup.boolean(),
  endDate: Yup.date()
    .nullable()
    .when('startDate', {
      is: startDate => startDate,
      then: Yup.date().min(
        Yup.ref('startDate'),
        'To should be greater than From date'
      ),
    })
    .max(getFirstDayOfCurrentMonth(), 'To should be before today'),
  startDate: Yup.date()
    .nullable()
    .max(
      getFirstDayOfCurrentMonth(),
      'From should be before or equal to today'
    ),
  description: EditorValidationSchemaNotRequired('Description', true),
  responsibility: EditorValidationSchemaNotRequired(
    'Roles & Responsibility',
    true
  ),
  projectSkills: Yup.array().min(1, 'At least one Project Skill is required.'),
});

const ProjectForm = ({
  getData,
  projectInfo,
  setProjectInfo,
  projectInfoEdit,
  setProjectInfoEdit,
  projectEdit,
  setProjectEdit,
  sectionRef,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);
  const [readOnly, setReadOnly] = useState(false);
  const [projectInitialValues, setProjectInitialValues] =
    useState(INITIAL_FORM_STATE);
  const [companyValues, setCompanyValues] = useState([]);
  const [skillAliases, setAliases] = useState([]);
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const isAddingViewing = getFormTypes('Add_View') === projectEdit;
  const isEditing = getFormTypes('Edit_Form') === projectEdit;
  const isAdding = getFormTypes('Add_Form') === projectEdit;
  const companyApi = useMemo(() => new CandidateEmployerApi(), []);
  const candidateProjectsApi = useMemo(() => new CandidateProjectsApi(), []);
  const candidateSkillApi = useMemo(() => new CandidateSkillApi(), []);

  useEffect(() => {
    if (projectEdit === '3' && Object.keys(projectInfoEdit).length != 0) {
      console.log('projectInfoEdit', projectInfoEdit);
      setProjectInitialValues(INITIAL_FORM_STATE);
      let k = {
        ...projectInfoEdit,
        description:
          projectInfoEdit.description === '' ||
          projectInfoEdit.description === null
            ? ''
            : projectInfoEdit.description,
        responsibility:
          projectInfoEdit.responsibility === '' ||
          projectInfoEdit.responsibility === null
            ? ''
            : projectInfoEdit.responsibility,
        projectSkills: projectInfoEdit.projectSkills?.map((res, index) => ({
          id: res?.candidateSkillPlatformId,
          title: res?.candidateSkillPlatform?.name,
        })),
      };
      if (projectInfoEdit.isAcademic) {
        k = {
          ...k,
          employerId: '',
        };
      } else if (projectInfoEdit.isAcademic === false) {
        k = {
          ...k,
          employerId: {
            year: projectInfoEdit.employerId,
            title: projectInfoEdit.employerName,
          },
        };
      } else {
        console;
        k = {
          ...k,
          isAcademic: false,
          employerId: '',
        };
      }
      setProjectInitialValues(checkAndSet(k));
    }
  }, [projectInfoEdit, projectEdit]);

  const CompanyGet = useCallback(async () => {
    try {
      const response =
        await companyApi.apiCandidateEmployerGetAllEmployerByCandidateIdcandidateIdGet(
          userDetails?.candidateId
        );
      const trim =
        response?.body?.result?.map((res, index) => ({
          year: res?.id,
          title: res?.company?.name,
        })) || [];
      setCompanyValues(trim);
    } catch (error) {
      console.log(error);
    }
  }, [userDetails?.candidateId, companyApi]);
  const GetSkillAlias = useCallback(async () => {
    try {
      const response =
        await candidateSkillApi.apiCandidateSkillGetAllCandidateSkillPlatformCandidateIdGet(
          userDetails?.candidateId
        );
      const trim =
        response?.body?.result?.map((res, index) => ({
          id: res.id,
          title: res.name,
        })) || [];
      setAliases(trim);
    } catch (error) {
      console.log(error);
    }
  }, [userDetails?.candidateId, candidateSkillApi]);

  useEffect(() => {
    CompanyGet();
    GetSkillAlias();
  }, [CompanyGet, GetSkillAlias]);

  const addProject = async (values, { resetForm }) => {
    var opts = {};
    let k = {};
    k = {
      title: values.title,
      description: values?.description,
      responsibility: values?.responsibility,
      projectSkills: values.projectSkills?.map((res, index) => ({
        candidateSkillPlatformId: res.id,
        candidateId: userDetails?.candidateId,
      })),
      startDate: values.startDate === '' ? null : values.startDate,
      endDate: values.endDate === '' ? null : values.endDate,
    };
    if (values.isAcademic) {
      k = {
        ...k,
        isAcademic: true,
        employerId: null,
        candidateId: userDetails?.candidateId,
      };
    } else {
      k = {
        ...k,
        isAcademic: false,
        employerId: values.employerId.year,
      };
    }
    const empty_null = reverseCheckAndSet(k);
    opts.body = { ...empty_null };

    setLoading(true);

    try {
      const response = await candidateProjectsApi.apiCandidateProjectsPost(
        opts
      );
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Project added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setProjectEdit('1');
        getData();
        resetForm();
        setProjectInitialValues(INITIAL_FORM_STATE);
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  const editProject = async (values, { resetForm }) => {
    var opts = {};
    var k = {};
    console.log('values', values);

    k = {
      ...values,
      title: values.title,
      description: values?.description,
      responsibility: values?.responsibility,
      projectSkills: values.projectSkills?.map((res, index) => ({
        candidateSkillPlatformId: res.id,
        candidateId: userDetails?.candidateId,
      })),

      startDate: values.startDate === '' ? null : values.startDate,
      endDate: values.endDate === '' ? null : values.endDate,
    };
    if (values.isAcademic) {
      k = {
        ...k,
        isAcademic: true,
        employerId: null,
        candidateId: userDetails?.candidateId,
      };
    } else {
      k = {
        ...k,
        isAcademic: false,
        employerId: values.employerId.year,
      };
    }
    const empty_null = reverseCheckAndSet(k);

    opts.body = { ...empty_null };
    setLoading(true);
    console.log('opts.body', opts);
    try {
      const response =
        await candidateProjectsApi.apiCandidateProjectsUpdateProjectDetailsPut(
          opts
        );
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Project updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        resetForm();
        setProjectEdit('1');
        setProjectInitialValues(INITIAL_FORM_STATE);

        getData();
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  const deleteProject = async ({ resetForm }) => {
    setLoading(true);

    const confirmDelete = async () => {
      try {
        const response =
          await candidateProjectsApi.apiCandidateProjectsIdDelete(
            projectInfoEdit.id
          );
        setLoading(false);

        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Project deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          getData();
          setProjectEdit('1');
          setProjectInitialValues(INITIAL_FORM_STATE);
          // resetForm();
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (error) {
        setLoading(false);
        console.log('delete', error);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      }
    };

    const revertDelete = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the delete action',
          type: 'info',
          duration: 3000,
        })
      );
      setLoading(false);
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Project!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...projectInitialValues,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, { resetForm }) => {
        console.log('values', values);
        if (projectEdit === '3') {
          editProject(values, { resetForm });
        } else if (projectEdit === '2') {
          addProject(values, { resetForm });
        }
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
        resetForm,
      }) => (
        <Stack spacing={2} ref={sectionRef}>
          {isAddingViewing && (
            <ShadowButtonSubmit
              height="40px"
              width="100%"
              minwidth="200px"
              maxwidth="200px"
              backgroundcolor="#A62973"
              variant="contained"
              onClick={() => {
                resetForm();
                setProjectInitialValues(INITIAL_FORM_STATE);
                setProjectEdit('2');
              }}
            >
              Add New Project
            </ShadowButtonSubmit>
          )}
          {isAdding || isEditing ? (
            <Stack direction="row" justifyContent="space-between">
              <FormHeaderComponents
                title={`${isEditing ? 'Edit' : 'Add'} projects`}
                isButtonNotRequired={true}
              />
              <IconButton
                size="small"
                disableRipple
                onClick={() => {
                  resetForm();
                  setProjectInitialValues(INITIAL_FORM_STATE);
                  setProjectEdit('1');
                }}
              >
                <ClearIcon color="primary" />
              </IconButton>
            </Stack>
          ) : null}
          {isAdding || isEditing ? (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormCard>
                  <Stack spacing={0}>
                    <GridComponent>
                      <Grid item xs={12} sm={12}>
                        <TextfieldWrapper
                          readOnly={readOnly}
                          name="title"
                          textLabelStyle={textLabel}
                          textLabel="Project Title"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <CheckboxWrapper
                          name="isAcademic"
                          legend="To"
                          label="Academic Projects"
                          labelStyle={{
                            fontSize: '14px',
                            lineHeight: '16.8px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            [theme.breakpoints.down('sm')]: {
                              fontSize: '12px',
                              lineHeight: '20px',
                            },
                          }}
                        />
                        {!values.isAcademic && (
                          <GetValuesAutocomplete
                            otherProps={otherPropsRequired}
                            options={companyValues}
                            textLabelStyle={textLabel}
                            name="employerId"
                            label="Companies"
                            placeHolder="Select Your Company"
                            value={values.employerId}
                            onChange={(e, value) => {
                              setFieldValue('employerId', value);
                            }}
                          />
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6} alignSelf="flex-start">
                        <MuiDateTimePicker
                          formatValue="month"
                          readOnly={readOnly}
                          textLabelStyle={textLabel}
                          name="startDate"
                          textLabel="From"
                          required
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} alignSelf="flex-start">
                        <MuiDateTimePicker
                          formatValue="month"
                          readOnly={readOnly}
                          textLabelStyle={textLabel}
                          name="endDate"
                          textLabel="To"
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <GetValuesAutocomplete
                          multiple={true}
                          otherProps={otherPropsRequired}
                          options={skillAliases}
                          textLabelStyle={textLabel}
                          name="projectSkills"
                          label="Projects Skills"
                          placeHolder="Select Your Project Skills"
                          value={values.projectSkills}
                          onChange={(e, value) => {
                            setFieldValue('projectSkills', value);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <CkEditorForm
                          otherProps={otherPropsNotRequired}
                          textLabelStyle={textLabel}
                          name="description"
                          label="Description"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CkEditorForm
                          otherProps={otherPropsNotRequired}
                          textLabelStyle={textLabel}
                          name="responsibility"
                          label="Roles & Responsibility"
                        />
                      </Grid>
                    </GridComponent>
                  </Stack>
                </FormCard>
                {!readOnly && (
                  <Stack
                    justifyContent={'flex-end'}
                    alignItems={'flex-end'}
                    direction="row"
                    spacing={2}
                  >
                    {isEditing && (
                      <SubmissionButton
                        type="button"
                        onClick={() => {
                          deleteProject({ resetForm });
                        }}
                      >
                        Delete
                      </SubmissionButton>
                    )}
                    <SubmissionButton onClick={handleSubmit}>
                      {`${isEditing ? 'Update' : 'Add'} Project`}
                    </SubmissionButton>
                  </Stack>
                )}
              </Stack>
            </Form>
          ) : null}
        </Stack>
      )}
    </Formik>
  );
};

export default ProjectForm;
