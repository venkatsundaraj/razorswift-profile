import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import { otherPropsNotRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateApi,
  CompanyApi,
  JobDescriptionApi,
  SkillPlatformApi,
} from '@/swagger_api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { callApi } from '@/utils/apirequest';
import {
  emailValidation,
  nameValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import { Grid, Typography, styled, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const INITIAL_FORM_STATE = {
  Name: '',
  Email: '',
  Mobile: '',
  MinExperience: '',
  MaxExperience: '',
  Skills: [],
  Companies: [],
  ProjectTitle: '',
};
const FORM_VALIDATION = Yup.object().shape({
  Name: nameValidation('Name', false),
  Email: emailValidation('Email', false),

  Mobile: validateContactNumber('Mobile Number', false),
  ProjectTitle: Yup.string()
    .min(1)
    .max(100, 'Project Title cannot be more than 100 characters'),
});

const CandidateSearchForm = ({ setCandidatesList, backend, jdId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);
  const candidateApi = new CandidateApi();
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const companyApi = useMemo(() => new CompanyApi(), []);
  const [skillPlatformList, setSkillPlatformApiList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);

  const handleInputCompanyName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await companyApi.apiCompanyGetAllByNameGet(opts);
        console.log(response);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setCompanyList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [companyApi.apiCompanyGetAllByNameGet, setCompanyList]
  );

  const handleInputSkillPlatformName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await skillPlatformApi.apiSkillPlatformGetAllByNameGet(
          opts
        );
        console.log(response);

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
    handleInputSkillPlatformName('');
    handleInputCompanyName('');
  }, [handleInputSkillPlatformName, handleInputCompanyName]);

  const CandidateList = useCallback(
    async values => {
      console.log(values);

      try {
        setLoading(true);
        const data = {
          ...values,
          Mobile: values.Mobile ? `91${values.Mobile}` : '',
          isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
        };
        const response = await callApi('SearchCandidateList', data);
        console.log(response, 'response');
        setLoading(false);
        if (response.data.status === 200) {
          console.log(response.data.candidates);
          setCandidatesList(response.data.candidates || []);
        } else {
          dispatch(
            setAlertPopup({
              message: 'Something went wrong. Please try again!',
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong. Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      }
    },
    [dispatch, setCandidatesList]
  );

  const getCandidateManualSearch = useCallback(
    async values => {
      setLoading(true);
      const data = {
        ...values,
        mobile: values.mobile ? `91${values.mobile}` : '',
        isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      };
      const opts = { body: data };
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionJdCandidatesManualSearchPost(
            opts
          );
        setLoading(false);
        if (response?.body?.result && response?.body?.result?.length > 0) {
          const trim =
            response?.body?.result?.map((res, index) => ({
              slno: index + 1,

              ...res,
              phone: res?.contact,
              name: res?.name,
            })) || [];
          console.log('trime', trim, response?.body?.result);

          setCandidatesList(trim);
        } else setCandidatesList([]);
      } catch (err) {
        setLoading(false);
        console.log(err);
        setCandidatesList([]);
      }
    },
    [jobDescriptionApi]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async values => {
        console.log(values);
        const valueTransformed = transformObject(values);
        console.log(valueTransformed);

        if (backend && jdId)
          await getCandidateManualSearch(
            backednMapJSOn(valueTransformed, jdId)
          );
        else await CandidateList(valueTransformed);
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <Typography variant="h1" sx={{ fontSize: 18, marginBottom: 2 }}>
            {Object.values(values).every(
              value =>
                value === '' ||
                (Array.isArray(value) && value.length === 0) ||
                value === null
            )
              ? `Search `
              : `Search based on `}
            {Object.keys(values)
              .map(field => {
                if (values[field]) {
                  if (field === 'Skills' || field === 'Companies') {
                    // Join the array values with a comma
                    if (values[field].length > 0) return field;
                    else return '';
                  } else if (
                    field === 'MinExperience' &&
                    field === 'MaxExperience'
                  ) {
                    // Skip if either MinExperience or MaxExperience has a value
                    return 'ExperienceRange';
                  } else if (
                    field === 'MinExperience' ||
                    field === 'MaxExperience'
                  ) {
                    // Combine MinExperience and MaxExperience as "Experience range"
                    return field;
                  } else {
                    // For other fields, just display the field name
                    return field;
                  }
                }
                return '';
              })
              .filter(Boolean)
              .reduce((prev, curr, index, arr) => {
                // Append "and" before the last field if there are more than two fields
                if (index === arr.length - 1 && index > 0) {
                  return `${prev} and ${curr}`;
                }
                // Append ", " for all other fields
                return prev ? `${prev}, ${curr}` : curr;
              }, '')}
          </Typography>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4} md={3}>
              <TextfieldWrapper
                name="Name"
                textLabel="Name"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
              />
            </Grid>
            <Grid item xs={4} md={3}>
              <TextfieldWrapper
                name="Email"
                textLabel="Email"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
              />
            </Grid>
            <Grid item xs={4} md={3}>
              <TextfieldWrapper
                otherProps={otherPropsNotRequired}
                textLabelStyle={textLabel}
                autoFocus
                autoComplete="off"
                name="Mobile"
                type="tel"
                InputProps={{
                  startAdornment: (
                    <Typography sx={{ fontWeight: 500, color: '#212121' }}>
                      +91
                    </Typography>
                  ),
                }}
                onChange={e => {
                  setFieldValue(
                    'Mobile',
                    e.target.value.replace(/[^0-9]/g, '')
                  );
                }}
                textLabel="Mobile Number"
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextfieldWrapper
                name="MinExperience"
                textLabel="Min Experience"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
                onChange={e => {
                  setFieldValue(
                    'MinExperience',
                    e.target.value.replace(/[^0-9]/g, '')
                  );
                }}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextfieldWrapper
                name="MaxExperience"
                textLabel="Max Experience"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
                onChange={e => {
                  setFieldValue(
                    'MaxExperience',
                    e.target.value.replace(/[^0-9]/g, '')
                  );
                }}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <HandleInputChangeAutocomplete
                multiple={true}
                otherProps={otherProps}
                options={skillPlatformList}
                handleInputChange={handleInputSkillPlatformName}
                textLabelStyle={textLabel}
                name="Skills"
                label="Skills"
                placeHolder="Select Skills"
                value={values.Skills}
                onChange={(e, value) => {
                  setFieldValue('Skills', value);
                }}
              />
            </Grid>
            {isAdvanceSearch && (
              <Grid item xs={3} md={2}>
                <HandleInputChangeAutocomplete
                  multiple={true}
                  otherProps={otherProps}
                  options={companyList}
                  handleInputChange={handleInputCompanyName}
                  textLabelStyle={textLabel}
                  name="Companies"
                  label="Company"
                  placeHolder="Select Company"
                  value={values.Companies}
                  onChange={(e, value) => {
                    setFieldValue('Companies', value);
                  }}
                />
              </Grid>
            )}
            {isAdvanceSearch && (
              <Grid item xs={4} md={3}>
                <TextfieldWrapper
                  name="ProjectTitle"
                  textLabel="Project Title"
                  textLabelStyle={textLabel}
                  otherProps={otherPropsNotRequired}
                />
              </Grid>
            )}
            <Grid item xs={3} md={2}>
              <ShadowButtonSubmit
                height="35px"
                width="100%"
                minwidth="250px"
                maxwidth="250px"
                backgroundcolor={theme.palette.primary.main}
                type="submit"
                onClick={() => {
                  setIsAdvanceSearch(!isAdvanceSearch);
                  setFieldValue('Companies', []);
                  setFieldValue('ProjectTitle', '');
                }}
              >
                <ButtonText color="#fff">
                  {isAdvanceSearch ? 'Close' : 'Advance Search'}
                </ButtonText>
              </ShadowButtonSubmit>
            </Grid>

            <Grid item xs={12} md={12}>
              <ShadowButtonSubmit
                height="35px"
                width="100%"
                minwidth="250px"
                maxwidth="250px"
                backgroundcolor={theme.palette.primary.main}
                type="submit"
                onClick={handleSubmit}
              >
                <ButtonText color="#fff">Filter</ButtonText>
              </ShadowButtonSubmit>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default CandidateSearchForm;

const transformObject = obj => {
  const trimValue = value => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    } else if (Array.isArray(value)) {
      return value.map(trimValue);
    } else if (typeof value === 'object' && value !== null) {
      const trimmedObj = {};
      for (let key in value) {
        trimmedObj[key] = trimValue(value[key]);
      }
      return trimmedObj;
    }
    return value;
  };

  const transformArray = arr => {
    return arr.map(item => trimValue(item.inputValue || item.title));
  };

  const parseExperience = experience => {
    const parsedExperience = parseInt(experience);
    return isNaN(parsedExperience) ? null : parsedExperience;
  };

  const trimmedObject = {
    Name: trimValue(obj.Name),
    Email: trimValue(obj.Email),
    Mobile: trimValue(obj.Mobile),
    'Experience range': [
      parseExperience(obj.MinExperience),
      parseExperience(obj.MaxExperience),
    ],
    Skills: transformArray(obj.Skills),
    Companies: transformArray(obj.Companies),
    ProjectTitle: trimValue(obj.ProjectTitle),
    isprod: trimValue(process.env.NEXT_PUBLIC_IS_PROD) === 'true',
  };

  return trimmedObject;
};

function backednMapJSOn(json, jdId) {
  return {
    name: json.Name || '',
    email: json.Email || '',
    mobile: json.Mobile || '',
    jobDescriptionId: jdId || 0, // This field is not present in the input JSON, so it is set to 0.
    minExperience: json['Experience range']
      ? json['Experience range'][0] || 0
      : 0,
    maxExperience: json['Experience range']
      ? json['Experience range'][1] || 0
      : 0,
    skills: json.Skills || [],
    companies: json.Companies || [],
    projectTitle: json.ProjectTitle ? [json.ProjectTitle] : null,
    isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
  };
}
