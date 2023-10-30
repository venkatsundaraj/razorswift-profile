import ProfileCard from '@/cardComponents/ProfileCard';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  commonStyle,
  ExperienceBadge,
  SkillBadge,
  SkillMainName,
  SkillSubName,
} from '@/pageComponents/Profile/Edit/Skills/CommonComponentsSkills';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { skillLevels } from '@/src/data/Enum';
import {
  CandidateSkillApi,
  CandidateSkillPlatformApi,
  SkillApi,
  SkillPlatformApi,
} from '@/swagger_api/api/CandidateSkillApi';
import { convertMonthsToYearsAndMonths } from '@/utils/CommonFunctions/DateRelatedFunction';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { handleErrors } from '@/utils/CommonFunctions/ErrorFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useTheme } from '@emotion/react';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Autocomplete,
  Button,
  createFilterOptions,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { FieldArray, Form, Formik, useField } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const filter = createFilterOptions();

const FilmSelectGet = ({
  name,
  label,
  value,
  onChange,
  onInputChange,
  touched,
  errors,
  options,
  textLabel,
  otherProps,
  labelValues,
  disabled,
}) => {
  const [field, meta] = useField(name);
  const theme = useTheme();

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
            fullWidth
            value={field.value}
            onChange={onChange}
            onInputChange={onInputChange}
            filterOptions={(options, params) => {
              const filtered = options ? filter(options, params) : [];

              const { inputValue } = params;
              const isExisting = options.some(
                option => inputValue === option.title
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
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

const validationSchema = Yup.object().shape({
  skillId: Yup.mixed().required(' skillId Required'),
  skillPlatforms: Yup.array()
    .min(1, 'At least one skill platform is required')
    .of(
      Yup.object().shape({
        skillPlatformId: Yup.mixed().required(' skillPlatformId Required'),
        experienceInMonths: Yup.string().required('Experience  is required'),
        skillLevel: Yup.string().required('Skill level  is required'),
      })
    ),
});

var initialValues = {
  skillType: 1,
  skillId: null,
  skillPlatforms: [
    {
      skillPlatformId: null,
      skillLevel: 1,
      experienceInMonths: '',
    },
  ],
};

const TechnicalSkillsForm = ({
  setTechnicalInfo,
  technicalInfo,
  technicalEdit,
  setTechnicalEdit,
  getData,
}) => {
  const [count, setCount] = useState(1);
  const skillPlatformApi = new SkillPlatformApi();
  const theme = useTheme();
  const [screenStatus, setScreenStatus] = useState('1');
  const userDetails = localStorageUtil.getItem('userDetails');
  const [technicalSkillsInitialValues, setTechnicalSkillsInitialValues] =
    useState(initialValues);
  const [technicalInfoEdit, setTechnicalInfoEdit] = useState(initialValues);
  const isAddingViewing = getFormTypes('Add_View') === screenStatus;
  const isEditing = getFormTypes('Edit_Form') === screenStatus;
  const isAdding = getFormTypes('Add_Form') === screenStatus;
  const [skill, setSkill] = useState([]);
  const [skillalias, setSkillalias] = useState([]);

  useEffect(() => {
    if (screenStatus === '3' && Object.keys(setTechnicalInfoEdit).length != 0) {
      // setTechnicalSkillsInitialValues(technicalInfoEdit);
    }
  }, [technicalInfoEdit, screenStatus]);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      skillPlatformId: null,
      experienceInMonths: '',
      skillLevel: 1,
    });
    setCount(count + 1);
  };

  const handleRemove = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    setCount(count - 1);
  };
  const textLabel = {
    color: ' rgba(106, 106, 106, 1)',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '15.6px',
    textAlign: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
      fontSize: '11px',
      lineHeight: '13.2px',
    },
  };
  useEffect(() => {
    if (screenStatus === '3') {
      GetMainSkillEdit;
    } else if (screenStatus === '2' || screenStatus === '1') {
      GetMainSkillName();
      setTechnicalSkillsInitialValues(initialValues);
      setSkillalias([]);
    }

    // GetMainSkillName();
  }, [screenStatus]);

  async function GetMainSkillName() {
    const opts = { skillType: 1 };
    await skillPlatformApi
      .apiSkillPlatformGet(opts)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            value: res?.skillId, //main skill id
            title: res?.searchText, //text
            id: res?.id, //sub skill id
          }));
          setSkill(trim);
        } else if (response.body.message === 'No Records Found.') {
          setSkill([]);
        }
      })
      .catch(handleErrors);
  }

  async function GetSkillAliasName(value, setFieldValue) {
    await skillPlatformApi
      .apiSkillPlatformGetAllByEntityIdEntityIdGet(value.value)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            value: res?.skillId, //main skill id
            title: res?.name, //text
            id: res?.id, //sub skill id
          }));
          console.log('skillalias', trim);

          setSkillalias(trim);

          if (
            true ||
            technicalSkillsInitialValues.skillPlatforms.length === 1 ||
            technicalSkillsInitialValues.skillPlatforms[0].skillPlatformId == ''
          ) {
          } else {
          }
          console.log(value, 'skillaliasdrop down');
          setFieldValue('skillPlatforms.[0].skillPlatformId', {
            ...value,
            title: value.title.split(',')[1].trim(),
          });
        } else if (response.body.message === 'No Records Found.') {
          setSkillalias([]);
        }
      })
      .catch(handleErrors);
  }

  async function GetMainSkillEdit(skillArray1) {
    console.log('skilllaraya1', skillArray1);
    const skillApi = new SkillApi();
    await skillApi
      .apiSkillGet()
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            title: res?.name, //text
            id: res?.id, //sub skill id
          }));
          setSkill(trim);
          if (skillArray1.skillId.id === null) {
            setTechnicalSkillsInitialValues(skillArray1);
          } else {
            GetSkillAliasName1(skillArray1);
          }
        }
      })
      .catch(handleErrors);
  }
  async function GetSkillAliasName1(skillArray1) {
    console.log(skillArray1.skillId.id);
    await skillPlatformApi
      .apiSkillPlatformGetAllByEntityIdEntityIdGet(skillArray1.skillId.id)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            // value: res?.skillId, //main skill id
            title: res?.name, //text
            id: res?.id, //sub skill id
          }));
          console.log('skillalias', trim);
          console.log('skillArray1', skillArray1);

          setSkillalias(trim);
          console.log('tech', technicalSkillsInitialValues);
          setTechnicalSkillsInitialValues(skillArray1);
          setTechnicalEdit(skillArray1);
        } else if (response.body.message === 'No Records Found.') {
          setSkillalias([]);
        }
      })
      .catch(handleErrors);
  }

  const addSkill = async (post, { resetForm }) => {
    const candidateSkillApi = new CandidateSkillApi();

    // setLoading(true);
    const opts = {
      body: post,
    };

    await candidateSkillApi
      .apiCandidateSkillPost(opts)
      .then(async response => {
        // setLoading(false);
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.body.message,
          });
          setScreenStatus('1');
          getData();
          resetForm();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: response.body.message,
          });
        }
      })
      .catch(handleErrors);
  };
  const addSkillPlatForm = async post => {
    const candidateSkillPlatformApi = new CandidateSkillPlatformApi();

    // setLoading(true);
    const opts = {
      body: post,
    };

    await candidateSkillPlatformApi
      .apiCandidateSkillPlatformPost(opts)
      .then(async response => {
        // setLoading(false);
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.body.message,
          });
          // setScreenStatus('1');
          getData();
          getCandidateSkill(post.candidateSkillId);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: response.body.message,
          });
        }
      })
      .catch(handleErrors);
  };
  const editSkillPlatForm = async post => {
    const candidateSkillPlatformApi = new CandidateSkillPlatformApi();
    // setLoading(true);
    const opts = {
      body: post,
    };

    await candidateSkillPlatformApi
      .apiCandidateSkillPlatformPut(opts)
      .then(async response => {
        // setLoading(false);

        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.body.message,
          });
          // setScreenStatus('1');
          getCandidateSkill(post.candidateSkillId);
          getData();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: response.body.message,
          });
        }
      })
      .catch(function (error) {
        // setLoading(false);
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  const getCandidateSkill = async post => {
    console.log('getCandidateSkill', post);
    const candidateSkillApi = new CandidateSkillApi();
    const skillArray2 = {
      candidateId: skill.candidateId,
      id: skill.id,
      skillId: {
        id: skill?.skillId ? skill.skillId : null,
        title: skill?.name ? skill.name : skill?.skill?.name,
      },
      skillPlatforms: [
        {
          skillPlatformId: '',
          skillLevel: 3,
          experienceInMonths: 40,
        },
      ],
    };
    // setTechnicalInfoEdit(skillArray2);
    // setLoading(true);
    const opts = {
      body: post,
    };

    await candidateSkillApi
      .apiCandidateSkillIdGet(post)
      .then(async response => {
        // setLoading(false);
        console.log(response.body);

        if (response.body.message === 'Record Fetched Successfully.') {
          const trim = response?.body?.result;
          console.log('treim,trim', trim);
          const skillArray1 = {
            candidateId: trim.candidateId,
            id: trim.id,
            skillId: {
              id: trim?.skillId ? trim.skillId : null,
              title: trim?.name ? trim.name : trim?.trim?.name,
            },
            skillPlatforms: trim.skillPlatforms.map(skillPlatform => ({
              skillPlatformId: {
                id: skillPlatform?.skillId
                  ? skillPlatform.skillId
                  : skillPlatform?.skillPlatform?.id,
                title: skillPlatform?.name
                  ? skillPlatform.name
                  : skillPlatform?.skillPlatform?.name,
              },
              id: skillPlatform.id,
              candidateSkillId: skillPlatform.candidateSkillId,
              skillLevel: skillPlatform.skillLevel,
              experienceInMonths: skillPlatform.experienceInMonths,
            })),
          };
          console.log(technicalInfoEdit);
          setTechnicalInfoEdit(skillArray1);
        } else if (response.body.message === 'No Records Found.') {
          setSkillalias([]);
        }
      })
      .catch(handleErrors);
  };
  const deleteSkillPlatForm = async post => {
    console.log(post);
    const candidateSkillPlatformApi = new CandidateSkillPlatformApi();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Skill!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async result => {
      if (result.isConfirmed) {
        await candidateSkillPlatformApi
          .apiCandidateSkillPlatformIdDelete(post)
          .then(async response => {
            // setLoading(false);
            if (response.body.message === 'Created Successfully.') {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.body.message,
              });
              // setScreenStatus('1');
              getData();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: response.body.message,
              });
            }
          })
          .catch(handleErrors);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Rejected!', 'You have reverted the delete action', 'info');
      }
    });
  };

  const SubmitDetails = async (values, { resetForm }) => {
    // setTechnicalSkillsInitialValues(values);

    if (screenStatus === '3') {
      console.log('edit', values);
      // const skillArray = values.skillAliases;
      // const skillAliasArrayMapped = skillArray.map(skill => {
      //   const newSkill = {
      //     skillAliasId: skill.skillAliasId.year,
      //     skillLevel: skill.skillLevel,
      //     experienceInMonths: skill.experienceInMonths,
      //   };
      //   if (skill.id) {
      //     newSkill.id = skill.id;
      //   }
      //   return newSkill;
      // });
      // const post = {
      //   skillType: 1,
      //   candidateId: userDetails?.candidateId,
      //   id: values.id,
      //   skillId: values.skillId.year,
      //   skillAliases: skillAliasArrayMapped,
      // };

      // editSkill(post, { resetForm });
    } else if (screenStatus === '2') {
      const PostingValues = {
        name: 'Automation',
        skillType: 1,
        candidateId: 4,
        skillPlatforms: [
          {
            name: 'Testproject',
            skillLevel: 1,
            experienceInMonths: 10,
          },
        ],
      };
      console.log('values submit', values);

      const skillPlatformArray = values.skillPlatforms;
      const skillPlatformArrayMapped = skillPlatformArray.map(skill => ({
        skillPlatformId: skill.skillPlatformId.id
          ? skill.skillPlatformId.id
          : null,
        name: skill.skillPlatformId.inputValue
          ? skill.skillPlatformId.inputValue
          : skill.skillPlatformId.title,
        skillLevel: skill.skillLevel,
        experienceInMonths: skill.experienceInMonths,
      }));
      const post = {
        name: values.skillId.inputValue
          ? values.skillId.inputValue
          : values.skillId.title.split(',')[0].trim(),
        skillType: 1,
        candidateId: userDetails?.candidateId,
        skillId: values.skillId.value ? values.skillId.value : null,
        skillPlatforms: skillPlatformArrayMapped,
      };
      console.log('add skill', post);

      addSkill(post, { resetForm });
    }
  };

  function filterSkillAlias(skillalias, values) {
    // Create a new array with skillalias items that are not in values.skillPlatforms array
    const filteredSkillAlias = skillalias.filter(skill => {});
    console.log('Filtered skillalias:', filteredSkillAlias);

    return filteredSkillAlias;
  }

  // function filterSkillAlias(arr2, arr1) {
  //   if (arr2.length > 0) {
  //     console.log(arr2, arr1);
  //     const uniqueObjs = arr1
  //       .filter(obj1 => obj1.skillPlatformId != null || obj1.skillPlatformId != '')
  //       .map(obj1 => {
  //         obj1;
  //       });
  //     console.log('uniqueObjs', uniqueObjs);

  //     const filteredObjs = arr2.filter(obj2 => {
  //       console.log('obj2', obj2);
  //       obj2;
  //     });
  //     console.log(filteredObjs);

  //     return arr2;
  //   }
  //   return arr2;
  // }

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12}>
            <ProfileCard
              styleProps={{
                ...{ commonStyle },
              }}
            >
              <Stack direction="column" justifyContent="space-evenly">
                <CardSectionHeader>Technical Skills</CardSectionHeader>
                <TechnicalSkills
                  setTechnicalInfoEdit={setTechnicalInfoEdit}
                  technicalInfo={technicalInfo}
                  setScreenStatus={setScreenStatus}
                  GetMainSkillEdit={GetMainSkillEdit}
                />
              </Stack>
            </ProfileCard>
          </Grid>
        </Grid>
      </Stack>
      {isAddingViewing && (
        <Button
          sx={{ maxWidth: '200px' }}
          variant="contained"
          onClick={() => {
            setScreenStatus('2');
            setTechnicalSkillsInitialValues({
              skillType: 1,
              skillId: '',
              skillPlatforms: [
                {
                  skillPlatformId: '',
                  skillLevel: 1,
                  experienceInMonths: '',
                },
              ],
            });
          }}
        >
          Add new technical skill
        </Button>
      )}
      {isAdding || isEditing ? (
        <FormHeaderComponents
          title={`${isEditing ? 'Edit' : 'Add'} Technical Skills`}
          isButtonNotRequired={true}
        />
      ) : null}
      {isAdding || isEditing ? (
        <Formik
          enableReinitialize
          initialValues={technicalSkillsInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            SubmitDetails(values, { resetForm });
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
              <Grid container spacing={2}>
                <Grid item container xs={12}>
                  <Grid item xs={10} spacing={1}>
                    <FilmSelectGet
                      disabled={isEditing}
                      otherProps={{ ...otherProps, required: false }}
                      labelValues="Skill name"
                      textLabel={textLabel}
                      options={skill}
                      touched={touched}
                      errors={errors}
                      name="skillId"
                      label="Select a skill name"
                      value={values.skillId}
                      onChange={(e, value) => {
                        setTechnicalSkillsInitialValues(initialValues);

                        setFieldValue('skillPlatforms', [
                          {
                            skillPlatformId: '',
                            skillLevel: 1,
                            experienceInMonths: '',
                          },
                        ]);

                        setSkillalias([]);

                        if (value) {
                          if ('inputValue' in value) {
                            console.log('values added', value);
                            setFieldValue('skillId', value);
                          } else {
                            setFieldValue('skillId', {
                              ...value,
                              title: value.title.split(',')[0].trim(),
                            });

                            GetSkillAliasName(value, setFieldValue);
                          }
                        } else {
                          console.log('hi');
                          setTechnicalSkillsInitialValues({
                            skillType: 1,
                            skillId: '',
                            skillPlatforms: [
                              {
                                skillPlatformId: '',
                                skillLevel: 1,
                                experienceInMonths: '',
                              },
                            ],
                          });
                        }
                      }}
                      on
                    />
                  </Grid>
                  <Grid item xs={2} alignSelf="center">
                    {isEditing && (
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
                          onClick={() => handleRemove(arrayHelpers, index)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    )}
                  </Grid>
                </Grid>
                {isAdding && (
                  <Grid item xs={12}>
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
                                  <Grid item xs={4}>
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
                                        labelValues="Skill version/framework"
                                        otherProps={{ ...otherProps }}
                                        textLabel={textLabel}
                                        options={skillalias}
                                        touched={touched}
                                        errors={errors}
                                        name={`skillPlatforms.${index}.skillPlatformId`}
                                        label="Select a skill version"
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
                                      textLabel="Experience(Months)"
                                      otherProps={{ ...otherProps }}
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <SelectWrapper
                                      name={`skillPlatforms.${index}.skillLevel`}
                                      textLabel="Skill Level"
                                      textLabelStyle={textLabel}
                                      options={skillLevels}
                                      placeholder="Select level"
                                      inputProps={otherProps}
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
                                          handleRemove(arrayHelpers, index)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              )
                            )}
                        </>
                      )}
                    </FieldArray>
                    <Stack alignItems={'flex-end'}>
                      <Tooltip title="Add version" arrow placement="right">
                        <IconButton
                          type="button"
                          disableRipple
                          size="large"
                          aria-label="back"
                          color="primary"
                          onClick={() => handleAdd(values.skillPlatforms)}
                          // disabled={count >= 5}
                        >
                          <AddCircleOutlineOutlined />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Grid>
                )}
                {isAdding && (
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setScreenStatus('1');
                          setFieldValue('skillId', null);
                          setFieldValue('skillPlatforms', [
                            {
                              skillPlatformId: null,
                              skillLevel: 2,
                              experienceInMonths: '22',
                            },
                          ]);
                        }}
                      >
                        cancel
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      ) : null}
      {isEditing && (
        <>
          {technicalInfoEdit.skillPlatforms &&
            technicalInfoEdit.skillPlatforms.map((skillPlatforms, index) => (
              <>
                <Formik
                  enableReinitialize
                  initialValues={{ ...technicalInfoEdit.skillPlatforms[index] }}
                  validationSchema={validationSchema2}
                  onSubmit={async values => {
                    console.log(values);
                    if (values.hasOwnProperty('candidateSkillId')) {
                      const SkillPlatformValues = {
                        skillPlatformId: values.skillPlatformId.id
                          ? values.skillPlatformId.id
                          : null,
                        name: values.skillPlatformId.inputValue
                          ? values.skillPlatformId.inputValue
                          : values.skillPlatformId.title,
                        skillLevel: values.skillLevel,
                        experienceInMonths: values.experienceInMonths,
                        candidateSkillId: values.candidateSkillId,
                        id: values.id,
                      };
                      editSkillPlatForm(SkillPlatformValues);
                      console.log('edit', SkillPlatformValues);
                    } else {
                      console.log(technicalInfoEdit.id);
                      const skillPlaformValuesAdd = {
                        skillPlatformId: values.skillPlatformId.id
                          ? values.skillPlatformId.id
                          : null,
                        name: values.skillPlatformId.inputValue
                          ? values.skillPlatformId.inputValue
                          : values.skillPlatformId.title,
                        skillLevel: values.skillLevel,
                        experienceInMonths: values.experienceInMonths,
                        candidateSkillId: technicalInfoEdit?.id,
                      };
                      addSkillPlatForm(skillPlaformValuesAdd);
                      console.log('add', skillPlaformValuesAdd);
                    }
                    // await new Promise(r => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2));
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
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        justifyContent="space-between"
                        alignItems={'flex-start'}
                      >
                        <Grid item xs={4}>
                          <Stack spacing={1.5}>
                            <FilmSelectGet
                              disabled={
                                technicalInfoEdit.skillPlatforms[index]
                                  .skillPlatformId !== null &&
                                technicalInfoEdit.skillPlatforms[
                                  index
                                ].hasOwnProperty('candidateSkillId')
                                  ? isEditing
                                  : false
                              }
                              labelValues="Skill version/framework"
                              otherProps={{ ...otherProps }}
                              textLabel={textLabel}
                              options={skillalias}
                              touched={touched}
                              errors={errors}
                              name={`skillPlatformId`}
                              label="Select a skill version"
                              value={values?.skillPlatformId}
                              onChange={(e, value) => {
                                setFieldValue(
                                  `skillPlatformId`,
                                  value ? value : ''
                                );
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={3}>
                          <TextfieldWrapper
                            name={`experienceInMonths`}
                            readOnly={false}
                            textLabelStyle={textLabel}
                            textLabel="Experience(Months)"
                            otherProps={{ ...otherProps }}
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <SelectWrapper
                            name={`skillLevel`}
                            textLabel="Skill Level"
                            textLabelStyle={textLabel}
                            options={skillLevels}
                            placeholder="Select level"
                            inputProps={otherProps}
                          />
                        </Grid>
                        <Grid item xs={2} alignSelf="center">
                          <Stack
                            direction="row"
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
                              onClick={() => deleteSkillPlatForm(values.id)}
                            >
                              <Delete />
                            </IconButton>
                            {technicalInfoEdit.skillPlatforms[index]
                              .skillPlatformId !== null &&
                            technicalInfoEdit.skillPlatforms[
                              index
                            ].hasOwnProperty('candidateSkillId') ? (
                              <IconButton
                                type="submit"
                                disableRipple
                                size="large"
                                aria-label="back"
                                color="primary"
                              >
                                <SaveIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                type="submit"
                                disableRipple
                                size="large"
                                aria-label="back"
                                color="primary"
                              >
                                <AddTaskIcon />
                              </IconButton>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </>
            ))}
          <Stack
            direction="row"
            alignItems={'center'}
            justifyContent="flex-end"
          >
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                setScreenStatus('1');
                setTechnicalSkillsInitialValues(initialValues);
              }}
            >
              cancel
            </Button>
            <Stack alignItems={'flex-end'}>
              <Tooltip title="Add version" arrow placement="right">
                <IconButton
                  type="button"
                  disableRipple
                  size="large"
                  aria-label="back"
                  color="primary"
                  onClick={() => handleAdd(technicalInfoEdit.skillPlatforms)}
                  // disabled={count >= 5}
                >
                  <AddCircleOutlineOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default TechnicalSkillsForm;

const TechnicalSkills = ({
  setTechnicalInfoEdit,
  setScreenStatus,
  technicalInfo,
  GetMainSkillEdit,
}) => {
  const [displayCount, setDisplayCount] = useState(5);
  useEffect(() => {
    console.log(technicalInfo);
  }, [technicalInfo]);

  const handleReadMoreClick = () => {
    if (displayCount + 5 >= technicalInfo.length) {
      setDisplayCount(technicalInfo.length);
    } else {
      setDisplayCount(displayCount + 5);
    }
  };
  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      {technicalInfo &&
        technicalInfo.slice(0, displayCount).map(skill => (
          <Stack key={skill.id} spacing={1}>
            <Stack direction="row" spacing={1} justifyContent="flex-start">
              <SkillMainName>
                {skill.skillId ? skill.skill.name : skill.name}
              </SkillMainName>
              <IconButton
                color="primary"
                disableRipple
                size="small"
                aria-label="back"
                sx={{ p: 0 }}
                onClick={() => {
                  setScreenStatus('3');
                  console.log('skill', skill);
                  const skillArray2 = {
                    candidateId: skill.candidateId,
                    id: skill.id,
                    skillId: {
                      id: skill?.skillId ? skill.skillId : null,
                      title: skill?.name ? skill.name : skill?.skill?.name,
                    },
                    skillPlatforms: [
                      {
                        skillPlatformId: '',
                        skillLevel: 3,
                        experienceInMonths: 40,
                      },
                    ],
                  };
                  setTechnicalInfoEdit(skillArray2);
                  const skillArray1 = {
                    candidateId: skill.candidateId,
                    id: skill.id,
                    skillId: {
                      id: skill?.skillId ? skill.skillId : null,
                      title: skill?.name ? skill.name : skill?.skill?.name,
                    },
                    skillPlatforms: skill.skillPlatforms.map(skillPlatform => ({
                      skillPlatformId: {
                        id: skillPlatform?.skillId
                          ? skillPlatform.skillId
                          : skillPlatform?.skillPlatform?.id,
                        title: skillPlatform?.name
                          ? skillPlatform.name
                          : skillPlatform?.skillPlatform?.name,
                      },
                      id: skillPlatform.id,
                      candidateSkillId: skillPlatform.candidateSkillId,
                      skillLevel: skillPlatform.skillLevel,
                      experienceInMonths: skillPlatform.experienceInMonths,
                    })),
                  };
                  console.log('array', skillArray1);

                  setTechnicalInfoEdit(skillArray1);
                  GetMainSkillEdit(skillArray1);

                  // GetSkillAliasNameEdit(skillArray1.skillId.year, skillArray);
                  // GetSkillAliasName(skillArray.skillId.year);
                }}
              >
                <EditIcon fontSize="12px" />
              </IconButton>
            </Stack>

            <Stack spacing={0.5}>
              {skill &&
                skill?.skillPlatforms?.map(platform => (
                  <Stack
                    key={platform.id}
                    direction="row"
                    alignItems={'center'}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <SkillBadge
                      noWrap
                      sx={{}}
                      SkillSubName={
                        <SkillSubName>
                          {platform.skillPlatformId
                            ? platform.skillPlatform.name
                            : platform.name}
                          {`( ${convertMonthsToYearsAndMonths(
                            platform.experienceInMonths
                          )} )`}
                        </SkillSubName>
                      }
                    />
                    <ExperienceBadge
                      weight={platform?.weightByCandidate}
                      level={platform.skillLevel}
                    />
                  </Stack>
                ))}
            </Stack>
          </Stack>
        ))}
      {technicalInfo && displayCount < technicalInfo.length && (
        <Button onClick={handleReadMoreClick}> More</Button>
      )}

      {technicalInfo && displayCount >= technicalInfo.length && (
        <Button onClick={() => setDisplayCount(5)}>Read Less</Button>
      )}
    </Stack>
  );
};

const validationSchema2 = Yup.object({
  skillPlatformId: Yup.mixed().required('Skill platform is required'),
  experienceInMonths: Yup.number().required('Experience in months is required'),
  skillLevel: Yup.string().required('Skill level is required'),
});
