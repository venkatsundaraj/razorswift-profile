import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import Textfield from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { employmentStatusTypes, genderTypes } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidatePersonalInfoApi,
  CityApi,
  StateApi,
} from '@/swagger_api/api/EducationInstituteApi';
import {
  checkAndSet,
  debounce,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  DateOfBirthValidation,
  YearValidation,
  alphabetsValidationSchema,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import { Grid, OutlinedInput, Stack, Typography, styled } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { monthsinaYear } from '@/src/data/DropDownValues';
import { getDropDownValues } from '@/utils/CommonFunctions/DropdownValuesGetFunctions';
import { parseExperience } from '@/utils/CommonFunctions/FormvalueChangingFunctions';
import { addifnotexistdropdownValidationSchema } from '@/utils/validationSchema';
import { useCallback, useMemo } from 'react';

export const toggleButtonArrayValues = [
  { id: 1, value: 'Yes', title: 'Yes' },
  { id: 2, value: 'No', title: 'No' },
];

const NameText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontSize: '24px',
  fontWeight: '700',

  lineHeight: '38.31px',
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    lineHeight: '32px',
  },
}));

const INITIAL_FORM_STATE = {
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  employmentStatus: '',
  dateOfBirth: '',
  cityName: '',
  stateName: '',
  totalExperienceInYears: '',
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

  dateOfBirth: DateOfBirthValidation('Date of Birth', true),
  cityName: addifnotexistdropdownValidationSchema('City', 1, 100, true),
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

const SetProfileForm2 = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [cityNames, setCityNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);
  const [resumeValues, setResumeValues] = useState([]);

  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const [data, setData] = useState({});
  const cityApi = useMemo(() => new CityApi(), []);
  const candidatePersonalInfoApi = useMemo(
    () => new CandidatePersonalInfoApi(),
    []
  );
  const stateApi = useMemo(() => new StateApi(), []);
  useEffect(() => {
    CityFormsGet();
    StateNamesGet();
  }, []);
  useEffect(() => {
    setData(userDetails);
  }, [userDetails]);

  const CityFormsGet = async () => {
    if (userDetails?.candidateId) {
      try {
        const response =
          await candidatePersonalInfoApi.apiCandidatePersonalInfoGetPersonalInfoCandidateIdGet(
            userDetails.candidateId
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
          };
          CityNamesGet(values);
        } else {
          CityNamesGet([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const CityNamesGet = async values => {
    try {
      const response = await cityApi.apiCityGetAllByNameGet({
        name: values.cityName,
      });
      const trim = getDropDownValues(response.body.result);
      setCityNames(trim);
      const valuesInitial = {
        ...values,
        totalExperienceInYears: parseExperience(values.totalExperienceInYears),
      };
      setResumeValues(valuesInitial);
      const convertNullToString = checkAndSet(valuesInitial);
      setInitialValues(convertNullToString);
    } catch (error) {
      console.log(error);
    }
  };

  const StateNamesGet = async event => {
    try {
      const response = await stateApi.apiStateGetAllByCountryIdCountryIdGet(77);
      const trim = getDropDownValues(response.body.result);
      setStateNames(trim);
    } catch (error) {
      console.log(error);
    }
  };

  async function PersonalInfoPost(values, { resetForm }) {
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
    const covert_string_to_null = reverseCheckAndSet(newObj);
    opts.body = { ...covert_string_to_null };

    await candidatePersonalInfoApi
      .apiCandidatePersonalInfoUpdatePersonalInfoPost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Updated Successfully.',
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
            totalExperienceInYears: parseExperience(
              result.totalExperienceInYears
            ),
          };
          router.push('/profile');
          setInitialValues(values);
          resetForm();
          setInitialValues(INITIAL_FORM_STATE);
        } else if (response.body.message) {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'success',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
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
        const trim = getDropDownValues(response.body.result);
        setCityNames(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [cityApi.apiCityGetAllByNameGet, setCityNames]
  );

  return (
    <AuthFormLayout>
      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => {
          const { years, months } = values.totalExperienceInYears;
          const totalExperience = `${years}.${months}`;
          values.totalExperienceInYears = parseFloat(totalExperience);

          PersonalInfoPost(values, { resetForm });
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              sx={{ maxWidth: '550px' }}
              container
              spacing={{ xs: 2, sm: 2, md: 4 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} md={12}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Stack>
                      <NameText>
                        {data ? data?.candidate?.fullName : ''}
                      </NameText>
                      {/* <HeadLineText>Your headline</HeadLineText> */}
                    </Stack>
                  </Stack>
                  <Typography
                    variant="h5"
                    sx={{ color: '#1d1d1d', fontWeight: '400' }}
                  >
                    {resumeValues?.firstName
                      ? `Kindly review the details filled in accordance with the extracted resume.`
                      : 'Please fill out all the fields related to personal information'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6} md={4}>
                <Textfield
                  name="firstName"
                  textLabel="First Name"
                  otherProps={otherPropsRequired}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Textfield
                  name="middleName"
                  textLabel="Middle Name"
                  otherProps={otherPropsNotRequired}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Textfield
                  name="lastName"
                  textLabel="Last Name"
                  otherProps={otherPropsRequired}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" alignItems={'flex-end'} spacing={1}>
                  <Textfield
                    name="totalExperienceInYears.years"
                    textLabel="Experience"
                    placeHolder=" "
                    otherProps={otherPropsRequired}
                    InputProps={{
                      endAdornment: <Typography>yrs</Typography>,
                    }}
                  />
                  <SelectWrapper
                    name="totalExperienceInYears.months"
                    noTextLabel
                    options={monthsinaYear}
                    placeholder="Select"
                    inputProps={otherPropsNotRequired}
                    textprops={{
                      endAdornment: (
                        <Typography sx={{ position: 'absolute', right: 27 }}>
                          mths
                        </Typography>
                      ),
                    }}
                    input={
                      <OutlinedInput
                        endAdornment={
                          <Typography sx={{ position: 'absolute', right: 27 }}>
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
                  formatValue={'date'}
                  name="dateOfBirth"
                  textLabel="Date of Birth"
                  otherProps={otherPropsRequired}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectWrapper
                  name="employmentStatus"
                  textLabel="Employment Status"
                  options={employmentStatusTypes}
                  placeholder="Select Employment Status"
                  inputProps={otherPropsRequired}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectWrapper
                  name="gender"
                  textLabel="Gender"
                  options={genderTypes}
                  placeholder="Select Gender"
                  inputProps={otherPropsRequired}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <HandleInputChangeAutocomplete
                  otherProps={otherPropsRequired}
                  options={cityNames}
                  handleInputChange={handleInputChangeCityName}
                  name="cityName"
                  label="City "
                  placeHolder="Select your City"
                  value={values.cityName}
                  onChange={(e, value) => {
                    setFieldValue('cityName', value);
                    setFieldValue('stateName', '');
                  }}
                />
              </Grid>
              {values.cityName?.inputValue && (
                <Grid item xs={12} md={7}>
                  <GetValuesAutocomplete
                    otherProps={otherPropsRequired}
                    options={stateNames}
                    name="stateName"
                    label="State "
                    placeHolder="Select your State"
                    value={values.stateName}
                    onChange={(e, value) => {
                      setFieldValue('stateName', value);
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={7}>
                <ShadowButtonSubmit
                  height="50px"
                  width="100%"
                  minwidth="250px"
                  maxwidth="250px"
                  backgroundcolor={theme.palette.primary.main}
                  type="submit"
                  onClick={handleSubmit}
                >
                  <ButtonText color="#fff">
                    {resumeValues.firstName ? `Review & continue` : ` Continue`}
                  </ButtonText>
                </ShadowButtonSubmit>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};

export default SetProfileForm2;
