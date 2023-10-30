import FormCard from '@/cardComponents/FormCard';
import CkEditorForm from '@/formComponents/FormsUI/CkEditorForm';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import CardEditorView from '@/reUsableComponents/EditorView/CardEditorView';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { CandidateApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { EditorValidationSchema } from '@/utils/validationSchema';
import { Grid, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  about: ``,
};
const FORM_VALIDATION = Yup.object().shape({
  about: EditorValidationSchema('About Me', true),
});

const AboutMe = () => {
  const dispatch = useDispatch();
  const candidateAboutInfo = useMemo(() => new CandidateApi(), []);
  const { data } = useContext(DataContext);
  const [readOnly, setReadOnly] = useState(true);
  const { setLoading } = useContext(LoadingContext);
  const userDetails = localStorageUtil.getItem('userDetails');
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    setInitialValues({
      about: data?.additionalDetails ? data?.additionalDetails?.about : '',
    });
  }, [data]);

  const handleSubmit = async (values, { setFieldValue, resetForm }) => {
    setLoading(true);

    var opts = {};
    opts.body = {
      candidateId: userDetails?.candidateId,
      about: values.about,
    };

    try {
      const response = await candidateAboutInfo.apiCandidateUpdateAboutInfoPost(
        opts
      );
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'About updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setReadOnly(true);
        resetForm();
        setFieldValue('about', response.body.result.about);
        setInitialValues({
          about: response?.body?.result?.about,
        });
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

  return (
    <Stack spacing={2}>
      <FormHeaderComponents
        title="About"
        isButtonNotRequired={!readOnly}
        workingFunction={() => setReadOnly(false)}
      />
      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          handleSubmit(values, { resetForm, setFieldValue });
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
          <Form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormCard>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  alignItems="left"
                >
                  {readOnly && (
                    <Grid item xs={12}>
                      <CardEditorView text={values.about} />
                    </Grid>
                  )}
                  {!readOnly && (
                    <Grid item xs={12}>
                      <CkEditorForm
                        otherProps={otherPropsRequired}
                        name="about"
                        label="About"
                        labelNotRequired
                      />
                    </Grid>
                  )}
                </Grid>
              </FormCard>
              {!readOnly && (
                <Stack direction={'row'} justifyContent="flex-end" spacing={2}>
                  <SubmissionButton
                    onClick={() => {
                      resetForm();
                      setReadOnly(true);
                    }}
                  >
                    Cancel
                  </SubmissionButton>
                  <SubmissionButton onClick={handleSubmit}>
                    Update
                  </SubmissionButton>
                </Stack>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
export default AboutMe;
