import MainCard from '@/cardComponents/MainCard';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { SkillPlatformApi } from '@/swagger_api/api/SkillAliasApi';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import {
  debounce,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { nameValidationwithNoRegex } from '@/utils/validationSchema';
import { Box, FormHelperText, Grid, Stack } from '@mui/material';
import config from 'config';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

export default function AddEdit() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { guId, skillId } = router.query;
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const skillApi = useMemo(() => new SkillApi(), []);
  const { setLoading } = useContext(LoadingContext);
  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    skillId: '',
    skill: { name: '' },
    submit: null,
  });
  const [initialData, setInitialData] = useState([]);
  const [skillData, setSkillData] = useState({});

  const SubmitDetails = async p => {
    try {
      setLoading(true);

      if (router.query.guId) {
        const editData = {
          id: p.id,
          uniqueGuid: p.uniqueGuid,
          name: p.name,
          skillId: p.skillId?.year,
        };
        await updateSkillPlatform(reverseCheckAndSet(editData));
      } else if (!router.query.guId) {
        const addData = {
          name: p.name,
          skillId: p.skillId?.year,
        };

        await createSkillPlatform(reverseCheckAndSet(addData));
      }
    } catch (error) {
      console.error('Error submitting details:', error);
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try Again!',
          type: 'error',
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  async function createSkillPlatform(m) {
    const opts = {};
    setLoading(true);
    const skillalias = {
      name: m.name,
      skillId: m.skillId,
    };
    opts.body = skillalias;
    try {
      const response = await skillPlatformApi.apiSkillPlatformPost(opts);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Skill Platform added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        router.replace(`${config.masterRoutes.skillalias}`);
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
      console.error('Error creating Skill Platform:', error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try Again!',
          type: 'error',
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateSkillPlatform(n) {
    setLoading(true);
    const opts = {};
    const skillalias = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      skillId: n.skillId,
    };
    opts.body = skillalias;
    try {
      const response = await skillPlatformApi.apiSkillPlatformPut(opts);
      console.log('put', response);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Skill Platform updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        if (skillId) {
          router.replace({
            pathname: `${config.masterRoutes.skill}/view`,
            query: { guId: skillId },
          });
        } else router.replace(`${config.masterRoutes.skillalias}`);
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
      console.error('Error updating Skill Platform:', error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try Again!',
          type: 'error',
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  }

  const handleInputChangeDegreeName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
        skillType: 1,
      };

      try {
        const response = await skillApi.apiSkillGetAllByFilterGet(opts);
        console.log(response);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setInitialData(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillApi.apiDegreeGetAllByNameGet, setInitialData]
  );
  useEffect(() => {
    handleInputChangeDegreeName('');
  }, [handleInputChangeDegreeName]);

  const EditData = useCallback(
    async guId => {
      setLoading(true);
      try {
        const response =
          await skillPlatformApi.apiSkillPlatformGetByGuidGuidGet(guId);
        console.log('get', response);
        if (response?.body?.result) {
          console.log(response.body.result);
          const result = response.body.result;
          const obj = {
            ...response.body.result,
            skillId: {
              title: result?.skill?.name,
              year: result?.skill?.id,
            },
          };
          console.log(obj, 'obj');
          setInitialState(obj);
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
          router.replace(`${config.masterRoutes.skillalias}`);
        }
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false in the finally block to ensure it is always executed
        setLoading(false);
      }
    },
    [dispatch, router, setLoading, skillPlatformApi]
  );

  useEffect(() => {
    if (guId) EditData(guId);
  }, [guId, EditData]);

  const SkillData = useCallback(
    async skillId => {
      setLoading(true);
      try {
        const response = await skillApi.apiSkillGetByGuidGuidGet(skillId);
        console.log('get', response);
        if (response?.body?.result) {
          const result = response?.body?.result;
          const skillId = {
            title: result?.name,
            year: result?.id,
          };
          setSkillData(response.body.result);
          console.log('guid', skillId);
          setInitialState({ ...initialState, skillId: skillId });
        }
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false in the finally block to ensure it is always executed
        setLoading(false);
      }
    },
    [setLoading, skillApi]
  );
  useEffect(() => {
    if (skillId) {
      SkillData(skillId);
    }

    if (guId && skillId) {
      EditData(guId);
    }
  }, [guId, skillId, SkillData, EditData]);

  return (
    <MainCard
      title={`${guId ? 'Edit' : 'Add'} Skill Platform ${
        skillId ? `for ${skillData.name}` : ''
      }`}
    >
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          // id: yup.string().when('guId', {
          //   is: true,
          //   then: yup.string().required('Skill Platform Id is required'),
          // }),
          // uniqueGuid: yup.string().when('guId', {
          //   is: true,
          //   then: yup.string().required('UniqueGuid is required'),
          // }),
          name: nameValidationwithNoRegex('Skill Platform ', true),
          skillId: yup
            .mixed()
            .required('Please select a Skill from the drop-down '),
        })}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
        }
      >
        {({
          errors,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack sx={{ mb: 4 }}>
              {initialState && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextfieldWrapper
                      name="name"
                      textLabel="Skill Platform"
                      textLabelStyle={textLabel}
                      otherProps={otherPropsRequired}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <HandleInputChangeAutocomplete
                      readOnly={values?.id || (values?.skillId && skillId)}
                      isNotAdd
                      otherProps={otherPropsRequired}
                      options={initialData}
                      handleInputChange={handleInputChangeDegreeName}
                      textLabelStyle={textLabel}
                      name="skillId"
                      label="Skill"
                      placeHolder="Select a Skill"
                      value={values.skillId}
                      onChange={(e, value) => {
                        setFieldValue('skillId', value);
                      }}
                    />
                  </Grid>
                </Grid>
              )}
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </Stack>

            {initialState && (
              <Stack
                justifyContent={'flex-end'}
                alignItems={'flex-end'}
                direction="row"
                spacing={2}
              >
                {
                  <SubmissionButton
                    type="button"
                    onClick={() => {
                      if (skillId) {
                        router.replace({
                          pathname: `${config.masterRoutes.skill}/view`,
                          query: { guId: skillId },
                        });
                      } else
                        router.replace(`${config.masterRoutes.skillalias}`);
                    }}
                  >
                    Cancel
                  </SubmissionButton>
                }
                <SubmissionButton onClick={handleSubmit}>
                  {`${guId ? 'Update' : 'Add'} Skill Platform`}
                </SubmissionButton>
              </Stack>
            )}
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
