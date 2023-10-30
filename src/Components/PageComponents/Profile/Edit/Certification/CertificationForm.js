import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import FormCard from '@/cardComponents/FormCard';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import Textfield from '@/formComponents/FormsUI/Textfield';
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
  CandidateCertificateApi,
  CertificateApi,
} from '@/swagger_api/api/CandidateCertificateApi';
import { getFirstDayOfCurrentMonth } from '@/utils/CommonFunctions/DateRelatedFunction';
import { getDropDownValues } from '@/utils/CommonFunctions/DropdownValuesGetFunctions';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { handleErrors } from '@/utils/CommonFunctions/ErrorFunctions';
import {
  debounce,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { urlRegExp } from '@/utils/regex';
import { addifnotexistdropdownValidationSchema } from '@/utils/validationSchema';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  title: '',
  startDate: null,
  endDate: null,
  authority: null,
  certificationUrl: '',
  certificateId: 0,
};
const FORM_VALIDATION = Yup.object().shape({
  title: addifnotexistdropdownValidationSchema('Title', 1, 255, true),
  authority: addifnotexistdropdownValidationSchema(
    'Issuing Organization',
    1,
    255,
    true
  ),
  endDate: Yup.date()
    .nullable()
    .when('startDate', {
      is: startDate => startDate,
      then: Yup.date()
        .nullable()
        .min(
          Yup.ref('startDate'),
          'Expiration Date should be greater than Issue Date'
        ),
    }),
  startDate: Yup.date()
    .nullable()
    .max(
      getFirstDayOfCurrentMonth(),
      'Issue Date should be before or equal to current month'
    ),
  certificationUrl: Yup.string().nullable().trim().matches(urlRegExp, {
    message: 'Please provide a valid URL',
    excludeEmptyString: true,
  }),
});

const CertificationForm = ({
  edit,
  certificationInfo,
  setCertificationInfo,
  certificationInfoEdit,
  setCertificationInfoEdit,
  certificationEdit,
  setCertificationEdit,
  getData,
  sectionRef,
}) => {
  const dispatch = useDispatch();

  const { loading, setLoading } = useContext(LoadingContext);
  const [readOnly, setReadOnly] = useState(false);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [certificationInfoInitialValues, setCertificationInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const isAddingViewing = getFormTypes('Add_View') === certificationEdit;
  const isEditing = getFormTypes('Edit_Form') === certificationEdit;
  const isAdding = getFormTypes('Add_Form') === certificationEdit;
  const [titles, setTitles] = useState([]);
  const [authorities, setAuthorities] = useState([]);

  const candidateCertificateApi = useMemo(
    () => new CandidateCertificateApi(),
    []
  );
  const certificationApi = useMemo(() => new CertificateApi(), []);

  useEffect(() => {
    if (
      certificationEdit === '3' &&
      Object.keys(certificationInfoEdit).length != 0
    ) {
      setCertificationInfoInitialValues({ ...INITIAL_FORM_STATE });
      console.log('certificationInfoEdit', certificationInfoEdit);
      const k = {
        startDate:
          certificationInfoEdit?.startDate === null
            ? ''
            : certificationInfoEdit?.startDate,
        endDate:
          certificationInfoEdit?.endDate === null
            ? ''
            : certificationInfoEdit?.endDate,
        certificationUrl:
          certificationInfoEdit?.certificationUrl === null
            ? ''
            : certificationInfoEdit?.certificationUrl,
        candidateId: certificationInfoEdit?.candidateId,
        id: certificationInfoEdit?.id,
      };

      if (certificationInfoEdit.certificateId) {
        k.title = {
          year: certificationInfoEdit?.certificateId,
          title: certificationInfoEdit?.title,
        };
      } else {
        k.title = '';
      }

      if (certificationInfoEdit.authority) {
        k.authority = {
          year: certificationInfoEdit?.authority,
          title: certificationInfoEdit?.authority,
        };
      } else {
        k.authority = '';
      }
      setCertificationInfoInitialValues(k);
    }
  }, [edit, certificationInfoEdit, certificationEdit]);

  const handleInputChangeTitle = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await certificationApi.apiCertificateGetAllByNameGet(
          opts
        );

        const trim = getDropDownValues(response.body.result);
        setTitles(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    []
  );

  const handleInputChangeAuthority = useCallback(
    debounce(async (event, newValue) => {
      let opts = {};
      opts = {
        authoritynName: newValue || '',
      };
      await candidateCertificateApi
        .apiCandidateCertificateGetAllByAuthorityNameGet(opts)
        .then(async response => {
          if (response.body.result) {
            console.log('ressss', response);
            const trim = response?.body?.result?.map((res, index) => ({
              title: res,
              year: res,
            }));
            setAuthorities(trim);
          } else {
            setAuthorities([]);
          }
        })
        .catch(handleErrors);
    }, 300),
    []
  );
  const handleInputChanges = useCallback(
    inputValue => {
      handleInputChangeTitle(inputValue);
      handleInputChangeAuthority(inputValue);
    },
    [handleInputChangeTitle, handleInputChangeAuthority]
  );

  useEffect(() => {
    handleInputChanges('');
  }, [handleInputChanges]);

  const addCertification = async (values, { resetForm }) => {
    // const candidateCertificateApi = new CandidateCertificateApi();

    var obj = {
      ...values,
      certificateId: values.title?.year,
      certificationUrl: values?.certificationUrl,
      title: values?.title?.inputValue
        ? values?.title?.inputValue
        : values?.title?.title,
      authority: values?.authority?.inputValue
        ? values?.authority?.inputValue
        : values?.authority?.title,
      candidateId: userDetails?.candidateId,
      startDate: values.startDate === '' ? null : values.startDate,
      endDate: values.endDate === '' ? null : values.endDate,
    };

    var keysToDelete = [];
    if (values.title.inputValue == undefined) {
      // keysToDelete.push(...['title']);
    } else {
      keysToDelete.push(...['certificateId']);
    }
    console.log('dd', keysToDelete);

    function removeKeys(obj, keysToRemove) {
      const newObj = {};
      for (const key in obj) {
        if (!keysToRemove.includes(key)) {
          if (key === 'candidateAddress' && obj[key] === null) {
            continue; // skip this key and move on to the next iteration
          }
          newObj[key] = obj[key];
        }
      }
      return newObj;
    }
    const myObj = obj;
    const keysToRemove = keysToDelete;
    const newObj = removeKeys(myObj, keysToRemove);
    console.log(newObj);
    const empty_null = reverseCheckAndSet(newObj);
    var opts = {};
    opts.body = { ...empty_null };
    console.log('opts', opts);
    setLoading(true);

    try {
      const response =
        await candidateCertificateApi.apiCandidateCertificatePost(opts);
      setLoading(false);
      if (response.body.result) {
        handleInputChanges('');
        setCertificationInfoInitialValues(INITIAL_FORM_STATE);
        dispatch(
          setAlertPopup({
            message: 'Certificate added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setCertificationEdit('1');
        getData();
        resetForm();
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
  const editCertification = async (values, { resetForm }) => {
    //const candidateCertificateApi = new CandidateCertificateApi();
    console.log('values', values);
    var obj = {
      ...values,
      certificateId: values.title?.year,
      certificationUrl: values?.certificationUrl,
      title: values?.title?.inputValue
        ? values?.title?.inputValue
        : values?.title?.title,
      authority: values?.authority?.inputValue
        ? values?.authority?.inputValue
        : values?.authority?.title,
      candidateId: userDetails?.candidateId,
      startDate: values.startDate === '' ? null : values.startDate,
      endDate: values.endDate === '' ? null : values.endDate,
    };
    console.log('obj'.obj);

    var keysToDelete = [];

    if (values.title.inputValue == undefined) {
      // keysToDelete.push(...['title']);
    } else {
      keysToDelete.push(...['certificateId']);
    }
    console.log('dd', keysToDelete);

    function removeKeys(obj, keysToRemove) {
      const newObj = {};
      for (const key in obj) {
        if (!keysToRemove.includes(key)) {
          if (key === 'candidateAddress' && obj[key] === null) {
            continue; // skip this key and move on to the next iteration
          }
          newObj[key] = obj[key];
        }
      }
      return newObj;
    }
    const myObj = obj;
    const keysToRemove = keysToDelete;
    const newObj = removeKeys(myObj, keysToRemove);
    console.log(newObj);
    const empty_null = reverseCheckAndSet(newObj);
    var opts = {};
    opts.body = { ...empty_null };
    console.log('edit values', opts);
    setLoading(true);
    try {
      const response = await candidateCertificateApi.apiCandidateCertificatePut(
        opts
      );
      setLoading(false);
      if (response.body.result) {
        handleInputChanges('');
        setCertificationInfoInitialValues(INITIAL_FORM_STATE);
        resetForm();
        dispatch(
          setAlertPopup({
            message: 'Certificate updated successfully',
            type: 'success',
            duration: 3000,
          })
        );

        setCertificationEdit('1');
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
  const deleteCertification = async ({ resetForm }) => {
    setLoading(true);

    const confirmDelete = async () => {
      try {
        const response =
          await candidateCertificateApi.apiCandidateCertificateIdDelete(
            certificationInfoEdit.id
          );
        setLoading(false);

        if (response.body.result) {
          handleInputChanges('');
          resetForm();
          setCertificationInfoInitialValues(INITIAL_FORM_STATE);
          dispatch(
            setAlertPopup({
              message: 'Certificate deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          setCertificationEdit('1');
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
      'You want to delete this Certificate!',
      confirmDelete,
      revertDelete
    );
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...certificationInfoInitialValues,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        if (certificationEdit === '3') {
          editCertification(values, { resetForm });
        } else if (certificationEdit === '2') {
          addCertification(values, { resetForm });
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
                setCertificationInfoInitialValues({
                  ...INITIAL_FORM_STATE,
                });
                setCertificationEdit('2');
              }}
            >
              Add New Certificate
            </ShadowButtonSubmit>
          )}
          {isAdding || isEditing ? (
            <Stack direction="row" justifyContent="space-between">
              <FormHeaderComponents
                title={`${isEditing ? 'Edit' : 'Add'} Certificate`}
                isButtonNotRequired={true}
              />
              <IconButton
                size="small"
                disableRipple
                onClick={() => {
                  resetForm();
                  setCertificationInfoInitialValues({
                    ...INITIAL_FORM_STATE,
                  });
                  setCertificationEdit('1');
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
                          options={titles}
                          handleInputChange={handleInputChangeTitle}
                          textLabelStyle={textLabel}
                          name="title"
                          label="Title"
                          placeHolder="Ex:Microsoft certified network associate security"
                          value={values.title}
                          onChange={(e, value) => {
                            setFieldValue('title', value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <HandleInputChangeAutocomplete
                          otherProps={otherPropsRequired}
                          options={authorities}
                          handleInputChange={handleInputChangeAuthority}
                          touched={touched}
                          errors={errors}
                          name="authority"
                          textLabelStyle={textLabel}
                          label="Issuing Organization"
                          placeHolder="Ex: Microsoft"
                          value={values.authority}
                          onChange={(e, value) => {
                            setFieldValue('authority', value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield
                          textLabelStyle={textLabel}
                          name="certificationUrl"
                          textLabel="Certificate URL"
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} alignSelf="flex-start">
                        <MuiDateTimePicker
                          formatValue="month"
                          readOnly={readOnly}
                          textLabelStyle={textLabel}
                          name="startDate"
                          textLabel="Issue Date"
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} alignSelf="flex-start">
                        <MuiDateTimePicker
                          formatValue="month"
                          readOnly={readOnly}
                          textLabelStyle={textLabel}
                          name="endDate"
                          textLabel="Expiration Date"
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
                          deleteCertification({ resetForm });
                        }}
                      >
                        Delete
                      </SubmissionButton>
                    )}
                    <SubmissionButton onClick={handleSubmit}>
                      {`${isEditing ? 'Update' : 'Add'} Certificate`}
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

export default CertificationForm;
