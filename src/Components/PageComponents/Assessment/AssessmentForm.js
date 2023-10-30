import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { CandidateSkillApi } from '@/swagger_api/*';
import { convertToSentenceCase } from '@/utils/CommonFunctions/StringConversion';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { Grid, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const AssessmentForm = ({ setType }) => {
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState([]);
  const [skillAliases, setAliases] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const candidateSkillApi = useMemo(() => new CandidateSkillApi(), []);

  const INITIAL_FORM_STATE = {
    skill_platform_id: '',
    // skill_level: '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    skill_platform_id: Yup.mixed().required('Skill Platform is required'),
    // skill_level: Yup.string().required('Skill level is required'),
  });

  const GetSkillAlias = useCallback(async () => {
    try {
      const response =
        await candidateSkillApi.apiCandidateSkillGetAllCandidateSkillPlatformCandidateIdGet(
          userDetails?.candidateId
        );
      const trim =
        response?.body?.result?.map((res, index) => ({
          id: res?.id,
          title: res?.name,
          level: res?.skillLevel,
        })) || [];
      setAliases(trim);
      if (trim.length === 0) {
        dispatch(
          setAlertPopup({
            message: 'Kindly add the Skills in the profile',
            type: 'info',
            duration: 3000,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [userDetails?.candidateId, candidateSkillApi]);

  useEffect(() => {
    GetSkillAlias();
  }, [GetSkillAlias]);
  const SubmitDetails = async (values, { resetForm }) => {
    console.log('sub', values);
    setLoading(true);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {
        cid: userDetails?.candidateId,
        email: userDetails?.email,
        c_nm: userDetails?.candidate?.fullName,
        skill_platform_id: values.skill_platform_id.id,
      },
    };

    try {
      const excludedValues = [1, 2, 3];
      if (!excludedValues.includes(values.skill_platform_id.level)) {
        // Condition is true, do something
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Kindly update the Skill Level in the profile',
            type: 'info',
            duration: 3000,
          })
        );
      } else {
        const response = await callApi('InviteOrRequest', data);

        console.log(response);
        setLoading(false);
        console.log(response, 'response');
        setType('RL');

        if (
          response?.data?.message ===
          'You are only allowed to send 3 requests.Please send an email to assessments@razorswift.net if you need to purchase more self assessments '
        ) {
          dispatch(
            setAlertPopup({
              message: convertToSentenceCase(response?.data?.message),
              type: 'warning',
              duration: 3000,
            })
          );
        } else {
          dispatch(
            setAlertPopup({
              message: convertToSentenceCase(response?.data?.message),
              type: 'success',
              duration: 3000,
            })
          );
        }
        resetForm();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
    <Stack spacing={1}>
      <Typography variant="h3" mb={2} align="left">
        Request Self Assessment
      </Typography>

      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
        }
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
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="stretch"
                  style={{ height: '100%' }}
                >
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <GetValuesAutocomplete
                      isNotAdd
                      multiple={false}
                      selectOnFocus
                      clearOnBlur
                      otherProps={otherProps}
                      options={skillAliases}
                      textLabelStyle={textLabel}
                      name="skill_platform_id"
                      label="Skill Platform"
                      placeHolder="Select your Skill Platform"
                      value={values.skill_platform_id}
                      onChange={(e, value, reason) => {
                        console.log(reason, 'kkk', value, e.target);
                        if (reason === 'selectOption')
                          setFieldValue('skill_platform_id', value);
                        else if (reason === 'clear')
                          setFieldValue('skill_platform_id', '');
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* ...Other Grid items... */}

              <Grid item xs={12} md={6}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: '100%' }}
                >
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <SubmissionButton onClick={handleSubmit}>
                      Request
                    </SubmissionButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
export default AssessmentForm;
