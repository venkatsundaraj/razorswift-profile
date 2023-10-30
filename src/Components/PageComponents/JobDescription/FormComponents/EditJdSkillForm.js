import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherPropsNotRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { JdSoftSkillApi, SkillApi } from '@/swagger_api/api/SkillApi';
import { Grid, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MyFormContext } from './JdStepper';

function hasDuplicates(values) {
  const titleSet = new Set();

  for (const softSkillEntry of values.softSkill) {
    titleSet.add(softSkillEntry.name);
  }

  for (const traitEntry of values.traits) {
    if (titleSet.has(traitEntry.name)) {
      return true; // Found a duplicate
    }
  }

  return false; // No duplicates found
}

const validationSchema = Yup.object().shape({
  softSkill: Yup.array(),
});

const initialValues = {
  softSkill: [],
};

const EditJdSkillForm = () => {
  const { stepOneData, EditData, GetJdById } = useContext(MyFormContext);
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadingContext);
  const [skill, setSkill] = useState([]);

  const [softSkillsInitialValues, setSoftSkillsInitialValues] =
    useState(initialValues);
  const jdSoftSkillApi = useMemo(() => new JdSoftSkillApi(), []);
  const skillApi = useMemo(() => new SkillApi(), []);

  const GetSoftSkillName = useCallback(async () => {
    try {
      const opts = { skillType: 2 };
      const response = await skillApi.apiSkillGetAllByFilterGet(opts);
      if (response.body.result) {
        const trim = response.body.result.map(res => ({
          year: res.id,
          title: res.name,
        }));
        setSkill(trim);
      }
    } catch (error) {
      console.error(error);
    }
  }, [skillApi, setSkill]);

  useEffect(() => {
    GetSoftSkillName();
    const trim = stepOneData?.jdSoftSkills?.map(res => ({
      year: res?.skillId,
      title: res?.name,
    }));
    console.log('softSkill values', trim);
    setSoftSkillsInitialValues({ softSkill: trim });
  }, [stepOneData, GetSoftSkillName]);

  const UpdateNonTechnicalSkill = async (values, { resetForm }) => {
    setLoading(true);
    const skillId = values.softSkill?.map((res, index) => ({
      skillId: res?.year,
      name: res?.title,
    }));
    const opts = {
      body: skillId,
    };

    const fullObject = {
      softSkill: skillId,
      traits: stepOneData?.jdTraits?.map(res => ({
        id: res?.id,
        weight: res?.weight,
        name: res?.name,
      })),
    };

    console.log(fullObject);
    console.log(hasDuplicates(fullObject));

    let hasDuplicateSofSkills = hasDuplicates(fullObject);

    if (hasDuplicateSofSkills) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message:
            'Duplicate Entry found kindly crosscheck in Soft Skills and Other Soft Skills cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      try {
        const response =
          await jdSoftSkillApi.apiJdSoftSkillJobDescriptionIdPost(
            stepOneData?.id,
            opts
          );
        setLoading(false);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Soft Skill updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);

          GetJdById(stepOneData?.id);
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
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={softSkillsInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          UpdateNonTechnicalSkill(values, { resetForm });
        }}
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
          <Form>
            <Grid container spacing={2} id="section-1">
              <Grid item xs={12}>
                <GetValuesAutocomplete
                  multiple={true}
                  otherProps={otherPropsNotRequired}
                  options={skill}
                  textLabelStyle={textLabel}
                  name="softSkill"
                  label="Soft Skills"
                  placeHolder="Select Soft Skills"
                  value={values.softSkill}
                  onChange={(e, value) => {
                    setFieldValue('softSkill', value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <SubmissionButton type="submit" onClick={handleSubmit}>
                    Submit
                  </SubmissionButton>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditJdSkillForm;
