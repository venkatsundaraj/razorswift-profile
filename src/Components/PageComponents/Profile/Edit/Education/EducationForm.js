import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import FormCard from '@/cardComponents/FormCard';
import CheckboxWrapper from '@/formComponents/FormsUI/Checkbox';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { GridComponent } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { textLabel } from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateQualificationApi,
  FieldOfStudyApi,
} from '@/swagger_api/api/DegreeAliasApi';
import { DegreeApi } from '@/swagger_api/api/DegreeApi';
import { EducationInstituteApi } from '@/swagger_api/api/EducationInstituteApi';
import { getFirstDayOfCurrentMonth } from '@/utils/CommonFunctions/DateRelatedFunction';
import { getDropDownValues } from '@/utils/CommonFunctions/DropdownValuesGetFunctions';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import {
  debounce,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  addifnotexistdropdownValidationSchema,
  addifnotexistdropdownValidationSchemaNotRequired,
} from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  institution: null,
  degreename: null,
  fieldofstudy: null,
  startDate: null,
  endDate: null,
  isStillPerceiving: true,
};
const FORM_VALIDATION = Yup.object().shape({
  institution: addifnotexistdropdownValidationSchema(
    'School/Institution',
    1,
    255,
    true
  ),
  degreename: addifnotexistdropdownValidationSchema('Degree', 1, 100, true),
  fieldofstudy: addifnotexistdropdownValidationSchemaNotRequired(
    'Field Of Study',
    1,
    100,
    true
  ),
  isStillPerceiving: Yup.boolean(),
  startDate: Yup.date()
    .nullable()
    .max(Yup.ref('endDate'), 'Start Year should be before Passed Out Year')
    .max(
      getFirstDayOfCurrentMonth(),
      'Start Year should be before or equal to today'
    ),
  endDate: Yup.date().when('isStillPerceiving', {
    is: false,
    then: Yup.date()
      .nullable()
      .required('Passed Out Year is required')
      .max(
        getFirstDayOfCurrentMonth(),
        'Passed Out Year should be before today'
      )
      .when('startDate', {
        is: startDate => startDate,
        then: Yup.date().min(
          Yup.ref('startDate'),
          'Passed Out Year should be greater than Start Year'
        ),
      }),
    otherwise: Yup.date()
      .nullable()
      .max(
        getFirstDayOfCurrentMonth(),
        'Passed Out Year should be before today'
      ),
  }),
});

const EducationForm = ({
  edit,
  educationInfo,
  setEducationInfo,
  educationInfoEdit,
  setEducationInfoEdit,
  educationEdit,
  setEducationEdit,
  getData,
  sectionRef,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const candidateQualificationApi = useMemo(
    () => new CandidateQualificationApi(),
    []
  );
  const educationInstituteApi = useMemo(() => new EducationInstituteApi(), []);
  const degreeApi = useMemo(() => new DegreeApi(), []);
  const fieldOfStudyApi = useMemo(() => new FieldOfStudyApi(), []);
  const { loading, setLoading } = useContext(LoadingContext);
  const [readOnly, setReadOnly] = useState(false);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [educationInfoInitialValues, setEducationInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const isAddingViewing = getFormTypes('Add_View') === educationEdit;
  const isEditing = getFormTypes('Edit_Form') === educationEdit;
  const isAdding = getFormTypes('Add_Form') === educationEdit;
  const [university, setUniversity] = useState([]);
  const [degree2, setDegree2] = useState([]);
  const [fieldofstudy, setFieldofStudy] = useState([]);

  useEffect(() => {
    if (educationEdit === '3' && Object.keys(educationInfoEdit).length != 0) {
      var k = {
        startDate:
          educationInfoEdit?.startDate === null
            ? ''
            : educationInfoEdit?.startDate,
        endDate:
          educationInfoEdit?.endDate === null ? '' : educationInfoEdit?.endDate,
        isStillPerceiving: educationInfoEdit?.isStillPerceiving
          ? educationInfoEdit?.isStillPerceiving
          : false,
        id: educationInfoEdit?.id,
      };
      if (educationInfoEdit.educationInstituteId) {
        k = {
          ...k,
          institution: {
            title: educationInfoEdit?.primaryEducationInstitute?.name,
            year: educationInfoEdit?.educationInstituteId,
          },
        };
      } else {
        k = {
          ...k,
          institution: '',
        };
      }
      if (educationInfoEdit.degreeId) {
        k = {
          ...k,
          degreename: {
            title: educationInfoEdit?.degree?.name,
            year: educationInfoEdit?.degree?.id,
          },
        };
      } else {
        k = {
          ...k,
          degreename: '',
        };
      }
      if (educationInfoEdit.fieldOfStudyId) {
        k = {
          ...k,
          fieldofstudy: {
            title: educationInfoEdit?.fieldOfStudy?.name,
            year: educationInfoEdit?.fieldOfStudyId,
          },
        };
      } else {
        k = {
          ...k,
          fieldofstudy: '',
        };
      }
      setEducationInfoInitialValues(k);
    }
  }, [edit, educationInfoEdit, educationEdit]);

  const handleInputChangeUniversityName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };
      try {
        const response =
          await educationInstituteApi.apiEducationInstituteGetAllByNameGet(
            opts
          );
        console.log(response);
        const trim = getDropDownValues(response.body.result);
        setUniversity(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [educationInstituteApi.apiEducationInstituteGetAllByNameGet, setUniversity]
  );

  const handleInputChangeDegreeName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };
      try {
        const response = await degreeApi.apiDegreeGetAllByNameGet(opts);
        console.log(response);
        const trim = getDropDownValues(response.body.result);
        setDegree2(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [degreeApi.apiDegreeGetAllByNameGet, setDegree2]
  );

  const handleInputChangeFiledOfStudy = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };
      try {
        const response = await fieldOfStudyApi.apiFieldOfStudyGetAllByNameGet(
          opts
        );
        console.log(response);
        const trim = getDropDownValues(response.body.result);
        setFieldofStudy(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [fieldOfStudyApi.apiFieldOfStudyGetAllByNameGet, setFieldofStudy]
  );
  const handleInputChanges = useCallback(
    inputValue => {
      handleInputChangeUniversityName(inputValue);
      handleInputChangeDegreeName(inputValue);
      handleInputChangeFiledOfStudy(inputValue);
    },
    [
      handleInputChangeUniversityName,
      handleInputChangeDegreeName,
      handleInputChangeFiledOfStudy,
    ]
  );

  useEffect(() => {
    handleInputChanges('');
  }, [handleInputChanges]);

  const getEducationData = values => {
    let educationData = {};

    if (values.fieldofstudy?.inputValue) {
      educationData.fieldOfStudyName = values.fieldofstudy?.inputValue;
    } else {
      educationData.fieldOfStudyId =
        values.fieldofstudy === '' ||
        values.fieldofstudy === undefined ||
        values.fieldofstudy === null
          ? null
          : values.fieldofstudy?.year;
    }

    if (values.degreename.inputValue) {
      educationData.degreeName = values.degreename?.inputValue;
    } else {
      educationData.degreeId = values.degreename?.year;
    }

    if (values.institution?.inputValue) {
      educationData.institutionName = values.institution?.inputValue;
    } else {
      educationData.educationInstituteId = values.institution?.year;
    }

    if (
      !values.institution?.inputValue &&
      !values.degreename?.inputValue &&
      !values.fieldofstudy?.inputValue
    ) {
      educationData.educationInstituteId = values.institution?.year;
      educationData.degreeId = values.degreename?.year;
      educationData.fieldOfStudyId = values.fieldofstudy?.year ?? null;
    }

    return educationData;
  };
  const addQualification = async (values, { resetForm }) => {
    const educationData = getEducationData(values);
    let data = {
      ...educationData,
      candidateId: userDetails?.candidateId,
      isStillPerceiving: values.isStillPerceiving,
    };
    if (values.isStillPerceiving) {
      data = {
        ...data,
        startDate: values.startDate === '' ? null : values.startDate,
      };
    } else {
      data = {
        ...data,
        startDate: values.startDate === '' ? null : values.startDate,
        endDate: values.endDate === '' ? null : values.endDate,
      };
    }
    var opts = {};
    opts.body = reverseCheckAndSet(data);
    console.log('submit', opts);

    setLoading(true);

    try {
      const response =
        await candidateQualificationApi.apiCandidateQualificationPost(opts);
      setLoading(false);
      if (response.body.result) {
        handleInputChanges('');
        dispatch(
          setAlertPopup({
            message: 'Education added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setEducationEdit('1');
        getData();
        resetForm();
        setEducationInfoInitialValues(INITIAL_FORM_STATE);
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
  const editQualification = async (values, { resetForm }) => {
    console.log('edit values', values);
    console.log(values);
    const educationData = getEducationData(values);
    let data = {
      ...educationData,
      candidateId: userDetails?.candidateId,
      isStillPerceiving: values.isStillPerceiving,

      id: values.id,
    };
    if (values.isStillPerceiving) {
      data = {
        ...data,
        startDate: values.startDate === '' ? null : values.startDate,
      };
    } else {
      data = {
        ...data,
        startDate: values.startDate === '' ? null : values.startDate,
        endDate: values.endDate === '' ? null : values.endDate,
      };
    }

    var opts = {};

    opts.body = reverseCheckAndSet(data);
    console.log('opts,body', opts);

    try {
      const response =
        await candidateQualificationApi.apiCandidateQualificationUpdateQualificationDetailsPut(
          opts
        );
      setLoading(false);
      if (response.body.result) {
        handleInputChanges('');
        dispatch(
          setAlertPopup({
            message: 'Education updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        resetForm();
        setEducationInfoInitialValues(INITIAL_FORM_STATE);
        setEducationEdit('1');
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
  const deleteEducation = async ({ resetForm }) => {
    setLoading(true);

    const confirmDelete = async () => {
      try {
        const response =
          await candidateQualificationApi.apiCandidateQualificationIdDelete(
            educationInfoEdit.id
          );
        setLoading(false);

        if (response.body.result) {
          handleInputChanges('');
          resetForm();
          setEducationInfoInitialValues(INITIAL_FORM_STATE);
          dispatch(
            setAlertPopup({
              message: 'Education deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          setEducationEdit('1');
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
      'You want to delete this Education!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...educationInfoInitialValues,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, { resetForm }) => {
        if (educationEdit === '3') {
          editQualification(values, { resetForm });
        } else if (educationEdit === '2') {
          addQualification(values, { resetForm });
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
                setEducationInfoInitialValues(INITIAL_FORM_STATE);
                setEducationEdit('2');
              }}
            >
              Add New Education
            </ShadowButtonSubmit>
          )}
          {isAdding || isEditing ? (
            <Stack direction="row" justifyContent="space-between">
              <FormHeaderComponents
                title={`${isEditing ? 'Edit' : 'Add'} Education`}
                isButtonNotRequired={true}
              />
              <IconButton
                size="small"
                disableRipple
                onClick={() => {
                  setEducationInfoInitialValues(INITIAL_FORM_STATE);
                  resetForm();
                  setEducationEdit('1');
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
                      <Grid item xs={12}>
                        <HandleInputChangeAutocomplete
                          otherProps={otherPropsRequired}
                          options={university}
                          handleInputChange={handleInputChangeUniversityName}
                          textLabelStyle={textLabel}
                          name="institution"
                          label="School/Institution"
                          placeHolder="Select a School/Institution"
                          value={values.institution}
                          onChange={(e, value) => {
                            setFieldValue('institution', value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <HandleInputChangeAutocomplete
                          otherProps={otherPropsRequired}
                          options={degree2}
                          handleInputChange={handleInputChangeDegreeName}
                          textLabelStyle={textLabel}
                          name="degreename"
                          label="Degree"
                          placeHolder="Select a Degree"
                          value={values.degreename}
                          onChange={(e, value) => {
                            setFieldValue('degreename', value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <HandleInputChangeAutocomplete
                          otherProps={otherPropsNotRequired}
                          options={fieldofstudy}
                          handleInputChange={handleInputChangeFiledOfStudy}
                          textLabelStyle={textLabel}
                          name="fieldofstudy"
                          label="Field of Study"
                          placeHolder="Select a  Field of Study"
                          value={values.fieldofstudy}
                          onChange={(e, value) => {
                            setFieldValue('fieldofstudy', value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} sx={{ maxWidth: '250px' }}>
                        <Stack spacing={1} sx={{ maxWidth: '300px' }}>
                          <MuiDateTimePicker
                            formatValue="month"
                            readOnly={readOnly}
                            textLabelStyle={textLabel}
                            name="startDate"
                            textLabel="Start Year"
                            required
                            otherProps={otherPropsNotRequired}
                          />
                          <CheckboxWrapper
                            name="isStillPerceiving"
                            legend="To"
                            label="I am still Pursuing"
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
                            onChangeValues={(e, value) => {
                              setFieldValue(
                                'isStillPerceiving',
                                e.target.checked
                              );
                              setFieldValue('endDate', '');
                            }}
                          />
                          {!values.isStillPerceiving && (
                            <MuiDateTimePicker
                              formatValue="month"
                              readOnly={readOnly}
                              textLabelStyle={textLabel}
                              name="endDate"
                              textLabel="Passed Out Year"
                              otherProps={
                                values.isStillPerceiving
                                  ? otherPropsNotRequired
                                  : otherPropsRequired
                              }
                            />
                          )}
                        </Stack>
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
                          deleteEducation({ resetForm });
                        }}
                      >
                        Delete
                      </SubmissionButton>
                    )}
                    <SubmissionButton onClick={handleSubmit}>
                      {`${isEditing ? 'Update' : 'Add'} Education`}
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

export default EducationForm;
