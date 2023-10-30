import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels, skillType } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import { SkillApi, SkillPlatformApi } from '@/swagger_api/api/SkillApi';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { levelWeightConversion } from '@/utils/CommonFunctions/Functions';
import {
  nameOtherValidationContact,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { FieldArray, Form, Formik, useField } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MyFormContext } from './JdStepper';

import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { callApi } from '@/utils/apirequest';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';

const filter = createFilterOptions();
const FilmSelectGet = ({
  name,
  label,
  value,
  onChange,
  onInputChange,
  getOptionDisabled,
  options,
  textLabel,
  otherProps,
  labelValues,
  disabled,
  props,
}) => {
  const [field, meta] = useField(name);
  const theme = useTheme();
  const defaultFunction = () => console.log('Default function');
  const myFunction = getOptionDisabled || defaultFunction;

  return (
    <FormControl
      sx={{ margin: 0.2 }}
      fullWidth
      error={Boolean(meta.touched && meta.error)}
    >
      <Stack spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            ...textLabel,
            color: meta.touched && meta.error ? '#f44336' : '#434343',
          }}
        >
          {labelValues} {otherProps.required ? '*' : ''}
        </Typography>
        <>
          <Autocomplete
            sx={{
              '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                paddingTop: '9px',
              },
            }}
            {...otherProps}
            disabled={disabled}
            getOptionDisabled={getOptionDisabled}
            fullWidth
            value={field.value}
            onChange={onChange}
            onInputChange={onInputChange}
            filterOptions={(options, params) => {
              const filtered = options ? filter(options, params) : [];

              // const { inputValue } = params;
              // const isExisting = options.some(option => inputValue === option.title);
              // if (inputValue !== '' && !isExisting) {
              //   filtered.push({
              //     inputValue,
              //     title: `Add "${inputValue}"`,
              //   });
              // }

              const { inputValue } = params;

              const trimmedInputValue = inputValue.trim(); // trim the input value
              console.log(inputValue, trimmedInputValue);
              const isExisting = options.some(
                option => trimmedInputValue === option.title
              );
              if (trimmedInputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue: trimmedInputValue,
                  title: `Add "${trimmedInputValue}"`,
                });
              }

              return filtered;
            }}
            id={name}
            options={options}
            getOptionLabel={option => {
              if (typeof option === 'string') {
                return option;
              }
              if (option?.inputValue) {
                return option?.inputValue;
              }
              return option?.title;
            }}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderOption={(props, option) => (
              <li {...props}>{option?.title}</li>
            )}
            freeSolo
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  label=""
                  placeholder={label}
                  value={value}
                />
              );
            }}
          />
          {meta.touched && meta.error && (
            <FormHelperText error id={`standard-weight-helper-text-${name}`}>
              {meta.error}
            </FormHelperText>
          )}
        </>
      </Stack>
    </FormControl>
  );
};
const INITIAL_FORM_STATE = {
  skillPlatforms: [
    {
      skillPlatformId: null,
      skillLevel: '',
      experienceInMonths: '',
      skillType: '',
    },
  ],
  softSkill: [],
  traits: [
    {
      name: '',
      weight: 1,
    },
  ],
};

const validationSchema = Yup.object().shape({
  skillPlatforms: Yup.array()
    .min(1, 'At least one Skill Platform is required')
    .of(
      Yup.object().shape({
        skillPlatformId: Yup.mixed()
          .test(
            'input-value-length',
            'Skill Platform should be between 1 and 100 characters',
            value => {
              if (
                typeof value === 'object' &&
                value &&
                value.hasOwnProperty('inputValue')
              ) {
                const { inputValue } = value;
                return inputValue.length >= 1 && inputValue.length <= 100;
              }
              return true;
            }
          )
          .required('Skill Platform is required'),

        experienceInMonths: Yup.number()
          .nullable()
          .when('skillType', {
            is: '1',
            then: Yup.number()
              .required('Experience is required')
              .max(100, 'Experience is too long'),
            otherwise: Yup.number().nullable(),
          }),

        skillLevel: staticDropDownValidation('Skill Level', true, skillLevels),
        skillType: staticDropDownValidation('Skill Type', true, skillType),
      })
    ),
  softSkill: Yup.array(),
  traits: Yup.array()
    .min(1, 'At least one Soft Skill is required')
    .of(
      Yup.object().shape({
        name: nameOtherValidationContact('Name', true),
      })
    ),
});
const JdTechSkillForm = ({ onSubmit }) => {
  const {
    activeStep,
    setActiveStep,
    stepOneData,
    stepTwoData,
    setStepTwoData,
  } = useContext(MyFormContext);

  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);
  const [screenStatus, setScreenStatus] = useState('1');
  const [skill, setSkill] = useState([]);
  const [softSkill, setSoftSkill] = useState([]);
  const [count, setCount] = useState(1);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const skillApi = useMemo(() => new SkillApi(), []);
  const [jdEdit, setJdEdit] = useState('1');
  const [jdInfoInitialValues, setJdInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const isEditing = getFormTypes('Edit_Form') === jdEdit;
  console.log(stepTwoData);

  useEffect(() => {
    // Update traits from stepOneData if available
    if (stepOneData?.jdTraits?.length > 0) {
      const trim = stepOneData?.jdTraits?.map(res => ({
        id: res?.id,
        weight: res?.weight || '0',
        name: res?.name,
      }));
      console.log('trim values', trim);
      setJdInfoInitialValues(prevValues => ({ ...prevValues, traits: trim }));
    }

    console.log(stepTwoData, 'stepTwoData');
    // Update formValues from stepTwoData if available
    if (stepTwoData) {
      let skills = [];
      if (stepTwoData.skills && stepTwoData.skills.length) {
        // Map skills array from stepTwoData
        skills = stepTwoData.skills.map(res => ({
          skillPlatformId: {
            inputValue: res?.name,
            title: res?.name,
          },
          skillLevel: res?.weight ? levelWeightConversion(res?.weight) : '',
          experienceInMonths:
            res?.weight && levelWeightConversion(res?.weight) !== 3 ? '0' : '',
          skillType:
            res?.weight && levelWeightConversion(res?.weight) !== 3 ? 2 : 1,
        }));
      } else {
        skills = INITIAL_FORM_STATE.skillPlatforms;
      }

      let trim = [];
      if (stepTwoData.softSkills && stepTwoData.softSkills.length) {
        // Map softSkills array from stepTwoData
        const softSkills = stepTwoData.softSkills.map(skill => ({
          name: skill.name,
          weight: `${skill.weight || 0}`,
        }));
        trim.push(...softSkills);
      }

      if (stepTwoData.traits && stepTwoData.traits.length) {
        // Map traits array from stepTwoData
        const traits = stepTwoData.traits.map(trait => ({
          name: trait.name,
          weight: `${trait.weight || 0}`,
        }));
        trim.push(...traits);
      } else {
        trim.push(...INITIAL_FORM_STATE.traits);
      }

      // Update formValues with skills and traits
      setJdInfoInitialValues(prevValues => ({
        ...prevValues,
        skillPlatforms: skills,
        traits: trim,
      }));
    }
  }, [stepOneData, stepTwoData]);

  useEffect(() => {
    if (
      !(
        stepOneData?.jdSkills.length > 0 &&
        stepOneData?.jdSoftSkills.length > 0 &&
        stepOneData?.jdTraits.length > 0
      )
    ) {
      const cleanedStepOneData = Object.entries(stepOneData).reduce(
        (cleanedData, [key, value]) => {
          cleanedData[key] = value === null ? '' : value;
          return cleanedData;
        },
        {}
      );
      const opts = {
        jd_id: cleanedStepOneData?.id,
        description: `${cleanedStepOneData?.description}${cleanedStepOneData?.responsibilities}${cleanedStepOneData?.requirements}`,
      };
      setLoading(true);
      callApi('JdSkillExtractionApi', opts)
        .then(response => {
          setLoading(false);
          console.log(
            response,
            'response',
            'parsedData',
            response?.data?.parsedData
          );
          if (response?.data?.parsedData)
            setStepTwoData(response.data.parsedData);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          dispatch(
            setAlertPopup({
              message: 'Something went wrong. Please try again!',
              type: 'error',
              duration: 3000,
            })
          );
        });
    }
  }, [stepOneData, setStepTwoData]);

  const handleAddTraits = arrayHelpers => {
    arrayHelpers.push({
      name: '',
      weight: '0',
    });

    setCount(count + 1);
  };
  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      skillPlatformId: null,
      experienceInMonths: '',
      skillLevel: '',
      skillType: '',
    });
    setCount(count + 1);
  };

  const handleRemove = (arrayHelpers, index, name) => {
    console.log(index, 'index');
    showConfirmationDialog(
      'Are you sure?',
      `You want to delete this ${name}!`,
      () => {
        console.log(arrayHelpers);
        arrayHelpers.remove(index);
        setCount(count - 1);
      },
      () => {
        dispatch(
          setAlertPopup({
            message: 'You have reverted the delete action',
            type: 'info',
            duration: 3000,
          })
        );
      }
    );
  };

  const GetSoftSkillName = useCallback(async () => {
    try {
      const opts = { skillType: 2 };
      const response = await skillApi.apiSkillGetAllByFilterGet(opts);
      if (response.body.result) {
        const trim =
          response.body.result.map(res => ({
            year: res.id,
            title: res.name,
          })) || [];
        setSoftSkill(trim);
      }
    } catch (error) {
      console.log(error);
    }
  }, [skillApi]);

  const GetMainSkillName = useCallback(async () => {
    try {
      const opts = { skillType: 1 };
      const response = await skillPlatformApi.apiSkillPlatformGet(opts);
      if (response.body.result) {
        const trim =
          response.body.result.map(res => ({
            value: res.skillId,
            name: res.name,
            title: res.searchText,
            id: res.id,
          })) || [];
        setSkill(trim);
      }
    } catch (error) {
      console.log(error);
    }
  }, [skillPlatformApi]);

  useEffect(() => {
    GetMainSkillName();
    GetSoftSkillName();
  }, [GetMainSkillName, GetSoftSkillName]);

  return (
    <AuthFormLayout>
      {loading && (
        <Typography>Please wait Skill is still Extracting</Typography>
      )}
      {!loading && (
        <Formik
          enableReinitialize
          initialValues={{ ...jdInfoInitialValues }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
            touched,
            values,
            resetForm,
          }) => (
            <Stack>
              <Form>
                <Grid container spacing={2} id="section-1">
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h1"
                      sx={{
                        paddingY: '10px',
                        paddingX: '4px',
                        alignSelf: 'center',
                        fontSize: '16px',
                      }}
                      weight="400"
                    >
                      Skills
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <LoginFormCard>
                      <FieldArray name="skillPlatforms">
                        {arrayHelpers => (
                          <>
                            {values.skillPlatforms &&
                              values.skillPlatforms.map(
                                (skillPlatforms, index) => (
                                  <Grid
                                    container
                                    spacing={2}
                                    key={index}
                                    justifyContent="space-between"
                                    alignItems={'flex-start'}
                                  >
                                    <Grid item xs={3}>
                                      <Stack spacing={1.5}>
                                        <FilmSelectGet
                                          disabled={
                                            values.skillPlatforms[index]
                                              .skillPlatformId !== null &&
                                            values.skillPlatforms[
                                              index
                                            ].hasOwnProperty('candidateSkillId')
                                              ? isEditing
                                              : false
                                          }
                                          labelValues="Skill Platform"
                                          otherProps={otherPropsRequired}
                                          textLabel={textLabel}
                                          options={skill}
                                          getOptionDisabled={option => {
                                            const isDisabled =
                                              values?.skillPlatforms.some(
                                                p =>
                                                  p.skillPlatformId?.id ===
                                                    option.id ||
                                                  p.skillPlatformId?.title ===
                                                    option.title
                                              );
                                            const isAddOption =
                                              option.title.includes('Add');
                                            return isDisabled && !isAddOption;
                                          }}
                                          touched={touched}
                                          errors={errors}
                                          name={`skillPlatforms.${index}.skillPlatformId`}
                                          label="Select a Skill Platform"
                                          value={
                                            values?.skillPlatforms
                                              ?.skillPlatformId
                                          }
                                          onChange={(e, value) => {
                                            setFieldValue(
                                              `skillPlatforms.${index}.skillPlatformId`,
                                              value ? value : ''
                                            );
                                          }}
                                        />
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={3}>
                                      <TextfieldWrapper
                                        name={`skillPlatforms.${index}.experienceInMonths`}
                                        readOnly={false}
                                        textLabelStyle={textLabel}
                                        textLabel="Experience(yrs)"
                                        otherProps={
                                          values.skillPlatforms[index]
                                            .skillType === 1
                                            ? otherPropsRequired
                                            : otherPropsNotRequired
                                        }
                                        onChange={e => {
                                          setFieldValue(
                                            `skillPlatforms.${index}.experienceInMonths`,
                                            e.target.value.replace(
                                              /[^0-9]/g,
                                              ''
                                            )
                                          );
                                        }}
                                      />
                                    </Grid>

                                    <Grid item xs={2}>
                                      <SelectWrapper
                                        name={`skillPlatforms.${index}.skillLevel`}
                                        textLabel="Skill Level"
                                        textLabelStyle={textLabel}
                                        options={skillLevels}
                                        placeholder="Select Skill Level"
                                        inputProps={otherPropsRequired}
                                      />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <SelectWrapper
                                        name={`skillPlatforms.${index}.skillType`}
                                        textLabel="Skill Type"
                                        textLabelStyle={textLabel}
                                        options={skillType}
                                        placeholder="Select Skill Type"
                                        inputProps={otherPropsRequired}
                                      />
                                    </Grid>
                                    <Grid item xs={2} alignSelf="center">
                                      <Stack
                                        direction="column"
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        {values.skillPlatforms?.length > 1 && (
                                          <IconButton
                                            type="button"
                                            disableRipple
                                            size="large"
                                            aria-label="back"
                                            color="primary"
                                            onClick={() =>
                                              handleRemove(
                                                arrayHelpers,
                                                index,
                                                'Skill Platform'
                                              )
                                            }
                                          >
                                            <Delete />
                                          </IconButton>
                                        )}
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                )
                              )}
                          </>
                        )}
                      </FieldArray>
                      <Stack alignItems={'flex-end'}>
                        <Tooltip
                          title="Add Skill Platform"
                          arrow
                          placement="right"
                        >
                          <IconButton
                            type="button"
                            disableRipple
                            size="large"
                            aria-label="back"
                            color="primary"
                            onClick={() => handleAdd(values.skillPlatforms)}
                          >
                            <AddCircleOutlineOutlined />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </LoginFormCard>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <LoginFormCard>
                      <Stack
                        direction="column"
                        spacing={2}
                        sx={{ width: '100%' }}
                      >
                        <GetValuesAutocomplete
                          multiple={true}
                          otherProps={otherPropsNotRequired}
                          options={softSkill}
                          textLabelStyle={textLabel}
                          name="softSkill"
                          label="Soft Skills"
                          placeHolder="Select Soft Skills"
                          value={values.softSkill}
                          onChange={(e, value) => {
                            setFieldValue('softSkill', value);
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h1"
                            sx={{ ...textLabel, mb: 2 }}
                            weight="400"
                          >
                            Other Soft Skills
                          </Typography>
                          <FieldArray name="traits">
                            {arrayHelpers => (
                              <>
                                {values.traits &&
                                  values.traits.map((traits, index) => (
                                    <Grid
                                      container
                                      spacing={2}
                                      key={index}
                                      justifyContent="flex-start"
                                      alignItems={'flex-start'}
                                    >
                                      <Grid item xs={4}>
                                        <TextfieldWrapper
                                          name={`traits.${index}.name`}
                                          readOnly={false}
                                          textLabelStyle={textLabel}
                                          textLabel="Name"
                                          otherProps={otherPropsRequired}
                                        />
                                      </Grid>

                                      <Grid item xs={2} alignSelf="center">
                                        <Stack
                                          direction="column"
                                          spacing={1}
                                          justifyContent="center"
                                          alignItems="center"
                                        >
                                          {values.traits?.length > 1 && (
                                            <IconButton
                                              type="button"
                                              disableRipple
                                              size="large"
                                              aria-label="back"
                                              color="primary"
                                              onClick={() =>
                                                handleRemove(
                                                  arrayHelpers,
                                                  index,
                                                  'other Soft Skill'
                                                )
                                              }
                                            >
                                              <Delete />
                                            </IconButton>
                                          )}
                                        </Stack>
                                      </Grid>
                                    </Grid>
                                  ))}

                                <Stack alignItems={'center'}>
                                  <Tooltip
                                    title="Add Soft Skill"
                                    arrow
                                    placement="right"
                                  >
                                    <IconButton
                                      type="button"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                      onClick={() =>
                                        handleAddTraits(values.traits)
                                      }
                                      // disabled={count >= 5}
                                    >
                                      <AddCircleOutlineOutlined />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </>
                            )}
                          </FieldArray>
                        </Box>
                      </Stack>
                    </LoginFormCard>
                  </Grid>

                  <Grid item xs={12} md={12}></Grid>

                  <Grid item xs={12} md={8}>
                    <Stack direction={'row'} spacing={2}>
                      {false && (
                        <ShadowButtonSubmit
                          height="50px"
                          width="100%"
                          minwidth="250px"
                          maxwidth="350px"
                          backgroundcolor={theme.palette.primary.main}
                          type="button"
                          onClick={() => setActiveStep(activeStep - 1)}
                        >
                          <ButtonText color="#fff">Back</ButtonText>
                        </ShadowButtonSubmit>
                      )}

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
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            </Stack>
          )}
        </Formik>
      )}
    </AuthFormLayout>
  );
};
export default JdTechSkillForm;
