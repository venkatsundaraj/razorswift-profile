import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import { CityApi, JobDescriptionApi, SkillPlatformApi } from '@/swagger_api/*';
import { checkAndSet, debounce } from '@/utils/CommonFunctions/Functions';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FieldArray, Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SwitchButtonWrapper from '@/formComponents/FormsUI/SwitchButtonForm';
import { callApi } from '@/utils/apirequest';
import { multiLineValidation } from '@/utils/validationSchema';
import { LoadingContext } from '../LoadingComponents/LoadingContext';
function determinePlaceholder(name) {
  const basePlaceholders = [
    'About_me',
    'Companies',
    'Email',
    'Name',
    'Phone',
    'Projects',
    'Slug',
    'Onboard Code',
  ];

  if (basePlaceholders.includes(name)) {
    if (name === 'phone') {
      return `+91 n,`;
    } else {
      return `${name} n,`;
    }
  }

  return basePlaceholders; // Default placeholder if not matched
}

const INITIAL_FORM_STATE = {
  search_string: '',
  all_match: false,
  minExp: '',
  maxExp: '',
  location: '',
  skills: [],
};

const skillSchema = Yup.object().shape({
  name: Yup.mixed().nullable().required('Skill name is required'),
  expertise: Yup.number()
    .integer()
    .min(0)
    .required('Expertise level is required'),
  must_have: Yup.boolean().required('Must-have flag is required'),
});

const FORM_VALIDATION = Yup.object().shape({
  location: Yup.mixed().nullable(),
  search_string: multiLineValidation('Search String', false, 1, 2048),
  all_match: Yup.boolean().nullable().required('All match is required'),
  minExp: Yup.string().test(
    'minExp-or-maxExp',
    'Min Experience is required when Max Experience is given',
    function (value) {
      const maxExp = this.resolve(Yup.ref('maxExp'));
      return !maxExp || (value && value !== '');
    }
  ),
  maxExp: Yup.string().test(
    'minExp-or-maxExp',
    'Max Experience is required when Min Experience is given',
    function (value) {
      const minExp = this.resolve(Yup.ref('minExp'));
      return !minExp || (value && value !== '');
    }
  ),
  skills: Yup.array().of(skillSchema),
});

const AdvancedCandidateSearchForm = ({ setCandidatesList }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [data, setData] = useState({});
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const cityApi = useMemo(() => new CityApi(), []);
  const { loading, setLoading } = useContext(LoadingContext);
  const [skillPlatformList, setSkillPlatformApiList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);

  const handleInputChangeCityName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await cityApi.apiCityGetAllByNameGet(opts);
        console.log(response);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name.split(',')[0].trim(),
            year: res?.id,
          })) || [];

        setCityList(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [cityApi.apiCompanyGetAllByNameGet, setCityList]
  );

  const handleInputSkillPlatformName = useCallback(
    debounce(async (event, newValue) => {
      console.log(newValue);
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
    handleInputChangeCityName('');
  }, [handleInputSkillPlatformName, handleInputChangeCityName]);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      name: '',
      expertise: 1,
      must_have: false,
    });
    setCount(count + 1);
  };

  const handleRemove = (arrayHelpers, index, name) => {
    console.log(index, 'index');
    arrayHelpers.remove(index);
    setCount(count - 1);
    dispatch(
      setAlertPopup({
        message: `${name} deleted successfully`,
        type: 'success',
        duration: 3000,
      })
    );
  };

  const CandidateList = useCallback(
    async values => {
      console.log(values);

      try {
        setLoading(true);
        const data = {
          ...values,
          isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
          // isprod: true,
        };
        const response = await callApi('SearchApi', data);
        console.log(response, 'response');
        setLoading(false);
        if (response.data.status === 'success') {
          console.log(response.data.CandidateSearchResults);
          setCandidatesList(
            response.data.CandidateSearchResults.all_candidates || []
          );
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
    [dispatch, setLoading, setCandidatesList]
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

        const payload = {
          search_string:
            values.search_string.replace(/(?<!\d)(\d{10})(?!\d)/g, '91$1') ||
            '',
          all_match: values.all_match,
          years_from_to: [
            parseInt(values.minExp) || '', // Convert to integer or use 0
            parseInt(values.maxExp) || '', // Convert to integer or use 0
          ],
          skills: values.skills.map(skill => ({
            name: skill?.name.inputValue || skill?.name.title || skill?.name,
            expertise: skill.expertise === 1 ? 3 : skill.expertise, // Adjust expertise values
            must_have: skill.must_have,
          })),
          location:
            values?.location?.inputValue ||
            values?.location?.title ||
            values?.location?.name,
        };

        const cleanedPayload = Object.fromEntries(
          Object.entries(payload).filter(([key, value]) =>
            Array.isArray(value)
              ? value.some(item => item !== '' && item !== null)
              : value !== '' && value !== null && value !== undefined
          )
        );

        const trimed = checkAndSet(cleanedPayload);
        console.log(
          cleanedPayload,
          'cleanedPayload',
          trimed?.skills?.length,
          trimed?.skills && trimed?.skills?.length > 0
        );

        if (trimed?.skills && trimed?.skills.length > 0) {
          const skillNames = trimed.skills.map(skill => skill.name);
          const uniqueSkillNames = new Set(skillNames);

          if (skillNames.length !== uniqueSkillNames.size) {
            dispatch(
              setAlertPopup({
                message: 'Duplicate skill names found!',
                type: 'warning',
                duration: 3000,
              })
            );
          } else {
            CandidateList(cleanedPayload);
          }
        } else {
          // Assuming you want to check if there's more than one key (all_match + another one)
          const keyCount = Object.keys(trimed).length;
          console.log(keyCount);

          if (keyCount > 1) {
            // This means there's 'all_match' and at least one more key
            // Do something here...
            CandidateList(cleanedPayload);
          } else {
            dispatch(
              setAlertPopup({
                message: 'Atleast one item should be filled for searching',
                type: 'warning',
                duration: 3000,
              })
            );
          }
        }
        // CandidateList(cleanedPayload);
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
          <Stack alignItems={'center'} direction={'row'}>
            <Typography
              variant="h1"
              sx={{ fontSize: 18, textTransform: 'capitalize' }}
            >
              {Object.values(values).every(
                value =>
                  value === '' ||
                  (Array.isArray(value) && value.length === 0) ||
                  value === null
              )
                ? `Search `
                : `Search Candidates `}
              {/* {Object.keys(values)
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
              }, '')} */}
            </Typography>
            <Tooltip title="Enter keywords, numbers, or phrases to search. Separate entries with a comma for best results.">
              <IconButton color="primary" size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {errors.oneField && <div>{errors.oneField}</div>}
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={12}>
              <TextfieldWrapper
                name="search_string"
                textLabel="Search Field"
                textLabelStyle={textLabel}
                otherProps={otherPropsRequired}
                multiline
                minRows={4}
                placeHolder={determinePlaceholder('search_string')}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextfieldWrapper
                name="minExp"
                textLabel="Min Experience"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
                onChange={e => {
                  setFieldValue(
                    'minExp',
                    e.target.value.replace(/[^0-9]/g, '')
                  );
                }}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextfieldWrapper
                name="maxExp"
                textLabel="Max Experience"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
                onChange={e => {
                  setFieldValue(
                    'maxExp',
                    e.target.value.replace(/[^0-9]/g, '')
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <HandleInputChangeAutocomplete
                otherProps={otherPropsNotRequired}
                options={cityList}
                handleInputChange={handleInputChangeCityName}
                textLabelStyle={textLabel}
                name="location"
                label="Location"
                placeHolder="Select the Locations"
                value={values.location}
                onChange={(e, value) => {
                  setFieldValue('location', value);
                }}
              />
            </Grid>

            <Grid item xs={4} md={4}>
              <SwitchButtonWrapper
                textLabelStyle={textLabel}
                textLabel="All Match"
                name="all_match"
                LeftLabel="Any Match"
                RightLabel="All Match"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <LoginFormCard sx={{ marginTop: 2 }}>
                <Typography variant="h4">Skills</Typography>
                <SkillsFieldArray
                  values={values}
                  setFieldValue={setFieldValue}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              </LoginFormCard>
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
                <ButtonText color="#fff">Search</ButtonText>
              </ShadowButtonSubmit>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default AdvancedCandidateSearchForm;

const SkillsFieldArray = ({
  values,
  setFieldValue,
  handleAdd,
  handleRemove,
}) => {
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const [skillPlatformOptions, setSkillPlatformOptions] = useState([]);

  const handleInputSkillPlatformName = useCallback(
    debounce(async (event, newValue, index) => {
      console.log(newValue);
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

        // Update the specific index in skillPlatformOptions array
        setSkillPlatformOptions(prevOptions => {
          const updatedOptions = [...prevOptions];
          updatedOptions[index] = trim;
          return updatedOptions;
        });
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [skillPlatformApi.apiSkillPlatformGetAllByNameGet]
  );

  useEffect(() => {
    // Initialize skillPlatformOptions based on the number of skills
    setSkillPlatformOptions(Array(values.skills.length).fill([]));
  }, [values.skills.length]);

  return (
    <FieldArray name="skills">
      {arrayHelpers => (
        <>
          {values.skills &&
            values.skills.map((skill, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                justifyContent="space-between"
                alignItems={'flex-start'}
              >
                <Grid item xs={3}>
                  <HandleInputChangeAutocomplete
                    isNotAdd={false}
                    otherProps={{
                      ...otherPropsRequired,
                      getOptionDisabled: option => {
                        const matchingSkill = values?.skills.find(skill => {
                          if (typeof skill?.name === 'string') {
                            return skill?.name === option?.title;
                          } else if (typeof skill?.name === 'object') {
                            if (skill?.name?.inputValue) {
                              return skill?.name?.inputValue === option?.title;
                            } else {
                              return skill?.name?.title === option?.title;
                            }
                          }
                          return false;
                        });

                        // Check if the option title matches the specific skill name
                        const isSpecificOption =
                          (typeof skill?.name === 'string' &&
                            skill?.name === option?.title) ||
                          (typeof skill?.name === 'object' &&
                            ((skill?.name?.inputValue &&
                              skill?.name?.inputValue === option?.title) ||
                              (!skill?.name?.inputValue &&
                                skill?.name?.title === option?.title)));

                        if (isSpecificOption) return false;

                        // Do not disable if it's the specific option or it matches an existing skill
                        return !!matchingSkill;
                      },
                      onFocus: () => {
                        // This callback will be executed when the input field gains focus (user clicks on it)
                        // You can perform your desired action here
                        console.log('Input field clicked!');
                        handleInputSkillPlatformName(
                          null,
                          skill?.name?.title ||
                            skill?.name?.inputValue ||
                            skill?.name,
                          index
                        );
                        // Perform your action here
                      },
                    }}
                    options={skillPlatformOptions[index] || []} // Use the specific options for this skill name
                    handleInputChange={(e, value) => {
                      console.log(value);
                      handleInputSkillPlatformName(e, value, index);
                    }}
                    textLabelStyle={textLabel}
                    name={`skills.${index}.name`}
                    label="Skills"
                    placeHolder="Select Skill"
                    value={skill.name} // for this value it should not be disabled
                    onChange={(e, value) => {
                      console.log(value);
                      setFieldValue(`skills.${index}.name`, value);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SelectWrapper
                    name={`skills.${index}.expertise`}
                    textLabel="Skill Level"
                    textLabelStyle={textLabel}
                    options={skillLevels}
                    placeholder="Select Skill Level"
                    inputProps={otherPropsRequired}
                  />
                </Grid>

                <Grid>
                  <SwitchButtonWrapper
                    textLabelStyle={textLabel}
                    textLabel="Skill priorities"
                    name={`skills.${index}.must_have`}
                    LeftLabel="Good to have"
                    RightLabel="Must have"
                  />
                </Grid>

                <Grid item xs={2} alignSelf="center">
                  <Stack
                    direction="column"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      type="button"
                      disableRipple
                      size="large"
                      aria-label="back"
                      color="primary"
                      onClick={() =>
                        handleRemove(arrayHelpers, index, 'Skills')
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            ))}
          <Stack alignItems={'flex-end'}>
            <Tooltip title="Add Skill Platform" arrow placement="right">
              <IconButton
                type="button"
                disableRipple
                size="large"
                aria-label="back"
                color="primary"
                onClick={event => {
                  handleAdd(values.skills);
                  handleInputSkillPlatformName(
                    event,
                    ' ',
                    values.skills.length - 1
                  );
                }}
              >
                <AddCircleOutlineOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        </>
      )}
    </FieldArray>
  );
};
