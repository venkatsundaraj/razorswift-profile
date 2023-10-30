import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import {
  CandidateSkillApi,
  CompanyApi,
  SkillPlatformApi,
} from '@/swagger_api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  multiLineValidation,
  nameValidationwithNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

// path way
const Option32 = () => {
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState([]);
  const [skillAliases, setAliases] = useState([]);
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const candidateSkillApi = useMemo(() => new CandidateSkillApi(), []);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const companyApi = useMemo(() => new CompanyApi(), []);
  const [skillPlatformList, setSkillPlatformApiList] = useState([]);

  const PathWayTypes = [
    { id: 1, value: 1, name: 'Jobs' },
    { id: 2, value: 2, name: 'Skill' },
    { id: 3, value: 3, name: 'Company' },
  ];

  const INITIAL_FORM_STATE = {
    skill_platform_id: '',
    skill_level: '',
    pathwayType: '',
    title: '',
    description: '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    skill_platform_id: Yup.mixed().required('Skill platform is required'),
    title: nameValidationwithNoRegex('Title', true),
    description: multiLineValidation('Description', true),
    skill_level: staticDropDownValidation('SKill Level', true, skillLevels),
    pathwayType: staticDropDownValidation('Path Way', true, PathWayTypes),
  });
  const SubmitDetails = async (values, { resetForm }) => {
    console.log('sub', values);
  };

  const formik = useFormik({
    initialValues: { ...INITIAL_FORM_STATE },
    validationSchema: FORM_VALIDATION,
    onSubmit: SubmitDetails,
  });

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

        setSkillPlatformApiList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillPlatformApi.apiSkillPlatformGetAllByNameGet, setSkillPlatformApiList]
  );

  useEffect(() => {
    GetSkillAlias();
  }, [GetSkillAlias]);
  useEffect(() => {
    handleInputSkillPlatformName('');
  }, [handleInputSkillPlatformName]);
  return (
    <div>
      <>
        <Typography variant="h3" mb={2} align="left">
          Request new assessment
        </Typography>
      </>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={6} md={6} alignSelf="flex-start">
            <SelectWrapper
              formik={formik}
              name={formik.values['pathwayType']}
              textLabel="Pathway Type"
              textLabelStyle={textLabel}
              options={PathWayTypes}
              placeholder="Select Path Type"
              inputProps={otherPropsRequired}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextfieldWrapper
              formik={formik}
              name={formik.values['title']}
              textLabelStyle={textLabel}
              textLabel="Title"
              otherProps={otherPropsRequired}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextfieldWrapper
              formik={formik}
              name={formik.values['description']}
              multiline
              minRows={4}
              textLabelStyle={textLabel}
              textLabel="Description"
              otherProps={otherPropsRequired}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <HandleInputChangeAutocomplete
              multiple={true}
              otherProps={otherPropsRequired}
              options={skillPlatformList}
              handleInputChange={handleInputSkillPlatformName}
              textLabelStyle={textLabel}
              name="skill_platform_id"
              label="Skills"
              placeHolder="Select Skills"
              value={formik.values['skills']}
              onChange={(e, value) => {
                formik.setFieldValue('Skills', value);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4} alignSelf="flex-start">
            <SelectWrapper
              name={formik.values['skill_level']}
              textLabel="Skill Level"
              textLabelStyle={textLabel}
              options={skillLevels}
              placeholder="Select level"
              inputProps={otherPropsRequired}
            />
          </Grid>
          <Grid item xs={12} md={4} alignSelf="flex-end" textAlign="center">
            <SubmissionButton onClick={formik.handleSubmit}>
              Request
            </SubmissionButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default Option32;
