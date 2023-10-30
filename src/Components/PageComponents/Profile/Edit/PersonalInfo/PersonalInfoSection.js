import FormCard from '@/cardComponents/FormCard';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import Textfield from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { monthsinaYear } from '@/src/data/DropDownValues';
import { employmentStatusTypes, genderTypes } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import { CandidateProfileApi } from '@/swagger_api/api/CandidateProfileApi';
import {
  CandidatePersonalInfoApi,
  CityApi,
  StateApi,
} from '@/swagger_api/api/EducationInstituteApi';
import { getDropDownValues } from '@/utils/CommonFunctions/DropdownValuesGetFunctions';
import { parseExperience } from '@/utils/CommonFunctions/FormvalueChangingFunctions';
import {
  debounce,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  DateOfBirthValidation,
  YearValidation,
  addifnotexistdropdownValidationSchema,
  alphabetsValidationSchema,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { Grid, OutlinedInput, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
const INITIAL_FORM_STATE = {
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  employmentStatus: '',
  dateOfBirth: '',
  cityName: '',
  stateName: '',
  totalExperienceInYears: parseExperience(null),
};
const FORM_VALIDATION = Yup.object().shape({
  firstName: alphabetsValidationSchema('First Name', true),
  middleName: alphabetsValidationSchema('Middle Name', false),
  lastName: alphabetsValidationSchema('Last Name', true),
  employmentStatus: staticDropDownValidation(
    'Employment Status',
    true,
    employmentStatusTypes
  ),
  gender: staticDropDownValidation('Gender', true, genderTypes),
  cityName: addifnotexistdropdownValidationSchema('City', 1, 100, true),
  dateOfBirth: DateOfBirthValidation('Date of Birth', true),
  stateName: Yup.mixed().when('cityName', {
    is: cityName => cityName?.inputValue,
    then: Yup.mixed().required('Please select your State'),
    otherwise: Yup.mixed(),
  }),
  totalExperienceInYears: Yup.object().shape({
    years: YearValidation('Years', true),
    months: staticDropDownValidation('Months', true, monthsinaYear, 'are'),
  }),
});

const PersonalInfoSection = () => {
  const dispatch = useDispatch();
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const { data, setData } = context1 ? context1 : context2;
  const [readOnly, setReadOnly] = useState(true);
  const [cityNames, setCityNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);
  const userDetails = localStorageUtil.getItem('userDetails');
  const cityApi = useMemo(() => new CityApi(), []);
  const candidatePersonalInfoApi = useMemo(
    () => new CandidatePersonalInfoApi(),
    []
  );
  const stateApi = useMemo(() => new StateApi(), []);
  const candidateProfileApi = useMemo(() => new CandidateProfileApi(), []);

  const CityNamesGet = useCallback(
    async values => {
      try {
        let opts = {
          name: values.cityName,
        };
        const response = await cityApi.apiCityGetAllByNameGet(opts);
        const trim = getDropDownValues(response.body.result);
        setCityNames(trim);

        const valuesInitial = {
          ...values,
          totalExperienceInYears: parseExperience(
            values.totalExperienceInYears
          ),
        };
        setInitialValues(valuesInitial);
        setInitialValues(valuesInitial);
      } catch (error) {
        console.log(error);
      }
    },
    [cityApi, setCityNames, setInitialValues]
  );

  const CityFormsGet = useCallback(async () => {
    if (userDetails?.candidateId) {
      try {
        const response =
          await candidatePersonalInfoApi.apiCandidatePersonalInfoGetPersonalInfoCandidateIdGet(
            userDetails?.candidateId
          );
        if (response.body.result) {
          const result = response.body.result;
          const values = {
            ...result,
            isStudent: result.isStudent ? 'Student' : 'Employee',
            cityName: result.cityId
              ? {
                  title: `${result.cityName},${result.stateName},${result.countryName}`,
                  year: result.cityId,
                }
              : null,
            stateName: null,
          };
          CityNamesGet(values);
        } else {
          CityNamesGet([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [userDetails?.candidateId, candidatePersonalInfoApi, CityNamesGet]);

  const StateNamesGet = useCallback(async () => {
    try {
      const response = await stateApi.apiStateGetAllByCountryIdCountryIdGet(77);
      const trim = getDropDownValues(response.body.result);
      setStateNames(trim);
    } catch (error) {
      console.log(error);
    }
  }, [stateApi, setStateNames]);

  async function PersonalInfoPost(values) {
    setLoading(true);
    var opts = {};
    var obj = {
      ...values,
      isStudent: true,
      cityId: values.cityName.year,
      newCityName: values?.cityName?.inputValue
        ? values?.cityName?.inputValue
        : values?.cityName?.year,
      stateId: values?.stateName?.year ? values?.stateName?.year : null,
    };

    var keysToDelete = ['countryId', 'countryName', 'stateName', 'cityName'];

    if (values.cityName?.inputValue == undefined) {
      keysToDelete.push(...['stateId', 'newCityName']);
    } else {
      keysToDelete.push(...['cityId']);
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
    opts.body = reverseCheckAndSet(newObj);

    await candidatePersonalInfoApi
      .apiCandidatePersonalInfoUpdatePersonalInfoPost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.result) {
          GetData();
          dispatch(
            setAlertPopup({
              message: 'Personal Info updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
          const result = response.body.result;
          let cityFullName = `${result?.cityName ?? ''},${
            result?.stateName ?? ''
          },${result?.countryName ?? ''} `;
          const values = {
            ...result,
            isStudent: result.isStudent ? 'Student' : 'Employee',
            cityName: result.cityId
              ? { title: cityFullName, year: result.cityId }
              : null,
            stateName: null,
            totalExperienceInYears: parseExperience(
              result.totalExperienceInYears
            ),
          };
          console.log('updates values', values);
          setReadOnly(true);
          setInitialValues(values);
          console.log('values', values);
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  }

  const handleInputChangeCityName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };
      try {
        const response = await cityApi.apiCityGetAllByNameGet(opts);
        console.log(response);
        const trim = getDropDownValues(response.body.result);
        setCityNames(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [cityApi.apiCityGetAllByNameGet, setCityNames]
  );

  async function GetData() {
    const guid = userDetails?.candidate?.uniqueGuid;
    if (guid) {
      try {
        const response =
          await candidateProfileApi.apiCandidateProfileGetByGuidGuidGet(guid);
        if (response.body.result) {
          setData(response?.body?.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    CityFormsGet();
    StateNamesGet();
  }, [CityFormsGet, StateNamesGet]);
  return (
    <Stack spacing={2}>
      <FormHeaderComponents
        title="Personal Info"
        isButtonNotRequired={!readOnly}
        workingFunction={() => setReadOnly(false)}
      />

      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          const { years, months } = values.totalExperienceInYears;
          const totalExperience = `${years}.${months}`;
          values.totalExperienceInYears = parseFloat(totalExperience);
          PersonalInfoPost(values);
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
                  sx={{ maxWidth: '550px' }}
                  container
                  spacing={{ xs: 2, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6} md={4}>
                    <Textfield
                      readOnly={readOnly}
                      name="firstName"
                      textLabelStyle={textLabel}
                      textLabel="First Name"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Textfield
                      readOnly={readOnly}
                      name="middleName"
                      textLabelStyle={textLabel}
                      textLabel="Middle Name"
                      otherProps={otherPropsNotRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Textfield
                      readOnly={readOnly}
                      name="lastName"
                      textLabelStyle={textLabel}
                      textLabel="Last Name"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" alignItems={'flex-end'} spacing={1}>
                      <Textfield
                        readOnly={readOnly}
                        name="totalExperienceInYears.years"
                        textLabelStyle={textLabel}
                        textLabel="Experience"
                        placeHolder=" "
                        otherProps={otherPropsRequired}
                        InputProps={{
                          endAdornment: <Typography>yrs</Typography>,
                        }}
                      />
                      <SelectWrapper
                        readOnly={readOnly}
                        name="totalExperienceInYears.months"
                        textLabelStyle={textLabel}
                        noTextLabel
                        options={monthsinaYear}
                        placeholder="Select"
                        inputProps={otherPropsNotRequired}
                        textprops={{
                          endAdornment: (
                            <Typography
                              sx={{ position: 'absolute', right: 27 }}
                            >
                              mths
                            </Typography>
                          ),
                        }}
                        input={
                          <OutlinedInput
                            endAdornment={
                              <Typography
                                sx={{ position: 'absolute', right: 27 }}
                              >
                                mths
                              </Typography>
                            }
                          />
                        }
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <MuiDateTimePicker
                      readOnly={readOnly}
                      formatValue={'date'}
                      textLabelStyle={textLabel}
                      name="dateOfBirth"
                      textLabel="Date of Birth"
                      otherProps={otherPropsRequired}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <SelectWrapper
                      readOnly={readOnly}
                      name="employmentStatus"
                      textLabelStyle={textLabel}
                      textLabel="Employment Status"
                      options={employmentStatusTypes}
                      placeholder="Select Employment Status"
                      inputProps={otherPropsRequired}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectWrapper
                      readOnly={readOnly}
                      name="gender"
                      textLabelStyle={textLabel}
                      textLabel="Gender"
                      options={genderTypes}
                      placeholder="Select Gender"
                      inputProps={otherPropsRequired}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <HandleInputChangeAutocomplete
                      readOnly={readOnly}
                      otherProps={otherPropsRequired}
                      options={cityNames}
                      handleInputChange={handleInputChangeCityName}
                      name="cityName"
                      textLabelStyle={textLabel}
                      label="City"
                      placeHolder="Select your City"
                      value={values.cityName}
                      onChange={(e, value) => {
                        setFieldValue('cityName', value);
                        setFieldValue('stateName', '');
                      }}
                    />
                  </Grid>
                  {values.cityName?.inputValue && (
                    <Grid item xs={12} md={6}>
                      <GetValuesAutocomplete
                        readOnly={readOnly}
                        otherProps={otherPropsRequired}
                        options={stateNames}
                        textLabelStyle={textLabel}
                        name="stateName"
                        label="State"
                        placeHolder="Select your State"
                        value={values.stateName}
                        onChange={(e, value) => {
                          setFieldValue('stateName', value);
                        }}
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

export default PersonalInfoSection;
