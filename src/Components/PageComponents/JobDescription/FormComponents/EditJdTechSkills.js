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
  SkillTypeBadge,
  commonStyle,
} from '@/pageComponents/Profile/Edit/Skills/CommonComponentsSkills';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { textLabel } from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels, skillType } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import {
  CandidateSkillApi,
  JdSkillApi,
  JdSkillPlatformApi,
  JobDescriptionApi,
  SkillApi,
  SkillPlatformApi,
} from '@/swagger_api/api/CandidateSkillApi';
import { convertYearsToYearsAndMonthsBrackets } from '@/utils/CommonFunctions/DateRelatedFunction';
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
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MyFormContext } from './JdStepper';

function hasDuplicateSkills(values) {
  const titleSet = new Set();

  for (const skill of values.skillPlatforms) {
    const name = skill.skillPlatformId?.name;

    if (titleSet.has(name)) {
      console.log(name);
      return true; // Found a duplicate
    }

    titleSet.add(name);
  }

  return false; // No duplicates found
}

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
      skillType: 1,
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
            'Skill Platform should be between 1 and 100 characters',
            value => {
              if (
                typeof value === 'object' &&
                value &&
                value.hasOwnProperty('inputValue')
              ) {
                const inputValue = value.inputValue.trim();
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
              .max(100, 'Experience should not exceed 100 years'),
            otherwise: Yup.number().nullable(),
          }),

        skillLevel: staticDropDownValidation('Skill Level', true, skillLevels),
        skillType: staticDropDownValidation('Skill Type', true, skillType),
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
          const inputValue = value.inputValue.trim();
          return inputValue.length >= 1 && inputValue.length <= 100;
        }
        return true;
      }
    )
    .required('Skill Platform name is required'),
  experienceInMonths: Yup.number()
    .nullable()
    .when('skillType', {
      is: '1',
      then: Yup.number()
        .required('Experience is required')
        .max(100, 'Experience should not exceed 100 years'),
      otherwise: Yup.number().nullable(),
    }),
  skillLevel: staticDropDownValidation('Skill Level', true, skillLevels),
  skillType: staticDropDownValidation('Skill Type', true, skillType),
});

const EditJdTechSkills = ({ getData }) => {
  const sectionRef = useRef(null);
  const { stepOneData, EditData } = useContext(MyFormContext);
  const { setLoading } = useContext(LoadingContext);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdSkillPlatformApi = useMemo(() => new JdSkillPlatformApi(), []);
  const jdSkillApi = useMemo(() => new JdSkillApi(), []);
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
      skillLevel: '',
      skillType: '',
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
  const GetSkillAliasName = useCallback(
    async (value, setFieldValue) => {
      try {
        const response =
          await skillPlatformApi.apiSkillPlatformGetAllByEntityIdEntityIdGet(
            value.id
          );
        const result = response?.body?.result;
        if (result) {
          const trim = result.map((res, index) => ({
            value: res?.skillId, //main skill id
            title: res?.name, //text
            id: res?.id, //sub skill id
          }));
          console.log('skillalias', trim);

          setSkillalias(trim);
          console.log(value, 'skillaliasdrop down');
          setFieldValue('skillPlatforms.[0].skillPlatformId', {
            ...value,
            title: value.title.split(',')[1].trim(),
          });
        } else {
          setSkillalias([]);
        }
      } catch (error) {
        handleErrors(error);
      }
    },
    [skillPlatformApi]
  );

  const GetSkillAliasName1 = useCallback(
    async skillArray1 => {
      try {
        const response =
          await skillPlatformApi.apiSkillPlatformGetAllByEntityIdEntityIdGet(
            skillArray1.skillId.id
          );
        const result = response?.body?.result;
        if (result) {
          const trim = result?.map((res, index) => ({
            title: res?.name, //text
            id: res?.id, //sub skill id
          }));
          console.log('skillalias', trim);
          console.log('skillArray1', skillArray1);

          setSkillalias(trim);
          console.log('tech', technicalSkillsInitialValues);
          setTechnicalSkillsInitialValues(skillArray1);
        } else {
          setSkillalias([]);
        }
      } catch (error) {
        handleErrors(error);
      }
    },
    [
      setSkillalias,
      technicalSkillsInitialValues,
      setTechnicalSkillsInitialValues,
      skillPlatformApi,
    ]
  );
  const GetMainSkillName = useCallback(async () => {
    const opts = { skillType: 1 };

    try {
      const response = await skillPlatformApi.apiSkillPlatformGet(opts);
      const result = response?.body?.result;
      if (Array.isArray(result)) {
        const trim = result?.map((res, index) => ({
          value: res?.skillId, //main skill id
          title: res?.searchText, //text
          id: res?.id,
        }));
        setSkill(trim);
      }
    } catch (error) {
      handleErrors(error);
    }
  }, [skillPlatformApi]);

  const GetMainSkillEdit = useCallback(
    async skillArray1 => {
      console.log('skilllaraya1', skillArray1);
      const skillApi = new SkillApi();
      try {
        const response = await skillApi.apiSkillGet();
        const result = response?.body?.result;
        if (Array.isArray(result)) {
          const trim = result?.map((res, index) => ({
            title: res?.name, //text
            id: res?.id, //sub skill id
          }));
          setSkill(trim);
          if (skillArray1.skillId.id === null) {
            setTechnicalSkillsInitialValues(skillArray1);
          } else {
            await GetSkillAliasName1(skillArray1);
          }
        }
      } catch (error) {
        handleErrors(error);
      }
    },
    [setSkill, setTechnicalSkillsInitialValues, GetSkillAliasName1]
  );

  const handleGetMainSkillName = useCallback(() => {
    GetMainSkillName();
    setTechnicalSkillsInitialValues(initialValues);
    setSkillalias([]);
  }, [GetMainSkillName]);

  useEffect(() => {
    if (screenStatus === '3') {
      GetMainSkillEdit;
    } else if (screenStatus === '2' || screenStatus === '1') {
      handleGetMainSkillName();
    }
  }, [screenStatus, handleGetMainSkillName, GetMainSkillEdit]);

  const addSkill = async (post, { resetForm }) => {
    const candidateSkillApi = new CandidateSkillApi();

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
  const addJdSkills = async (post, { resetForm }) => {
    console.log(post);

    setLoading(true);
    const skillsData = { jdSkills: [post] };
    const opts = {
      body: skillsData,
    };
    console.log('addJdSkills', opts);
    const jdSkills = stepOneData?.jdSkills;

    console.log('All skills', jdSkills);
    console.log('Added new skill', skillsData);

    var jdSkillNames = new Set(jdSkills.map(skill => skill.name));
    var hasDuplicateName = skillsData?.jdSkills.some(addedSkill =>
      jdSkillNames.has(addedSkill.name)
    );

    console.log(hasDuplicateName, jdSkillNames);

    const platformNames = new Set();
    let hasDuplicatePlatformName = false;

    skillsData?.jdSkills?.some(skill => {
      return skill.jdSkillPlatforms.some(platform => {
        if (platformNames.has(platform.name)) {
          hasDuplicatePlatformName = true;
          return true; // Stop iteration since a duplicate is found
        }
        platformNames.add(platform.name);
        return false;
      });
    });

    try {
      const hasDuplicates = jdSkills.some((jdskill, index) => {
        return skillsData.jdSkills.some((p, i) => {
          return (
            index !== i &&
            p.name === jdskill.name &&
            p.skillId === jdskill.skillId
          );
        });
      });
      console.log(hasDuplicates);

      if (hasDuplicateName) {
        dispatch(
          setAlertPopup({
            message: 'Duplicate Skills cannot be added',
            type: 'error',
            duration: 3000,
          })
        );
      } else if (hasDuplicatePlatformName) {
        dispatch(
          setAlertPopup({
            message: 'Duplicate Skill Platforms cannot be added',
            type: 'error',
            duration: 3000,
          })
        );
      } else {
        const response =
          await jobDescriptionApi.apiJobDescriptionUpdateJdAndSkillsJobDescriptionIdPost(
            stepOneData?.id,
            opts
          );
        setLoading(false);
        if (response.body.result) {
          setScreenStatus('1');
          dispatch(
            setAlertPopup({
              message: 'Skill created successfully',
              type: 'success',
              duration: 3000,
            })
          );
          EditData();
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
        console.log('post', response);
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const addSkillPlatForm = async post => {
    setLoading(true);
    try {
      const opts = {
        body: post,
      };
      console.log('technicalInfoEdit ', technicalInfoEdit);

      console.log('post', post);
      const name = post.name;

      const platformNamesSet = new Set(
        technicalInfoEdit.skillPlatforms.map(
          skillPlatform =>
            skillPlatform.skillPlatformId?.title || skillPlatform.name
        )
      );
      console.log(platformNamesSet);

      const hasDuplicateName = platformNamesSet.has(name);

      if (hasDuplicateName) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Duplicate Skill Platforms cannot be added',
            type: 'error',
            duration: 3000,
          })
        );
      } else {
        const response = await jdSkillPlatformApi.apiJdSkillPlatformPost(opts);
        setLoading(false);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Skill Platform added successfully',
              type: 'success',
              duration: 3000,
            })
          );

          if (opts.body.jdSkillId) getJdSkill(opts.body.jdSkillId);
          EditData();
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const editSkillPlatForm = async post => {
    setLoading(true);
    try {
      const opts = {
        body: post,
      };

      const response = await jdSkillPlatformApi.apiJdSkillPlatformPut(opts);
      setLoading(false);
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Skill Platform updated successfully',
            type: 'success',
            duration: 3000,
          })
        );

        if (opts.body.jdSkillId) getJdSkill(opts.body.jdSkillId);
        EditData();
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
      console.log(error);
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const getJdSkill = async post => {
    console.log('getCandidateSkill', post);
    try {
      const response = await jdSkillApi.apiJdSkillGetAllJdSkillByIdIdGet(post);
      console.log('apiCandidateSkillIdGet', response.body.result);

      if (response.body.result) {
        const trim = response?.body?.result;
        const skillArray1 = createSkillArray(trim);
        console.log('skillArray1:', skillArray1);
        setTechnicalInfoEdit(skillArray1);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const deleteSkillPlatForm = async post => {
    const opts = { id: post.id };
    const confirmDelete = async () => {
      try {
        const response = await jdSkillPlatformApi.apiJdSkillPlatformDelete(
          opts
        );

        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Skill Platform deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          if (post.jdSkillId) getJdSkill(post.jdSkillId);

          EditData();
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
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try again!',
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
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Skill Platform!',
      confirmDelete,
      revertDelete
    );
  };

  const deleteSkill = async post => {
    if (technicalInfoEdit.skillPlatforms.length > 0) {
      dispatch(
        setAlertPopup({
          message: 'Please delete Skill Platforms to delete Main Skill',
          type: 'warning',
          duration: 3000,
        })
      );
    } else {
      const confirmDelete = async () => {
        try {
          const response = await jdSkillApi.apiJdSkillIdDelete(post.id);

          if (response.body.result) {
            dispatch(
              setAlertPopup({
                message: 'Skill Platform deleted successfully',
                type: 'success',
                duration: 3000,
              })
            );
            if (post.id) getJdSkill(post.id);
            EditData();
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
          dispatch(
            setAlertPopup({
              message: 'Something went wrong Please try again!',
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
        skillType: skill.skillType,
        jobDescriptionId: stepOneData?.id,
        experienceInMonths: skill.experienceInMonths,
      }));
      const post = {
        name: values.skillId.inputValue
          ? values.skillId.inputValue
          : values.skillId.title.split(',')[0].trim(),
        skillType: 1,
        jobDescriptionId: stepOneData?.id,
        skillId: values.skillId.value ? values.skillId.value : null,
        jdSkillPlatforms: skillPlatformArrayMapped,
      };
      console.log('add skill', post, 'steponedata,', stepOneData?.id);

      addJdSkills(post, { resetForm });
    }
  };

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
                  sectionRef={sectionRef}
                  setTechnicalInfoEdit={setTechnicalInfoEdit}
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
              jobDescriptionId: stepOneData?.id,
              skillType: 1,
              skillId: '',
              skillPlatforms: [
                {
                  skillPlatformId: '',
                  skillLevel: '',
                  experienceInMonths: '',
                  skillType: 1,
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
            title={`${isEditing ? 'Edit' : 'Add'} Skills`}
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
                        console.log('values', value);
                        setTechnicalSkillsInitialValues(initialValues);
                        setFieldValue('skillPlatforms', [
                          {
                            skillPlatformId: '',
                            skillLevel: '',
                            experienceInMonths: '',
                            skillType: '',
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
                                skillType: 1,
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
                                  <Grid item xs={6} sm={3}>
                                    <Stack spacing={1.5}>
                                      <FilmSelectGet
                                        disabled={
                                          values.skillPlatforms[index]
                                            .skillPlatformId !== null &&
                                          values.skillPlatforms[
                                            index
                                          ].hasOwnProperty('jdSkillId')
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
                                  <Grid item xs={6} sm={2}>
                                    <TextfieldWrapper
                                      name={`skillPlatforms.${index}.experienceInMonths`}
                                      readOnly={false}
                                      textLabelStyle={textLabel}
                                      textLabel="Experience(yrs)"
                                      otherProps={{ ...otherProps }}
                                      onChange={e => {
                                        setFieldValue(
                                          `skillPlatforms.${index}.experienceInMonths`,
                                          e.target.value.replace(/[^0-9]/g, '')
                                        );
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={6} sm={2}>
                                    <SelectWrapper
                                      name={`skillPlatforms.${index}.skillLevel`}
                                      textLabel="Skill Level"
                                      textLabelStyle={textLabel}
                                      options={skillLevels}
                                      placeholder="Select level"
                                      inputProps={otherProps}
                                      onChangeValues={e => {
                                        setFieldValue(
                                          `skillPlatforms.${index}.skillLevel`,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={6} sm={2}>
                                    <SelectWrapper
                                      name={`skillPlatforms.${index}.skillType`}
                                      textLabel="Skill type"
                                      textLabelStyle={textLabel}
                                      options={skillType}
                                      placeholder="Select type"
                                      inputProps={otherProps}
                                      onChangeValues={e => {
                                        setFieldValue(
                                          `skillPlatforms.${index}.skillType`,
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
                      <SubmissionButton type="submit" onClick={handleSubmit}>
                        Submit
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
              <Formik
                key={index}
                enableReinitialize
                initialValues={{ ...technicalInfoEdit.skillPlatforms[index] }}
                validationSchema={validationSchema2}
                onSubmit={async values => {
                  const commonValues = {
                    skillPlatformId: values.skillPlatformId.id
                      ? values.skillPlatformId.id
                      : null,
                    name: values.skillPlatformId.inputValue
                      ? values.skillPlatformId.inputValue
                      : values.skillPlatformId.title,
                    skillLevel: values.skillLevel,
                    skillType: values.skillType,
                    experienceInMonths: values.experienceInMonths,
                  };
                  if ('jdSkillId' in values) {
                    const SkillPlatformValues = {
                      ...commonValues,
                      jdSkillId: values.jdSkillId,
                      jobDescriptionId: values.jobDescriptionId,
                      id: values.id,
                    };
                    editSkillPlatForm(SkillPlatformValues);
                  } else {
                    const skillPlatformValuesAdd = {
                      ...commonValues,
                      jobDescriptionId: stepOneData?.id,
                      jdSkillId: technicalInfoEdit.id,
                    };
                    addSkillPlatForm(skillPlatformValuesAdd);
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
                              ].hasOwnProperty('jdSkillId')
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
                                technicalInfoEdit?.skillPlatforms.some(
                                  p =>
                                    p.skillPlatformId?.id === option.id ||
                                    p.skillPlatformId?.title === option.title
                                );
                              const isAddOption = option.title.includes('Add');
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
                      <Grid item xs={2}>
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
                          textLabel="Experience(yrs)"
                          otherProps={
                            values.skillType === 1
                              ? otherPropsRequired
                              : otherPropsNotRequired
                          }
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <SelectWrapper
                          name={`skillLevel`}
                          textLabel="Skill Level"
                          textLabelStyle={textLabel}
                          options={skillLevels}
                          placeholder="Select level"
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
                              showConfirmationDialog(
                                'Are you sure?',
                                'Your skill verified badge will reset!',
                                () => {
                                  setFieldValue('skillLevel', e.target.value);
                                },
                                () => {
                                  dispatch(
                                    setAlertPopup({
                                      message:
                                        'You have reverted the select action',
                                      type: 'info',
                                      duration: 3000,
                                    })
                                  );
                                }
                              );
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <SelectWrapper
                          name={`skillType`}
                          textLabel="Skill types"
                          textLabelStyle={textLabel}
                          options={skillType}
                          placeholder="Select type"
                          inputProps={otherProps}
                          onChangeValues={e => {
                            setFieldValue(`skillType`, e.target.value);
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
                          ].hasOwnProperty('jdSkillId') ? (
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
                          ].hasOwnProperty('jdSkillId') ? (
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
            ))}
          <Stack
            direction="row"
            alignItems={'center'}
            justifyContent="flex-end"
          >
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

export default EditJdTechSkills;

const TechnicalSkills = ({
  setTechnicalInfoEdit,
  setScreenStatus,
  GetMainSkillEdit,
  sectionRef,
}) => {
  const { stepOneData } = useContext(MyFormContext);
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(stepOneData?.jdSkills || []);
  console.log(stepOneData?.jdSkills, 'stepOneData?.jdSkills');

  const Message = 'no skills';

  if (!stepOneData?.jdSkills || stepOneData?.jdSkills.length === 0) {
    return <NoItemCard Message={Message} />;
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      {stepOneData?.jdSkills &&
        displayData.map(skill => (
          <Stack key={skill.id} spacing={1}>
            <Stack direction="row" spacing={1} justifyContent="flex-start">
              <SkillMainName>{skill.name}</SkillMainName>
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
                    jobDescriptionId: skill.jobDescriptionId,
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
                        skillType: 1,
                      },
                    ],
                  };
                  setTechnicalInfoEdit(skillArray2);
                  const skillArray1 = {
                    jobDescriptionId: skill.jobDescriptionId,
                    id: skill.id,
                    skillId: {
                      id: skill?.skillId ? skill.skillId : null,
                      title: skill?.name ? skill.name : skill?.skill?.name,
                    },
                    skillPlatforms: skill.jdSkillPlatforms.map(
                      skillPlatform => ({
                        jdSkillId: skillPlatform?.jdSkillId,
                        id: skillPlatform?.id,
                        skillPlatformId: {
                          id: skillPlatform?.skillPlatformId || null,
                          title: skillPlatform?.name
                            ? skillPlatform.name
                            : skillPlatform?.skillPlatform?.name,
                        },
                        jobDescriptionId: skillPlatform.jobDescriptionId,
                        skillLevel:
                          skillPlatform.skillLevel === 0
                            ? ''
                            : skillPlatform.skillLevel,
                        experienceInMonths:
                          skillPlatform.experienceInMonths === null ||
                          skillPlatform.experienceInMonths === ''
                            ? ''
                            : skillPlatform.experienceInMonths,

                        skillType:
                          skillPlatform?.skillType === 0
                            ? ''
                            : skillPlatform?.skillType,
                      })
                    ),
                  };
                  console.log('skillArray 1', skillArray1);
                  setTechnicalInfoEdit(skillArray1);
                  GetMainSkillEdit(skillArray1);
                  if (sectionRef?.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <EditIcon fontSize="12px" />
              </IconButton>
            </Stack>

            <Stack spacing={0.5}>
              {skill.jdSkillPlatforms &&
                skill.jdSkillPlatforms?.map(platform => (
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
                            {platform.name}
                            {`${convertYearsToYearsAndMonthsBrackets(
                              platform.experienceInMonths
                            )}`}
                          </SkillSubName>
                          {platform?.isSelfVerified && (
                            <VerifiedOutlinedIcon color="primary" />
                          )}
                        </>
                      }
                    />
                    <Stack
                      justifyContent={'flex-end'}
                      direction="row"
                      spacing={2}
                    >
                      <SkillTypeBadge
                        weight={platform?.skillType}
                        level={platform?.skillType}
                      />
                      <ExperienceBadge
                        weight={platform?.weight}
                        level={platform?.skillLevel}
                      />
                    </Stack>
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

const createSkillArray = skill => {
  return {
    jobDescriptionId: skill.jobDescriptionId,
    id: skill.id,
    skillId: {
      id: skill?.skillId ? skill.skillId : null,
      title: skill?.name ? skill.name : skill?.skill?.name,
    },
    skillPlatforms: skill.jdSkillPlatforms.map(
      skillPlatform =>
        ({
          jdSkillId: skill.id,
          id: skillPlatform?.id,
          skillPlatformId: {
            id: skillPlatform?.skillPlatformId || null,
            title: skillPlatform?.name
              ? skillPlatform.name
              : skillPlatform?.skillPlatform?.name,
          },
          jobDescriptionId: skillPlatform.jobDescriptionId,
          skillLevel:
            skillPlatform.skillLevel === 0 ? '' : skillPlatform.skillLevel,
          experienceInMonths:
            skillPlatform.experienceInMonths === null ||
            skillPlatform.experienceInMonths === ''
              ? ''
              : skillPlatform.experienceInMonths,
          skillType:
            skillPlatform?.skillType === 0 ? '' : skillPlatform?.skillType,
        } || [])
    ),
  };
};
