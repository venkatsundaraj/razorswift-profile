import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import FormCard from '@/cardComponents/FormCard';
import CheckboxWrapper from '@/formComponents/FormsUI/Checkbox';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import RadioGroupWrapper2 from '@/formComponents/FormsUI/RadioGroup2';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import {
  GridComponent,
  jobProfileTypes,
} from '@/pageComponents/Profile/Common/Properties/Properties';
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
  CandidateEmployerApi,
  CompanyApi,
  JobTitleApi,
} from '@/swagger_api/api/DegreeAliasApi';
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
  alphabetsValidationSchemaLong,
} from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  companyId: '',
  jobTitleId: '',
  jobProfileType: 1,
  startDate: '',
  endDate: '',
  isCurrentEmployer: true,
  jobDescription: '',
};
const FORM_VALIDATION = Yup.object().shape({
  jobDescription: alphabetsValidationSchemaLong('Jobs', true),
  jobTitleId: addifnotexistdropdownValidationSchema('Job Title', 1, 100, true),
  companyId: addifnotexistdropdownValidationSchema('Company', 1, 255, true),
  isCurrentEmployer: Yup.boolean(),
  jobProfileType: Yup.string().nullable().required('Job Type is required'),
  endDate: Yup.date()
    .nullable()
    .when('isCurrentEmployer', {
      is: false,
      then: Yup.date()
        .nullable()
        .required('To is required')
        .max(
          getFirstDayOfCurrentMonth(),
          'To should be before or equal to current month'
        )
        .when('startDate', {
          is: startDate => startDate,
          then: Yup.date()
            .nullable()
            .min(Yup.ref('startDate'), 'To should be greater than From'),
        }),
      otherwise: Yup.date()
        .nullable()
        .max(
          getFirstDayOfCurrentMonth(),
          'To should be before or equal to month'
        ),
    }),
  startDate: Yup.date()
    .nullable()
    .max(Yup.ref('endDate'), 'From should be before To')
    .max(
      getFirstDayOfCurrentMonth(),
      'From should be before or equal to current month'
    )
    .required('From is required'),
});

const Companies = ({
  edit,
  getData,
  companyInfo,
  setCompanyInfo,
  companyInfoEdit,
  setCompanyInfoEdit,
  companyEdit,
  setCompanyEdit,
  sectionRef,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [readOnly, setReadOnly] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [companyInfoInitialValues, setCompanyInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const [jobTitleValues, SetJobTitleValues] = useState([]);
  const [companyValues, SetCompanyValues] = useState([]);
  const isAddingViewing = getFormTypes('Add_View') === companyEdit;
  const isEditing = getFormTypes('Edit_Form') === companyEdit;
  const isAdding = getFormTypes('Add_Form') === companyEdit;

  const candidateEmployerApi = useMemo(() => new CandidateEmployerApi(), []);
  const companyApi = useMemo(() => new CompanyApi(), []);
  const jobTitleApi = useMemo(() => new JobTitleApi(), []);
  useEffect(() => {
    if (companyEdit === '3' && Object.keys(companyInfoEdit).length != 0) {
      const k = {
        ...companyInfoEdit,
        jobTitleId: {
          title: companyInfoEdit?.jobTitle?.name,
          year: companyInfoEdit?.jobTitle?.id,
        },
        companyId: {
          title: companyInfoEdit?.company?.name,
          year: companyInfoEdit?.company?.id,
        },
        startDate: companyInfoEdit?.startDate,
        endDate: companyInfoEdit?.endDate,
        isCurrentEmployer:
          companyInfoEdit.isCurrentEmployer === '' ||
          companyInfoEdit.isCurrentEmployer === null
            ? false
            : companyInfoEdit.isCurrentEmployer,
        jobDescription:
          companyInfoEdit.jobDescription === '' ||
          companyInfoEdit.jobDescription === null
            ? ''
            : companyInfoEdit.jobDescription,
      };
      setCompanyInfoInitialValues(k);
    }
  }, [edit, companyInfoEdit, companyEdit]);

  const handleInputChangeCompanyName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await companyApi.apiCompanyGetAllByNameGet(opts);
        console.log(response);
        const trim = getDropDownValues(response.body.result);
        SetCompanyValues(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [companyApi.apiCompanyGetAllByNameGet, SetCompanyValues]
  );
  const handleInputChangeJobTitleName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await jobTitleApi.apiJobTitleGetAllByNameGet(opts);
        console.log(response);
        const trim = getDropDownValues(response.body.result);
        SetJobTitleValues(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [jobTitleApi.apiJobTitleGetAllByNameGet, SetJobTitleValues]
  );
  const handleInputChanges = useCallback(
    inputValue => {
      handleInputChangeCompanyName(inputValue);
      handleInputChangeJobTitleName(inputValue);
    },
    [handleInputChangeCompanyName, handleInputChangeJobTitleName]
  );
  useEffect(() => {
    handleInputChanges('');
  }, [handleInputChanges]);

  const addCompanies = async (values, { resetForm }) => {
    let companiesData = {};
    if (values.companyId.inputValue) {
      companiesData = {
        ...companiesData,
        companyName: values.companyId.inputValue,
      };
    } else {
      companiesData = {
        ...companiesData,
        companyId: values.companyId.year,
      };
    }
    if (values.jobTitleId.inputValue) {
      companiesData = {
        ...companiesData,
        jobTitleName: values.jobTitleId.inputValue,
      };
    } else {
      companiesData = {
        ...companiesData,
        jobTitleId: values.jobTitleId.year,
      };
    }
    if (!values.jobTitleId.inputValue && !values.companyId.inputValue) {
      companiesData = {
        ...companiesData,
        companyId: values.companyId.year,
        jobTitleId: values.jobTitleId.year,
      };
    }

    const data = {
      ...companiesData,
      jobDescription: values?.jobDescription,
      candidateId: userDetails?.candidateId,
      jobProfileType: parseInt(values?.jobProfileType),
      isCurrentEmployer: values?.isCurrentEmployer,
      startDate: values.startDate === '' ? null : values.startDate,
      endDate: !values?.isCurrentEmployer ? values?.endDate : null,
    };

    var opts = {};
    const string_null = reverseCheckAndSet(data);
    opts.body = string_null;

    setLoading(true);

    setLoading(false);

    try {
      const response = await candidateEmployerApi.apiCandidateEmployerPost(
        opts
      );
      setLoading(false);
      if (response.body.result) {
        handleInputChanges('');
        dispatch(
          setAlertPopup({
            message: 'Company added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        resetForm();
        setCompanyInfoInitialValues(INITIAL_FORM_STATE);
        setCompanyEdit('1');
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
  const editCompanies = async (values, { resetForm }) => {
    console.log(values);
    let companiesData = {};
    if (values.companyId.inputValue) {
      companiesData = {
        ...companiesData,
        companyName: values.companyId.inputValue,
      };
    } else {
      companiesData = {
        ...companiesData,
        companyId: values.companyId.year,
      };
    }
    if (values.jobTitleId.inputValue) {
      companiesData = {
        ...companiesData,
        jobTitleName: values.jobTitleId.inputValue,
      };
    } else {
      companiesData = {
        ...companiesData,
        jobTitleId: values.jobTitleId.year,
      };
    }
    if (!values.jobTitleId.inputValue && !values.companyId.inputValue) {
      companiesData = {
        ...companiesData,
        companyId: values.companyId.year,
        jobTitleId: values.jobTitleId.year,
      };
    }

    var opts = {};
    const data = {
      ...companiesData,
      id: values?.id,
      candidateId: userDetails?.candidateId,
      jobProfileType: parseInt(values?.jobProfileType),
      jobDescription: values?.jobDescription,
      isCurrentEmployer: values?.isCurrentEmployer,
      startDate: values.startDate === '' ? null : values.startDate,
      endDate: !values?.isCurrentEmployer ? values?.endDate : null,
    };
    const string_null = reverseCheckAndSet(data);
    opts.body = string_null;

    setLoading(true);
    setCompanyEdit('1');

    try {
      const response =
        await candidateEmployerApi.apiCandidateEmployerUpdateEmployerDetailsPut(
          opts
        );
      setLoading(false);
      if (response.body.result) {
        handleInputChanges('');
        dispatch(
          setAlertPopup({
            message: 'Company updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setCompanyEdit('1');
        getData();
        resetForm();
        setCompanyInfoInitialValues(INITIAL_FORM_STATE);
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
  const deleteCompanies = async id => {
    setLoading(true);
    const confirmDelete = async () => {
      try {
        const response =
          await candidateEmployerApi.apiCandidateEmployerIdDelete(id);
        setLoading(false);

        if (response.body.result) {
          handleInputChanges('');
          dispatch(
            setAlertPopup({
              message: 'Company deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          setCompanyEdit('1');
          getData();
          setCompanyInfoInitialValues(INITIAL_FORM_STATE);
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
      'You want to delete this Company!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <Stack spacing={2}>
      {isAddingViewing && (
        <ShadowButtonSubmit
          height="40px"
          width="100%"
          minwidth="200px"
          maxwidth="200px"
          backgroundcolor="#A62973"
          variant="contained"
          onClick={() => {
            setCompanyInfoInitialValues({
              ...INITIAL_FORM_STATE,
            });
            setCompanyEdit('2');
          }}
        >
          Add New Company
        </ShadowButtonSubmit>
      )}
      {isAdding || isEditing ? (
        <Stack direction="row" justifyContent="space-between">
          <FormHeaderComponents
            title={`${isEditing ? 'Edit' : 'Add'} Company`}
            isButtonNotRequired={true}
          />
          <IconButton
            size="small"
            disableRipple
            onClick={() => {
              setCompanyInfoInitialValues({
                ...INITIAL_FORM_STATE,
              });
              setCompanyEdit('1');
            }}
          >
            <ClearIcon color="primary" />
          </IconButton>
        </Stack>
      ) : null}

      {isAdding || isEditing ? (
        <Formik
          enableReinitialize
          initialValues={{
            ...companyInfoInitialValues,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => {
            if (companyEdit === '3') {
              editCompanies(values, { resetForm });
            } else if (companyEdit === '2') {
              addCompanies(values, { resetForm });
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={2} ref={sectionRef}>
                <FormCard>
                  <Stack spacing={0}>
                    <GridComponent>
                      <Grid item xs={12} sm={6}>
                        <HandleInputChangeAutocomplete
                          otherProps={otherPropsRequired}
                          options={companyValues}
                          handleInputChange={handleInputChangeCompanyName}
                          name="companyId"
                          textLabelStyle={textLabel}
                          label="Company"
                          placeHolder="Select a Company"
                          value={values.companyId}
                          onChange={(e, value) => {
                            setFieldValue('companyId', value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <HandleInputChangeAutocomplete
                          otherProps={otherPropsRequired}
                          options={jobTitleValues}
                          handleInputChange={handleInputChangeJobTitleName}
                          name="jobTitleId"
                          textLabelStyle={textLabel}
                          label="Job Title"
                          placeHolder="Select a Job Title"
                          value={values.jobTitleId}
                          onChange={(e, value) => {
                            setFieldValue('jobTitleId', value);
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
                            textLabel="From"
                            required
                            otherProps={otherPropsRequired}
                          />
                          {/* <Typography>To</Typography> */}
                          <CheckboxWrapper
                            name="isCurrentEmployer"
                            legend="To"
                            label="I currently work here"
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
                                'isCurrentEmployer',
                                e.target.checked
                              );
                              setFieldValue('endDate', '');
                            }}
                          />
                          {!values.isCurrentEmployer && (
                            <MuiDateTimePicker
                              formatValue="month"
                              readOnly={readOnly}
                              textLabelStyle={textLabel}
                              name="endDate"
                              textLabel="To"
                              otherProps={otherPropsRequired}
                            />
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <RadioGroupWrapper2
                          rowDirection={true}
                          textLabelStyle={textLabel}
                          name="jobProfileType"
                          textLabel="Job Type"
                          options={jobProfileTypes}
                          placeholder="Select Job Title"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextfieldWrapper
                          multiline
                          rows={3}
                          readOnly={readOnly}
                          name="jobDescription"
                          textLabelStyle={textLabel}
                          textLabel="Job Description"
                          otherProps={otherPropsNotRequired}
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
                          deleteCompanies(values.id);
                        }}
                      >
                        Delete
                      </SubmissionButton>
                    )}
                    <SubmissionButton onClick={handleSubmit}>
                      {`${isEditing ? 'Update' : 'Add'} Company`}
                    </SubmissionButton>
                  </Stack>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      ) : null}
    </Stack>
  );
};

export default Companies;
