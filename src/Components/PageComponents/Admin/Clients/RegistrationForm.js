import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import Checkbox from '@/formComponents/FormsUI/Checkbox';
import CkEditorForm from '@/formComponents/FormsUI/CkEditorForm';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { MyFormContext } from '@/pageComponents/Admin/Clients/JDStepper';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { addressType } from '@/src/data/DropDownValues';
import { BusinessVerticalApi, CityApi, StateApi } from '@/swagger_api/api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { gstRegexp, otpRegExp, pincodeRegExp, urlRegExp } from '@/utils/regex';
import {
  dropdownValidationSchema,
  nameOtherValidation,
  nameValidatorNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { Grid, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  name: '',
  gstNumber: '',
  // status: '',
  isBranched: true,
  webSite: '',
  companySize: '',
  dateOfOnBoarding: '',
  typeOfService: '',
  // isActive: true,
  businessVerticalId: '',

  companyProfile: '',

  clientAddresses: [
    {
      addressType: '',

      address: {
        street: '',

        zipCode: '',

        countryId: 'India',

        stateId: '',

        cityId: '',
      },
    },
  ],
};

const FORM_VALIDATION = Yup.object().shape({
  name: nameValidatorNoRegex('Name', true),
  gstNumber: Yup.string()
    .trim()
    .min(15, 'The Gst Number must be 15 digits long')
    .max(15, 'The Gst Number must be 15 digits long')
    .matches(gstRegexp, 'Invalid Gst Number')
    .required('Gst Number is required'),
  //status: Yup.string().required('Status is required'),
  // status: staticDropDownValidation('Status', true, status),
  isBranched: Yup.boolean().required('Is Branched is required'),
  webSite: Yup.string()
    .trim()
    .min(1)
    .max(100, 'Website cannot be more than 100 characters')
    .matches(urlRegExp, {
      message: 'Please provide a valid URL',
      excludeEmptyString: true,
    })
    .min(1, 'Website is required')
    .max(100, 'Website cannot be more than 100 characters')
    .required('Website is required'),
  companySize: Yup.string()
    .trim()
    .matches(otpRegExp, 'Company Size must be a number')
    .min(1, 'Company Size is required')
    .max(6, 'Company Size cannot exceed 6 digits'),
  dateOfOnBoarding: Yup.date()
    .nullable()
    .max(new Date(), 'Date of Onboarding cannot be in the future')
    .required('Date of Onboarding is required'),
  typeOfService: nameOtherValidation('Type of Service', true),
  // isActive: Yup.boolean().required('is Active is required'),
  businessVerticalId: dropdownValidationSchema(
    'Business Vertical',
    1,
    255,
    true
  ),
  companyProfile: Yup.string().required('Company Profile is required'),
  clientAddresses: Yup.array().of(
    Yup.object().shape({
      //addressType: Yup.string().required('Address type is required'),
      addressType: staticDropDownValidation('Address Type', true, addressType),
      address: Yup.object().shape({
        street: Yup.string()
          .min(1)
          .max(100, 'Street cannot be more than 100 characters')
          .required('Street is required'),
        zipCode: Yup.string()
          .matches(pincodeRegExp, 'Pin Code must be a 6-digit number')
          .required('Pin Code is required'),
        //countryId: Yup.string().required('Country is required'),
        stateId: dropdownValidationSchema('State ', 1, 100, true),
        cityId: dropdownValidationSchema('City ', 1, 100, true),
      }),
    })
  ),
});

const RegistrationForm = ({ onSubmit, type }) => {
  const theme = useTheme();

  const { activeStep, stepOneData } = useContext(MyFormContext);
  const [readOnly, setReadOnly] = useState(true);
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [businessVerticalNames, setBusinessVerticalNames] = useState([]);
  const stateApi = useMemo(() => new StateApi(), []);
  const cityApi = useMemo(() => new CityApi(), []);
  const businessVerticalApi = useMemo(() => new BusinessVerticalApi(), []);

  const [initialValues, setInitialValues] = useState({
    ...INITIAL_FORM_STATE,
  });

  useEffect(() => {
    console.log('step one data', stepOneData, activeStep);
    if (stepOneData) {
      const {
        id,
        name = '',
        gstNumber = '',
        // status = 1,
        isBranched = true,
        webSite = '',
        companySize = '',
        dateOfOnBoarding = '',
        typeOfService = '',
        // isActive = true,
        businessVertical,
        companyProfile = '',
        clientAddresses = [],
      } = stepOneData;

      const modifiedFormData = {
        id,
        name,
        gstNumber,
        // status,
        isBranched,
        webSite,
        companySize,
        dateOfOnBoarding,
        typeOfService,
        // isActive,
        businessVerticalId: businessVertical?.id
          ? {
              title: businessVertical.name,
              year: businessVertical.id,
            }
          : '',
        companyProfile,
        clientAddresses: clientAddresses.map(({ addressType, address }) => ({
          addressType: addressType ?? 2,
          address: {
            street: address?.street ?? '',
            zipCode: address?.zipCode ?? '',
            countryId: address?.country?.name ?? 'India',
            stateId: address?.state?.id
              ? {
                  title: address.state.name,
                  year: address.state.id,
                }
              : '',
            cityId: address?.city?.id
              ? {
                  title: address.city.name,
                  year: address.city.id,
                }
              : '',
          },
        })),
      };

      setInitialValues(modifiedFormData);
      console.log('nnnnn', modifiedFormData);
    }
  }, [stepOneData, type]);

  useEffect(() => {
    handleInputChangeStateName('');
    handleInputChangeCityName('');
    handleInputChangeBusinessVerticalName('');
  }, []);

  const handleInputChangeStateName = async event => {
    try {
      const response = await stateApi.apiStateGetAllByCountryIdCountryIdGet(77);
      const trim =
        response?.body?.result?.map((res, index) => ({
          title: res?.name,
          year: res?.id,
        })) || [];
      setStateNames(trim);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChangeCityName = async stateId => {
    if (typeof stateId !== 'number') {
      return; // or throw an error, depending on your use case
    }

    try {
      const response = await cityApi.apiCityGetAllByStateIdStateIdGet(stateId);
      const trim =
        response?.body?.result?.map((res, index) => ({
          title: res?.name,
          year: res?.id,
        })) || [];
      setCityNames(trim);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChangeBusinessVerticalName = debounce(async event => {
    await businessVerticalApi
      .apiBusinessVerticalGet()
      .then(async response => {
        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.name,
            year: res?.id,
          })) || [];
        setBusinessVerticalNames(trim);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 300);

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
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="name"
                    textLabel="Name"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="gstNumber"
                    textLabel="Gst Number"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <SelectWrapper
                    name="status"
                    textLabel="Status"
                    textLabelStyle={textLabel}
                    options={status}
                    placeholder="Select status"
                    inputProps={otherPropsRequired}
                  />
                </Grid> */}

                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="webSite"
                    textLabel="Website"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="companySize"
                    textLabel="Company Size"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsNotRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiDateTimePicker
                    readOnly={values?.id}
                    formatValue={'date'}
                    textLabelStyle={textLabel}
                    name="dateOfOnBoarding"
                    textLabel="Date of Onboarding"
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="typeOfService"
                    textLabel="Type of Service"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <HandleInputChangeAutocomplete
                    isNotAdd={true}
                    readOnly={false}
                    otherProps={otherPropsRequired}
                    options={businessVerticalNames}
                    handleInputChange={handleInputChangeBusinessVerticalName}
                    name="businessVerticalId"
                    textLabelStyle={textLabel}
                    label="Business Vertical"
                    placeHolder="Select Business Vertical"
                    value={values?.businessVerticalId}
                    onChange={(e, value) => {
                      setFieldValue('businessVerticalId', value);
                    }}
                  />
                </Grid>

                {/* <Grid item xs={12} md={6}>
                  <Checkbox
                    name="isActive"
                    legend="Is Active"
                    label="Is Active"
                  />
                </Grid> */}
                <Grid item xs={12} md={12}>
                  <Checkbox
                    name="isBranched"
                    legend="Is Branched"
                    label="Is Branched"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CkEditorForm
                    otherProps={otherPropsRequired}
                    textLabelStyle={textLabel}
                    name="companyProfile"
                    label="Company Profile"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectWrapper
                    name="clientAddresses[0].addressType"
                    textLabel="Address Type"
                    textLabelStyle={textLabel}
                    options={addressType}
                    placeholder="Select Address Type"
                    inputProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="clientAddresses[0].address.street"
                    textLabel="Street"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name="clientAddresses[0].address.zipCode"
                    textLabel="Pin Code"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <TextfieldWrapper
                    name='clientAddresses[0].address.countryId'
                    textLabel='Country'
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                    readOnly={readOnly}
                  /> */}
                  <TextfieldWrapper
                    name={
                      type === 'edit'
                        ? 'clientAddresses[0].address.country.name'
                        : 'clientAddresses[0].address.countryId'
                    }
                    textLabel="Country"
                    textLabelStyle={textLabel}
                    otherProps={otherPropsRequired}
                    readOnly={readOnly}
                  />
                </Grid>
                <Grid item xs={12} md={6} alignSelf="flex-start">
                  <HandleInputChangeAutocomplete
                    isNotAdd={true}
                    readOnly={false}
                    otherProps={otherPropsRequired}
                    options={stateNames}
                    handleInputChange={handleInputChangeStateName}
                    name="clientAddresses[0].address.stateId"
                    textLabelStyle={textLabel}
                    label="Select State"
                    placeHolder="Select State"
                    value={values?.clientAddresses[0]?.address?.stateId}
                    onChange={(e, value) => {
                      setFieldValue(
                        'clientAddresses[0].address.stateId',
                        value
                      );
                      if (value) {
                        handleInputChangeCityName(value?.year);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} alignSelf="flex-start">
                  <HandleInputChangeAutocomplete
                    isNotAdd={true}
                    readOnly={false}
                    otherProps={otherPropsRequired}
                    options={cityNames}
                    handleInputChange={handleInputChangeCityName}
                    name="clientAddresses[0].address.cityId"
                    textLabelStyle={textLabel}
                    label="Select City"
                    placeHolder="Select City"
                    value={values?.clientAddresses[0]?.address?.cityId}
                    onChange={(e, value) => {
                      setFieldValue('clientAddresses[0].address.cityId', value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} md={8} textAlign="center">
                      <ShadowButtonSubmit
                        height="50px"
                        width="100%"
                        minwidth="250px"
                        maxwidth="250px"
                        backgroundcolor={theme.palette.primary.main}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        <ButtonText color="#fff">Submit</ButtonText>
                      </ShadowButtonSubmit>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </LoginFormCard>
    </AuthFormLayout>
  );
};
export default RegistrationForm;
