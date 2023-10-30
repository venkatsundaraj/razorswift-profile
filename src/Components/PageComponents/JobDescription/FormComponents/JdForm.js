import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import CkEditorForm from '@/formComponents/FormsUI/CkEditorForm';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { MyFormContext } from '@/pageComponents/JobDescription/FormComponents//JdStepper';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { employmentTypes, workplaceTypes } from '@/src/data/DropDownValues';
import { setAlertPopup } from '@/store/alertSlice';
import { CityApi, ClientApi, DegreeApi } from '@/swagger_api/api/DegreeApi';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { callApi } from '@/utils/apirequest';
import { salaryIntRegexp } from '@/utils/regex';
import {
  addifnotexistMultipledropdownValidationSchema,
  nameValidatorNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { Button, Grid, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

function convertToUL(list) {
  let result = '<ul>';
  list.forEach(item => {
    item = item.replace(/"/g, '');
    result += `<li><strong>${item.replace(/\s/g, '&nbsp;')}</strong></li>`;
  });
  result += '</ul>';
  return result;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const INITIAL_FORM_STATE = {
  title: '',
  date: '',
  department: '',
  noOfOpenings: '',
  description: '',
  responsibilities: '',
  requirements: '',
  industryPreference: '',
  jobFunction: '',
  jobLocation: [],
  degreeId: '',
  degreeName: [],
  keywords: '',
  clientId: '',
  seniorityLevel: '',
  // jobProfileType: 1,
  workplaceType: 0,
  employmentType: 0,
  minimumSalary: null,
  maximumSalary: null,
  currency: 'INR',
  minimumExperienceInYears: '',
  maximumExperienceInYears: '',
};

const JdForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { setLoading } = useContext(LoadingContext);
  const { activeStep, stepOneData, role } = useContext(MyFormContext);
  const degreeApi = useMemo(() => new DegreeApi(), []);
  const cityApi = useMemo(() => new CityApi(), []);
  const clientApi = useMemo(() => new ClientApi(), []);

  const [initialValues, setInitialValues] = useState({
    ...INITIAL_FORM_STATE,
  });
  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(1, 'Title must be must be at least 1 character')
      .max(250, 'Title cannot be more than 250 characters')
      .required('Title is required'),
    department: nameValidatorNoRegex('Department', true),
    seniorityLevel: Yup.string()
      .trim()
      .min(1)
      .max(250, 'Seniority Level cannot be more than 100 characters')
      .required('Seniority Level is required'),
    noOfOpenings: Yup.number()
      .integer()
      .nullable()
      .min(1, 'Number of Openings must be at least 1')
      .max(100000, 'Number of Openings cannot exceed 100,000'),
    industryPreference: nameValidatorNoRegex('Industry Preference', false),
    workplaceType: staticDropDownValidation(
      'Workplace Type',
      true,
      workplaceTypes
    ),
    employmentType: staticDropDownValidation(
      'Employment Type ',
      true,
      employmentTypes
    ),

    jobFunction: nameValidatorNoRegex('Job Function', false),
    jobLocation: addifnotexistMultipledropdownValidationSchema('Job Location'),

    degreeName: addifnotexistMultipledropdownValidationSchema('Qualification'),

    // keywords: Yup.string().min(1).max(100, 'Keywords cannot be more than 100 characters').matches(alphanumericRegExp),
    minimumSalary: Yup.string()
      .trim()
      .nullable()
      .min(1)
      .matches(salaryIntRegexp, 'Alphabets are not allowed'),

    maximumSalary: Yup.string()
      .trim()
      .nullable()
      .min(1)
      .matches(salaryIntRegexp, 'Alphabets are not allowed')
      .test(
        'is-greater-than-minimum',
        'Maximum salary should be greater than or equal to Minimum Salary',
        function (value) {
          const minimumSalary = this.resolve(Yup.ref('minimumSalary'));
          if (!minimumSalary || !value) {
            return true;
          }
          return (
            parseInt(value.replace(/,/g, '')) >=
            parseInt(minimumSalary.replace(/,/g, ''))
          );
        }
      ),
    currency: Yup.string(),

    minimumExperienceInYears: Yup.string()
      .max(4, 'Minimum Experience cannot be more than 4 characters')
      .test(
        'required-if-maximum-empty',
        'Minimum Experience is required',
        function (value) {
          const maximumExperience = this.resolve(
            Yup.ref('maximumExperienceInYears')
          );
          if (!maximumExperience) {
            return !!value;
          }
          return true;
        }
      ),
    maximumExperienceInYears: Yup.string()
      .min(1)
      .max(4, 'Maximum Experience cannot be more than 4 characters')
      .test(
        'is-greater-than-minimum',
        'Maximum Experience should be greater than or equal to Minimum Experience',
        function (value) {
          const minimumExperience = this.resolve(
            Yup.ref('minimumExperienceInYears')
          );
          if (!minimumExperience) {
            return true;
          }
          return parseInt(value) >= parseInt(minimumExperience);
        }
      )
      .required('Maximum Experience is required'),
    date: Yup.date()
      .required('Expected Date of Joining is required')
      .test('is-today-or-future', function (value) {
        const today = new Date();

        // Access the createdDate from formikValues
        const createdDate = this.resolve(Yup.ref('createdDate'));

        if (createdDate) {
          const createdDateObj = new Date(createdDate);
          createdDateObj.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 00:00:00.000
          const createdDateFormatted =
            createdDateObj.toLocaleDateString('en-GB'); // Format as ddmmyyyy
          const errorMessage = `Expected Date of Joining must be after or equal to ${createdDateFormatted}`;
          return (
            (value && value >= createdDateObj) ||
            this.createError({ message: errorMessage })
          );
        }

        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 00:00:00.000
        return (
          (value && value >= today) ||
          this.createError({
            message:
              "Expected Date of Joining must be today's date or a future date",
          })
        );
      }),
    description: Yup.string().min(1).nullable(),
    responsibilities: Yup.string()
      .min(1)
      // .max(500, 'Responsibilities cannot be more than 500 characters')
      // .matches(alphanumericRegExp)
      .required('Responsibilities is required'),
    requirements: Yup.string()
      .min(1)
      // .max(500, 'Requirements cannot be more than 500 characters')
      // .matches(alphanumericRegExp)
      .required('Requirements is required'),
    ...(role === 'Admin' && {
      clientId: Yup.mixed()

        // .max(500, 'Requirements cannot be more than 500 characters')
        // .matches(alphanumericRegExp)
        .required('Please select a Client '),
    }),
  });
  console.log(initialValues);
  const theme = useTheme();

  const [degree, setDegree] = useState([]);
  const [cities, setCities] = useState([]);
  const [clients, setClients] = useState([]);
  useEffect(() => {
    let formData = stepOneData;
    formData = {
      ...formData,
      jobLocation:
        formData?.jobLocation.map(({ cityId, cityName }) => ({
          title: cityName,
          year: cityId,
        })) || [],
      degreeName:
        formData?.degreeName?.split(', ').map(degree => {
          const inputValue = degree.startsWith('Add "')
            ? degree.substring(5, degree.length - 1)
            : '';
          const title = inputValue ? '' : degree;
          return { title, inputValue };
        }) || [],
    };
    if (role === 'Admin') {
      formData.clientId = formData?.clientId
        ? {
            title: formData?.client?.name,
            year: formData?.client?.id,
          }
        : '';
    }

    if (stepOneData) {
      setInitialValues(formData);
    }
  }, [stepOneData, activeStep, role]);

  const handleInputChangeDegreeName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await degreeApi.apiDegreeGetAllByNameGet(opts);
        console.log(response);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setDegree(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [degreeApi.apiDegreeGetAllByNameGet, setDegree]
  );
  const handleInputChangeCityName = useCallback(
    debounce(async (event, newValue) => {
      console.log(newValue);
      let opts = {
        name: newValue,
      };

      try {
        const response = await cityApi.apiCityGetAllByNameGet(opts);
        console.log(response);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setCities(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [cityApi.apiCityGetAllByNameGet, setCities]
  );
  const handleInputChangeClientName = useCallback(
    debounce(async (event, newValue) => {
      console.log(newValue);
      let opts = {
        name: newValue,
      };

      try {
        const response = await clientApi.apiClientGetAllByNameGet(opts);
        console.log(response);

        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];

        setClients(trim);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [clientApi.apiClientGetAllByNameGet, setClients]
  );

  useEffect(() => {
    handleInputChangeDegreeName('');
    handleInputChangeCityName('');
    handleInputChangeClientName('');
  }, [
    handleInputChangeDegreeName,
    handleInputChangeCityName,
    handleInputChangeClientName,
  ]);

  const ExtractJdText = values => {
    const opts = {
      jd_id: 1,
      jd_title: values.title,
      num_of_years: values.minimumExperienceInYears || 0,
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
    };
    setLoading(true);

    callApi('JdTextExtraction', opts)
      .then(response => {
        setLoading(false);
        console.log(response, 'response');

        if (response?.data?.parsedData) {
          setInitialValues(prevState => ({
            ...values,
            description: response.data.parsedData.description || '',
            responsibilities:
              convertToUL(response.data.parsedData.responsibilities) || '',
            requirements:
              convertToUL(response.data.parsedData.requirements) || '',
          }));
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
  };

  return (
    <AuthFormLayout>
      <LoginFormCard>
        <Formik
          enableReinitialize
          initialValues={{
            ...initialValues,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={onSubmit}
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
              <Grid container spacing={4}>
                {role === 'Admin' && (
                  <Grid item xs={12} md={6}>
                    <HandleInputChangeAutocomplete
                      otherProps={otherPropsRequired}
                      isNotAdd
                      options={clients}
                      handleInputChange={handleInputChangeClientName}
                      textLabelStyle={textLabel}
                      name="clientId"
                      label="Client"
                      placeHolder="Select a client"
                      value={values.clientId}
                      onChange={(e, value) => {
                        setFieldValue('clientId', value);
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="title"
                    textLabel="Title"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="department"
                    textLabel="Department"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="seniorityLevel"
                    textLabel="Seniority Level"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="noOfOpenings"
                    type="number"
                    textLabel="No. of Openings"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                    // onChange={e => {
                    //   // const value = e.target.value.replace(/[^0-9,]/g, '');
                    //   // setFieldValue('noOfOpenings', value);
                    //   setFieldValue('noOfOpenings', Number(e.target.value.replace(/[^0-9]/g, '')).toLocaleString());
                    // }}
                    onChange={e => {
                      const value = e.target.value.trim();
                      if (value === '') {
                        setFieldValue('noOfOpenings', '');
                      } else {
                        const numericValue = value.replace(/[^0-9]/g, '');
                        setFieldValue('noOfOpenings', Number(numericValue));
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="industryPreference"
                    textLabel="Industry Preference"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectWrapper
                    name="workplaceType"
                    textLabel="Workplace Type"
                    textLabelStyle={textLabel}
                    options={workplaceTypes}
                    placeholder="Select Workplace Type"
                    inputProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectWrapper
                    name="employmentType"
                    textLabel="Employment type"
                    textLabelStyle={textLabel}
                    options={employmentTypes}
                    placeholder="Select employment type"
                    inputProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="jobFunction"
                    textLabel="Job Function"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <HandleInputChangeAutocomplete
                    multiple
                    isNotAdd
                    otherProps={otherPropsRequired}
                    options={cities}
                    handleInputChange={handleInputChangeCityName}
                    textLabelStyle={textLabel}
                    name="jobLocation"
                    label="Job Location"
                    placeHolder="Select the Job Locations"
                    value={values.jobLocation}
                    onChange={(e, value) => {
                      setFieldValue('jobLocation', value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <HandleInputChangeAutocomplete
                    multiple={true}
                    otherProps={otherPropsRequired}
                    options={degree}
                    handleInputChange={handleInputChangeDegreeName}
                    textLabelStyle={textLabel}
                    name="degreeName"
                    label="Qualification"
                    placeHolder="Select a Qualification"
                    value={values.degreeName}
                    onChange={(e, value) => {
                      setFieldValue('degreeName', value);
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name='keywords'
                    textLabel='Keywords'
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <RadioGroupWrapper2
                    rowDirection={true}
                    textLabelStyle={textLabel}
                    name='jobProfileType'
                    textLabel='Employment type'
                    options={jobProfileTypes}
                    placeholder='Select Job Title'
                    otherProps={otherPropsRequired}
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="minimumSalary"
                    textLabel="Minimum Salary"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                    // onChange={e => {
                    //   setFieldValue(
                    //     'minimumSalary',
                    //     Number(
                    //       e.target.value.replace(/[^0-9]/g, '')
                    //     ).toLocaleString()
                    //   );
                    // }}
                    onChange={e => {
                      const inputValue = e.target.value;
                      if (inputValue === '') {
                        setFieldValue('minimumSalary', null);
                      } else {
                        setFieldValue(
                          'minimumSalary',
                          Number(
                            inputValue.replace(/[^0-9]/g, '')
                          ).toLocaleString()
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="maximumSalary"
                    textLabel="Maximum Salary"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                    // onChange={e => {
                    //   setFieldValue(
                    //     'maximumSalary',
                    //     Number(
                    //       e.target.value.replace(/[^0-9]/g, '')
                    //     ).toLocaleString()
                    //   );

                    // }}
                    onChange={e => {
                      const inputValue = e.target.value;
                      if (inputValue === '') {
                        setFieldValue('maximumSalary', null);
                      } else {
                        setFieldValue(
                          'maximumSalary',
                          Number(
                            inputValue.replace(/[^0-9]/g, '')
                          ).toLocaleString()
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    type="number"
                    name="minimumExperienceInYears"
                    textLabel="Minimum Experience In Years"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                    onChange={e => {
                      const value = e.target.value.trim();
                      if (value === '') {
                        setFieldValue('minimumExperienceInYears', '');
                      } else {
                        const numericValue = value.replace(/[^0-9]/g, '');
                        const parsedValue = Number(numericValue);
                        setFieldValue(
                          'minimumExperienceInYears',
                          isNaN(parsedValue) ? null : parsedValue
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    type="number"
                    name="maximumExperienceInYears"
                    textLabel="Maximum Experience In Years"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                    onChange={e => {
                      const value = e.target.value.trim();
                      if (value === '') {
                        setFieldValue('maximumExperienceInYears', '');
                      } else {
                        const numericValue = value.replace(/[^0-9]/g, '');
                        setFieldValue(
                          'maximumExperienceInYears',
                          Number(numericValue)
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    readOnly={true}
                    name="currency"
                    textLabel="Currency"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiDateTimePicker
                    formatValue={'date'}
                    textLabelStyle={textLabel}
                    name="date"
                    textLabel="Expected Date of Joining"
                    otherProps={otherPropsRequired}
                  />
                </Grid>

                {values.title && !stepOneData?.id && (
                  <Grid item xs={12} md={12}>
                    <Button
                      size="large"
                      variant="outlined"
                      onClick={() => ExtractJdText(values)}
                    >
                      Extract Fields with our AI
                    </Button>
                  </Grid>
                )}

                <Grid item xs={12} md={8}>
                  <CkEditorForm
                    otherProps={otherPropsNotRequired}
                    textLabelStyle={textLabel}
                    name="description"
                    label="Description "
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CkEditorForm
                    otherProps={otherPropsRequired}
                    textLabelStyle={textLabel}
                    name="responsibilities"
                    label="Responsibilities"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CkEditorForm
                    otherProps={otherPropsRequired}
                    textLabelStyle={textLabel}
                    name="requirements"
                    label="Requirements"
                  />
                </Grid>
                <Grid item xs={12} md={8} textAlign="center">
                  <ShadowButtonSubmit
                    height="50px"
                    width="100%"
                    minwidth="250px"
                    maxwidth="350px"
                    backgroundcolor={theme.palette.primary.main}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <ButtonText color="#fff">Submit</ButtonText>
                  </ShadowButtonSubmit>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </LoginFormCard>
    </AuthFormLayout>
  );
};
export default JdForm;
