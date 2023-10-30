import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import useReadMore from '@/customHooks/useReadMore';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  ExperienceBadge,
  SkillBadge,
  SkillMainName,
  SkillSubName,
  commonStyle,
} from '@/pageComponents/Profile/Edit/Skills/CommonComponentsSkills';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { textLabel } from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateSkillApi,
  CandidateSkillPlatformApi,
  SkillApi,
  SkillPlatformApi,
} from '@/swagger_api/api/CandidateSkillApi';
import { convertMonthsToYearsAndMonthsBrackets } from '@/utils/CommonFunctions/DateRelatedFunction';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { handleErrors } from '@/utils/CommonFunctions/ErrorFunctions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  addifnotexistdropdownValidationSchema,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import {
  Autocomplete,
  Button,
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
import { createFilterOptions } from '@mui/material/Autocomplete';
import { FieldArray, Form, Formik, useField } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

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
              console.log(filtered);

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
var initialValues = {
  skillType: 1,
  skillId: null,
  skillPlatforms: [
    {
      skillPlatformId: null,
      skillLevel: '',
      experienceInMonths: '',
    },
  ],
};

const validationSchema = Yup.object().shape({
  skillId: addifnotexistdropdownValidationSchema('Skill', 1, 100, true),

  skillPlatforms: Yup.array()
    .min(1, 'At least one Skill Platform is required')
    .of(
      Yup.object().shape({
        skillPlatformId: Yup.mixed()
          .test(
            'input-value-length',
            'Skill Platform should be between 1 to 100 characters',
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
          .required('Experience  is required')
          .min(1, 'Experience should be at least 1 month')
          .max(999999, 'Experience should not exceed 999999 months'),
        //skillLevel: Yup.string().nullable().required('Skill level  is required'),
        skillLevel: staticDropDownValidation('Skill Level', true, skillLevels),
      })
    ),
});
const validationSchema2 = Yup.object({
  skillPlatformId: Yup.mixed()
    .test(
      'input-value-length',
      'Skill Platform should be between 1 to 100 characters',
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
    .required('Experience  is required')
    .min(1, 'Experience should be at least 1 month')
    .max(999999, 'Experience should not exceed 999999 months'),
  skillLevel: staticDropDownValidation('Skill Level', true, skillLevels),
});

const TechnicalSkillsForm = ({
  setTechnicalInfo,
  technicalInfo,
  technicalEdit,
  setTechnicalEdit,
  getData,
  sectionRef,
}) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const candidateSkillPlatformApi = useMemo(
    () => new CandidateSkillPlatformApi(),
    []
  );
  const candidateSkillApi = useMemo(() => new CandidateSkillApi(), []);
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
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  const yourFunctionToExecuteAfterStateUpdate = useCallback(() => {
    // Your code here
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [sectionRef]);

  useEffect(() => {
    if (screenStatus === '3') {
      yourFunctionToExecuteAfterStateUpdate();
    }
  }, [screenStatus, yourFunctionToExecuteAfterStateUpdate]);

  useEffect(() => {
    if (screenStatus === '3' && Object.keys(setTechnicalInfoEdit).length != 0) {
      // setTechnicalSkillsInitialValues(technicalInfoEdit);
    }
  }, [technicalInfoEdit, screenStatus]);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      skillPlatformId: null,
      experienceInMonths: '',
      skillLevel: '',
    });
    setCount(count + 1);
  };

  const handleRemove = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    setCount(count - 1);
  };
  const handleSplice = (arrayHelpers, index) => {
    arrayHelpers.splice(index, 1);
    setCount(count - 1);
  };

  useEffect(() => {
    if (screenStatus === '3') {
      GetMainSkillEdit;
    } else if (screenStatus === '2' || screenStatus === '1') {
      GetMainSkillName();
      setTechnicalSkillsInitialValues(initialValues);
      setSkillalias([]);
    }
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

          // if (
          //   true ||
          //   technicalSkillsInitialValues.skillPlatforms.length === 1 ||
          //   technicalSkillsInitialValues.skillPlatforms[0].skillPlatformId == ''
          // ) {
          // } else {
          // }
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
    // setLoading(true);
    const opts = {
      body: post,
    };
    console.log('hi');
    console.log(post);

    const skillPlatforms = post.skillPlatforms;

    const hasDuplicates =
      skillPlatforms.filter((platform, index) => {
        // Check for duplicates with the same name or skillPlatformId
        return skillPlatforms.some((p, i) => {
          return (
            index !== i &&
            (p.name === platform.name ||
              p.skillPlatformId === platform.skillPlatformId)
          );
        });
      }).length > 0;

    if (hasDuplicates) {
      // Handle duplicate skill platforms
      dispatch(
        setAlertPopup({
          message: 'Duplicate Skill Platforms cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      await candidateSkillApi
        .apiCandidateSkillPost(opts)
        .then(async response => {
          // setLoading(false);
          if (response.body.message === 'Created Successfully.') {
            dispatch(
              setAlertPopup({
                message: 'Skill created successfully',
                type: 'success',
                duration: 3000,
              })
            );

            setScreenStatus('1');
            getData();

            resetForm();
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
        .catch(handleErrors);
    }
  };
  const addSkillPlatForm = async post => {
    const opts = {
      body: post,
    };
    console.log(technicalInfoEdit.skillPlatforms);
    console.log(post);
    const name = post.name;

    if (
      technicalInfoEdit.skillPlatforms.some(
        skill => skill.skillPlatformId && skill.skillPlatformId.title === name
      )
    ) {
      dispatch(
        setAlertPopup({
          message: 'Duplicate Skill Platforms cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      await candidateSkillPlatformApi
        .apiCandidateSkillPlatformPost(opts)
        .then(async response => {
          // setLoading(false);
          if (response.body.message === 'Created Successfully.') {
            dispatch(
              setAlertPopup({
                message: 'Skill Platform added successfully',
                type: 'success',
                duration: 3000,
              })
            );

            // setScreenStatus('1');
            getData();
            getCandidateSkill(post.candidateSkillId);
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
        .catch(handleErrors);
    }
  };
  const editSkillPlatForm = async post => {
    // setLoading(true);
    const opts = {
      body: post,
    };
    console.log(technicalInfoEdit.skillPlatforms);
    console.log(post);
    if (
      technicalInfoEdit.skillPlatforms.some(
        skill => skill.skillPlatformId && skill.skillPlatformId.title === name
      )
    ) {
      dispatch(
        setAlertPopup({
          message: 'Duplicate Skill Platforms cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      await candidateSkillPlatformApi
        .apiCandidateSkillPlatformPut(opts)
        .then(async response => {
          // setLoading(false);
          if (response.body.message === 'Updated Successfully.') {
            dispatch(
              setAlertPopup({
                message: 'Skill Platform updated successfully',
                type: 'success',
                duration: 3000,
              })
            );
            getCandidateSkill(post.candidateSkillId);
            getData();
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
    }
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
          skillLevel: '',
          experienceInMonths: '',
        },
      ],
    };

    const opts = {
      body: post,
    };

    await candidateSkillApi
      .apiCandidateSkillIdGet(post)
      .then(async response => {
        // setLoading(false);
        console.log('apiCandidateSkillIdGet', response.body);

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
              skillLevel:
                skillPlatform.skillLevel === 0 ? '' : skillPlatform.skillLevel,
              experienceInMonths:
                skillPlatform.experienceInMonths === null ||
                skillPlatform.experienceInMonths === ''
                  ? ''
                  : skillPlatform.experienceInMonths,
            })),
          };
          console.log(technicalInfoEdit);
          setTechnicalInfoEdit(skillArray1);
          setTechnicalSkillsInitialValues(skillArray1);
        } else if (response.body.message === 'No Records Found.') {
          setSkillalias([]);
        }
      })
      .catch(handleErrors);
  };

  const deleteSkillPlatForm = async post => {
    // setLoading(true);
    const confirmDelete = async () => {
      try {
        const response =
          await candidateSkillPlatformApi.apiCandidateSkillPlatformDeleteByCandidateIdSkillPlatformIdCandidateIdDelete(
            post.id,
            userDetails?.candidateId
          );
        // setLoading(false);
        if (response.body.message === 'Deleted Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Skill Platform deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          getCandidateSkill(post.candidateSkillId);
          getData();
        } else if (
          response.body.message === 'SkillPlatform is attached to ProjectSkills'
        ) {
          dispatch(
            setAlertPopup({
              message:
                'Before deleting this Skill Platform, please remove its reference in the project section.',
              type: 'warning',
              duration: 3000,
            })
          );
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (error) {
        // setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      }
    };
    const revertDelete = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the delete action',
          type: 'info',
          duration: 3000,
        })
      );
      // setLoading(false);
    };
    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Skill Platform!',
      confirmDelete,
      revertDelete
    );
  };

  const deleteSkill = async post => {
    if (post.skillPlatforms.length > 0) {
      dispatch(
        setAlertPopup({
          message: 'Please delete Skill Platforms to delete main Skill',
          type: 'warning',
          duration: 3000,
        })
      );
    } else {
      const confirmDelete = async () => {
        try {
          const response = await candidateSkillApi.apiCandidateSkillIdDelete(
            post.id
          );
          // setLoading(false);
          if (response.body.message === 'Deleted Successfully.') {
            dispatch(
              setAlertPopup({
                message: 'Skill deleted successfully',
                type: 'success',
                duration: 3000,
              })
            );

            getData();
            setScreenStatus('1');
          } else {
            dispatch(
              setAlertPopup({
                message: response.body.message,
                type: 'error',
                duration: 3000,
              })
            );
          }
        } catch (error) {
          // setLoading(false);
          dispatch(
            setAlertPopup({
              message: 'Something went wrong Please try Again !',
              type: 'error',
              duration: 3000,
            })
          );
        }
      };
      const revertDelete = () => {
        dispatch(
          setAlertPopup({
            message: 'You have reverted the delete action',
            type: 'info',
            duration: 3000,
          })
        );
        // setLoading(false);
      };
      showConfirmationDialog(
        'Are you sure?',
        'You want to delete this Skill!',
        confirmDelete,
        revertDelete
      );
    }
  };

  const SubmitDetails = async (values, { resetForm }) => {
    if (screenStatus === '3') {
      console.log('edit', values);
    } else if (screenStatus === '2') {
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
        candidateId: userDetails?.candidateId,
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
                <CardSectionHeader>Skills</CardSectionHeader>
                <TechnicalSkills
                  context1={context1}
                  context2={context2}
                  sectionRef={sectionRef}
                  yourFunctionToExecuteAfterStateUpdate={
                    yourFunctionToExecuteAfterStateUpdate
                  }
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
        <ShadowButtonSubmit
          height="40px"
          width="100%"
          minwidth="200px"
          maxwidth="200px"
          backgroundcolor="#A62973"
          variant="contained"
          onClick={() => {
            setScreenStatus('2');
            setTechnicalSkillsInitialValues({
              skillType: 1,
              skillId: '',
              skillPlatforms: [
                {
                  skillPlatformId: '',
                  skillLevel: '',
                  experienceInMonths: '',
                },
              ],
            });
          }}
        >
          Add new skill
        </ShadowButtonSubmit>
      )}
      {isAdding || isEditing ? (
        <Stack direction="row" justifyContent="space-between">
          <FormHeaderComponents
            title={`${isEditing ? 'Edit' : 'Add'} Skill`}
            isButtonNotRequired={true}
          />
          <IconButton
            size="small"
            disableRipple
            onClick={() => {
              setScreenStatus('1');
              setTechnicalSkillsInitialValues(initialValues);
            }}
          >
            <ClearIcon color="primary" />
          </IconButton>
        </Stack>
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
              <Grid container spacing={2} ref={sectionRef}>
                <Grid item container xs={12}>
                  <Grid item xs={10} spacing={1}>
                    <FilmSelectGet
                      disabled={isEditing}
                      otherProps={otherPropsRequired}
                      labelValues="Skill"
                      textLabel={textLabel}
                      options={skill}
                      touched={touched}
                      errors={errors}
                      name="skillId"
                      label="Select a Skill"
                      value={values.skillId}
                      onChange={(e, value) => {
                        setTechnicalSkillsInitialValues(initialValues);
                        setFieldValue('skillPlatforms', [
                          {
                            skillPlatformId: '',
                            skillLevel: '',
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
                                skillLevel: '',
                                experienceInMonths: '',
                              },
                            ],
                          });
                        }
                      }}
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
                          onClick={() => deleteSkill(values)}
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
                                        labelValues="Skill Platform"
                                        otherProps={{ ...otherProps }}
                                        textLabel={textLabel}
                                        options={skillalias}
                                        getOptionDisabled={option => {
                                          console.log(
                                            'option',
                                            option,
                                            option.title.includes('Add')
                                          );
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
                                      textLabel="Experience(Months)"
                                      otherProps={{ ...otherProps }}
                                      onChange={e => {
                                        setFieldValue(
                                          `skillPlatforms.${index}.experienceInMonths`,
                                          e.target.value.replace(/[^0-9]/g, '')
                                        );
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <SelectWrapper
                                      name={`skillPlatforms.${index}.skillLevel`}
                                      textLabel="Skill Level"
                                      textLabelStyle={textLabel}
                                      options={skillLevels}
                                      placeholder="Select Skill Level"
                                      inputProps={otherProps}
                                      onChangeValues={e => {
                                        setFieldValue(
                                          `skillPlatforms.${index}.skillLevel`,
                                          e.target.value
                                        );
                                      }}
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
                      <SubmissionButton type="submit" onClick={handleSubmit}>
                        Add Skill
                      </SubmissionButton>
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
                        candidateId: userDetails?.candidateId,
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
                        candidateId: userDetails?.candidateId,
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
                              labelValues="Skill Platform"
                              otherProps={{ ...otherProps }}
                              textLabel={textLabel}
                              options={skillalias}
                              // options={skillalias.filter(
                              //   obj =>
                              //     !technicalInfoEdit?.skillPlatforms.some(
                              //       skillObj =>
                              //         skillObj.skillPlatformId?.id === obj?.id && values?.skillPlatformId !== obj?.id
                              //     )
                              // )}
                              getOptionDisabled={option => {
                                console.log(
                                  'option',
                                  option,
                                  option.title.includes('Add')
                                );
                                const isDisabled =
                                  technicalInfoEdit?.skillPlatforms.some(
                                    p =>
                                      p.skillPlatformId?.id === option.id ||
                                      p.skillPlatformId?.title === option.title
                                  );
                                const isAddOption =
                                  option.title.includes('Add');
                                return isDisabled && !isAddOption;
                              }}
                              touched={touched}
                              errors={errors}
                              name={`skillPlatformId`}
                              label="Select a Skill Platform"
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
                            onChange={e => {
                              setFieldValue(
                                'experienceInMonths',
                                e.target.value.replace(/[^0-9]/g, '')
                              );
                            }}
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
                            placeholder="Select Skill Level"
                            inputProps={otherProps}
                            onChangeValues={e => {
                              console.log(
                                technicalInfoEdit.skillPlatforms[index]
                              );
                              if (
                                !technicalInfoEdit.skillPlatforms[index]
                                  .isSelfVerified
                              ) {
                                setFieldValue(`skillLevel`, e.target.value);
                              } else {
                                Swal.fire({
                                  title: 'Are you sure?',
                                  text: 'Your skill verified badge will reset!',
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
                                    setFieldValue(`skillLevel`, e.target.value);
                                  } else if (
                                    /* Read more about handling dismissals below */
                                    result.dismiss === Swal.DismissReason.cancel
                                  ) {
                                    dispatch(
                                      setAlertPopup({
                                        message:
                                          'You have reverted the select action',
                                        type: 'info',
                                        duration: 3000,
                                      })
                                    );
                                  }
                                });
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={2} alignSelf="center">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                          >
                            {technicalInfoEdit.skillPlatforms[index]
                              .skillPlatformId !== null &&
                            technicalInfoEdit.skillPlatforms[
                              index
                            ].hasOwnProperty('candidateSkillId') ? (
                              <IconButton
                                type="button"
                                disableRipple
                                size="large"
                                aria-label="back"
                                color="primary"
                                onClick={() => deleteSkillPlatForm(values)}
                              >
                                <Delete />
                              </IconButton>
                            ) : (
                              <IconButton
                                type="button"
                                disableRipple
                                size="large"
                                aria-label="back"
                                color="primary"
                                onClick={() =>
                                  handleSplice(
                                    technicalInfoEdit.skillPlatforms,
                                    index
                                  )
                                }
                              >
                                <Delete />
                              </IconButton>
                            )}

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
            <Stack alignItems={'flex-end'}>
              <Tooltip title="Add Skill Platform" arrow placement="right">
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
  sectionRef,
  context1,
  context2,
  yourFunctionToExecuteAfterStateUpdate,
}) => {
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(technicalInfo);

  const Message = context2
    ? context2?.messages?.edit.skills
    : context1?.messages?.edit?.skills;

  if (!technicalInfo || technicalInfo.length === 0) {
    return <NoItemCard Message={Message} />;
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      {technicalInfo &&
        displayData.map(skill => (
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
                        skillLevel: '',
                        experienceInMonths: '',
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
                      isSelfVerified: skillPlatform.isSelfVerified,
                      id: skillPlatform.id,
                      candidateSkillId: skillPlatform.candidateSkillId,
                      skillLevel:
                        skillPlatform.skillLevel === 0
                          ? ''
                          : skillPlatform.skillLevel,
                      experienceInMonths:
                        skillPlatform.experienceInMonths === null ||
                        skillPlatform.experienceInMonths === ''
                          ? ''
                          : skillPlatform.experienceInMonths,
                    })),
                  };
                  console.log('array', skillArray1);

                  setTechnicalInfoEdit(skillArray1);
                  GetMainSkillEdit(skillArray1);
                  setScreenStatus('3');
                  yourFunctionToExecuteAfterStateUpdate();

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
                      SkillSubName={
                        <>
                          <SkillSubName>
                            {platform.skillPlatformId
                              ? platform.skillPlatform.name
                              : platform.name}
                            {`${convertMonthsToYearsAndMonthsBrackets(
                              platform.experienceInMonths
                            )}`}
                          </SkillSubName>
                          {platform?.isSelfVerified && (
                            <VerifiedOutlinedIcon color="primary" />
                          )}
                        </>
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

      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
    </Stack>
  );
};

const NoItemCard = ({ Message }) => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ minHeight: 100 }}
    >
      <InfoCard text={Message} />
    </Stack>
  );
};
