import MainCard from '@/cardComponents/MainCard';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillTypes } from '@/src/data/DropDownValues';
import { GeneratedMasterURLs } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import {
  nameValidationwithNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
} from '@mui/material';
import config from 'config';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const skillApi = new SkillApi();

const Skill_Form = () => {
  const router = useRouter();
  console.log('router', router);
  const { guId } = router.query;
  const dispatch = useDispatch();

  const { setLoading } = useContext(LoadingContext);
  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    type: '',
    submit: null,
  });

  const SubmitDetails = async p => {
    try {
      setLoading(true);

      if (router.query.guId) {
        const editData = {
          id: p.id,
          uniqueGuid: p.uniqueGuid,
          name: p.name,
          type: p.type,
          isTechnical: p.type === 'OperationalSkill' ? true : false,
        };
        await updateSkill(editData);
      } else if (!router.query.guId) {
        const addData = {
          name: p.name,
          type: p.type,
          isTechnical: p.type === 'OperationalSkill' ? true : false,
        };

        await createSkill(addData);
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

  async function createSkill(m) {
    setLoading(true);
    const opts = {};
    const skill = {
      name: m.name,
      type: m.type,
      isTechnical: m.isTechnical,
    };
    opts.body = skill;
    try {
      const response = await skillApi.apiSkillPost(opts);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Skill added successfully',
            type: 'success',
            duration: 3000,
          })
        );
        router.replace(`${config.masterRoutes.skill}`);
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
      console.error('Error creating Skill :', error);
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

  async function updateSkill(n) {
    setLoading(true);
    const opts = {};
    const skill = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      type: n.type,
      isTechnical: n.type === 'OperationalSkill' ? true : false,
    };
    opts.body = skill;
    try {
      const response = await skillApi.apiSkillPut(opts);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Skill updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        router.replace(`${config.masterRoutes.skill}`);
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
      console.error('Error creating Skill :', error);
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

  const EditData = useCallback(
    async guId => {
      setLoading(true);
      try {
        const response = await skillApi.apiSkillGetByGuidGuidGet(guId);
        if (response?.body?.result) {
          setInitialState(response.body.result);
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
          router.replace(`${config.masterRoutes.skill}`);
        }
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false in the finally block to ensure it is always executed
        setLoading(false);
      }
    },
    [dispatch, router, setLoading, skillApi]
  );

  useEffect(() => {
    if (guId) EditData(guId);
  }, [guId, EditData]);

  return (
    <div>
      <MainCard sx={{ minHeight: '80vh' }} title={'Add Skill'}>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={yup.object().shape({
            name: nameValidationwithNoRegex('Skill ', true),
            type: staticDropDownValidation('Skill Type', true, skillTypes),
          })}
          onSubmit={(values, { resetForm }) =>
            SubmitDetails(values, { resetForm })
          }
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogContent>
                {initialState && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextfieldWrapper
                        name="name"
                        textLabelStyle={textLabel}
                        textLabel="Skill Name"
                        otherProps={otherPropsRequired}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SelectWrapper
                        name="type"
                        textLabel="Skill Type"
                        textLabelStyle={textLabel}
                        options={skillTypes}
                        placeholder="Select Skill type"
                        inputProps={otherPropsRequired}
                      />
                    </Grid>
                  </Grid>
                )}
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </DialogContent>
              {initialState && (
                <DialogActions>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`${GeneratedMasterURLs.skill.list}`)
                    }
                  >
                    Cancel
                  </Button>
                  {router.query.guId && (
                    <Button variant="contained" onClick={handleSubmit}>
                      Edit
                    </Button>
                  )}
                  {!router.query.guId && (
                    <Button variant="contained" onClick={handleSubmit}>
                      Add
                    </Button>
                  )}
                </DialogActions>
              )}
            </form>
          )}
        </Formik>
      </MainCard>
    </div>
  );
};
export default Skill_Form;
