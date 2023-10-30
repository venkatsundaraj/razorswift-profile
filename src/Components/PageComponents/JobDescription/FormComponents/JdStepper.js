import ProfileCard from '@/cardComponents/ProfileCard';
import EditJdSkillForm from '@/pageComponents/JobDescription/FormComponents/EditJdSkillForm';
import EditJdTechSkills from '@/pageComponents/JobDescription/FormComponents/EditJdTechSkills';
import EditJdTraits from '@/pageComponents/JobDescription/FormComponents/EditJdTraits';
import JdForm from '@/pageComponents/JobDescription/FormComponents/JdForm';
import JdTechSkillForm from '@/pageComponents/JobDescription/FormComponents/JdTechSkillForm';
import { commonStyle } from '@/pageComponents/Profile/Edit/Skills/CommonComponentsSkills';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { JobDescriptionApi } from '@/swagger_api/*';
import { reverseCheckAndSet } from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { AcceptanceType } from '@/utils/enum';
import { Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

export const MyFormContext = createContext({});

function hasDuplicates(values) {
  const titleSet = new Set();

  for (const softSkillEntry of values.softSkill) {
    titleSet.add(softSkillEntry.title);
  }

  for (const traitEntry of values.traits) {
    if (titleSet.has(traitEntry.name)) {
      return true; // Found a duplicate
    }
  }

  return false; // No duplicates found
}

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

function checkDuplicateSkillPlatforms(values) {
  const seenCombinations = new Set();

  for (const platform of values.skillPlatforms) {
    const combination = `${platform.name}:${platform.parentSkillName}`;
    if (seenCombinations.has(combination)) {
      return true;
    }
    seenCombinations.add(combination);
  }

  return false;
}

const JdStepper = ({ type, role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const [operationType, setOperationType] = useState(type || 'add');
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const clientDetails = useMemo(
    () => localStorageUtil.getItem('clientDetails'),
    []
  );
  const clientId = useMemo(
    () => clientDetails?.contact?.clientId,
    [clientDetails]
  );

  const fetchJobDescription = useCallback(
    async guid => {
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionGetByGuidGuidGet(guid);
        if (response.body.message === 'Record Fetched Successfully.') {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jobDescriptionApi]
  );

  const EditData = useCallback(async () => {
    try {
      const result = await fetchJobDescription(router.query.guId);
      console.log('result', result);
      setStepOneData(result);
    } catch (error) {
      console.log(error);
    }
  }, [fetchJobDescription, router.query.guId, setStepOneData]);

  const GetJdById = useCallback(
    async id => {
      setLoading(true);
      try {
        const response = await jobDescriptionApi.apiJobDescriptionIdGet(id);

        if (response.body.result) {
          setStepOneData(response.body.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // This will run regardless of success or error
      }
    },
    [jobDescriptionApi, setLoading]
  );

  useEffect(() => {
    if (router.query.guId) {
      EditData();
    }
  }, [router.query.guId, EditData]);

  const handleStepOneSubmit = (values, { setSubmitting }) => {
    console.log(values);

    const SubmittedValues = {
      ...values,
      jobProfileType: parseInt(values?.jobProfileType),
      jobLocation: values.jobLocation.map(({ title, year }) => ({
        cityId: year,
        cityName: title,
      })),
      degreeName: values.degreeName.reduce((result, { title, inputValue }) => {
        if (inputValue) {
          return result ? `${result}, ${inputValue}` : inputValue;
        } else {
          return result ? `${result}, ${title}` : title;
        }
      }, ''),
    };

    SubmittedValues.clientId =
      role === 'Admin' ? SubmittedValues.clientId.year : clientId;
    SubmittedValues.createdBy = role === 'Admin' ? null : clientId;
    SubmittedValues.acceptance =
      role === 'Admin'
        ? AcceptanceType['AcceptanceByClient']
        : AcceptanceType['Acceptance'];

    const apiData = reverseCheckAndSet(SubmittedValues);
    console.log(apiData, 'apiData');

    const submitAction =
      type === 'edit' && stepOneData?.id ? editJdDetails : addJdDetails;

    if (apiData?.clientId) {
      submitAction(apiData);
    } else {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  function groupSkillsByParentSkill(skills) {
    let skillGroups = {};

    for (const skill of skills) {
      const parentSkillName = skill.parentSkillName;
      const skillPlatformId = skill.skillPlatformId;
      const skillId = skill.skillId;
      const skillType = skill.skillType;

      if (parentSkillName in skillGroups) {
        skillGroups[parentSkillName].jdSkillPlatforms.push({
          name: skill.name,
          skillLevel: skill.skillLevel,
          experienceInMonths: parseInt(skill.experienceInMonths) || 0,
          skillPlatformId:
            skillPlatformId !== undefined ? skillPlatformId : null,
          skillType: skillType,
        });
      } else {
        skillGroups[parentSkillName] = {
          name: parentSkillName,
          skillType: skillType,
          skillId: skillId !== undefined ? skillId : null,
          jdSkillPlatforms: [
            {
              name: skill.name,
              skillLevel: skill.skillLevel,
              experienceInMonths: parseInt(skill.experienceInMonths) || 0,
              skillPlatformId:
                skillPlatformId !== undefined ? skillPlatformId : null,
              skillType: skillType,
            },
          ],
        };
      }
    }

    return Object.values(skillGroups);
  }

  const handleStepTwoSubmit = (values, { setSubmitting }) => {
    console.log(values, 'values');

    let postValues = {
      ...values,
      skillPlatforms: values.skillPlatforms?.map(res => ({
        skillLevel: res?.skillLevel,
        experienceInMonths: res?.experienceInMonths,
        parentSkillName: res.skillPlatformId.inputValue
          ? res.skillPlatformId.inputValue
          : res.skillPlatformId.title.split(',')[0].trim(),
        skillId: res?.skillPlatformId?.value,
        skillPlatformId: res?.skillPlatformId?.id,
        skillType: res?.skillType,
        name: res.skillPlatformId.inputValue
          ? res.skillPlatformId.inputValue
          : res.skillPlatformId.name,
      })),
    };
    console.log('postValues', postValues);

    const hasDuplicatesSkillPLatforms =
      checkDuplicateSkillPlatforms(postValues);

    const hasDuplicatesOtherskills = hasDuplicates(values);

    console.log(hasDuplicatesSkillPLatforms, hasDuplicatesOtherskills);
    if (hasDuplicatesSkillPLatforms) {
      // Handle duplicate skill platforms
      console.log(hasDuplicatesSkillPLatforms, 'hasDuplicates');
      dispatch(
        setAlertPopup({
          message: 'Duplicate Skill Platforms cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else if (hasDuplicatesOtherskills) {
      // Handle duplicate skill platforms
      dispatch(
        setAlertPopup({
          message:
            'Duplicate Entry found kindly crosscheck in Soft Skills and Other Soft Skills cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      console.log('stepOneData', stepOneData);
      if (stepOneData?.jdSkills?.length <= 0 || !stepOneData?.jdSkills) {
        let Values = {
          jdSkills: postValues.skillPlatforms,
          jdSoftSkills: values.softSkill?.map(res => ({
            skillId: res?.year,
            name: res?.title,
          })),
          jdTraits: values.traits?.map(res => ({
            weight: `${res?.weight}` || '0',
            name: res?.name,
          })),
        };
        let mj = {
          ...Values,
          jdSkills: groupSkillsByParentSkill(Values.jdSkills),
        };
        console.log('mapped skills', mj);
        addJdSkills(mj);
      }
    }
  };

  const addJdSkills = async SubmittedValues => {
    console.log(SubmittedValues);
    setLoading(true);
    const opts = {
      body: SubmittedValues,
    };
    console.log('addskill', opts);
    try {
      const response =
        await jobDescriptionApi.apiJobDescriptionUpdateJdAndSkillsJobDescriptionIdPost(
          stepOneData?.id,
          opts
        );

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Skill created successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        setLoading(false);
        router.replace({
          pathname: `${UrlBase}view`,
          query: { guId: stepOneData.uniqueGuid },
        });
      } else {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      setLoading(false);
      console.log(error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const addJdDetails = async SubmittedValues => {
    setLoading(true);
    const opts = {
      body: SubmittedValues,
    };
    try {
      const response = await jobDescriptionApi.apiJobDescriptionPost(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message:
              'Automated Skill Extraction is in progress please wait !...',
            type: 'success',
            duration: 3000,
          })
        );

        console.log(response.body.message);
        const Result = response.body.result;

        const opts = {
          jd_id: Result.id,
          description: `${SubmittedValues.description}${SubmittedValues.responsibilities}${SubmittedValues.requirements}`,
        };
        callApi('JdSkillExtractionApi', opts)
          .then(response => {
            setLoading(false);
            console.log(
              response,
              'response',
              'parsedData',
              response?.data?.parsedData
            );
            setStepOneData(Result);
            setStepTwoData(response.data.parsedData);
            setActiveStep(activeStep + 1);
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
      } else {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
      console.log('post', response);
    } catch (error) {
      setLoading(false);
      console.log(error, 'error');
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  const editJdDetails = async SubmittedValues => {
    const opts = {
      body: SubmittedValues,
    };

    try {
      const response = await jobDescriptionApi.apiJobDescriptionPut(opts);

      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: 'Jobs updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        // setStepOneData(response.body.result);

        GetJdById(response.body.result?.id);

        setActiveStep(activeStep + 1);
      } else if (response.body.message === 'Already Exists.') {
        dispatch(
          setAlertPopup({
            message: 'Already exists.',
            type: 'error',
            duration: 3000,
          })
        );
      } else if (response.body.message === 'Updation Failed.') {
        dispatch(
          setAlertPopup({
            message: 'Updation failed',
            type: 'error',
            duration: 3000,
          })
        );
      }

      console.log('post', response);
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  return (
    <MyFormContext.Provider
      value={{
        stepOneData,
        stepTwoData,
        stepThreeData,
        setStepOneData,
        setStepTwoData,
        setStepThreeData,
        setActiveStep,
        activeStep,
        operationType,
        setOperationType,
        EditData,
        role,
        GetJdById,
      }}
    >
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && <JdForm onSubmit={handleStepOneSubmit} />}
      {activeStep === 1 && (
        <>
          {type != 'edit' ? (
            <JdTechSkillForm onSubmit={handleStepTwoSubmit} />
          ) : (
            <>
              {stepOneData?.jdSkills.length <= 0 ? (
                <JdTechSkillForm onSubmit={handleStepTwoSubmit} />
              ) : (
                <>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <EditJdTechSkills />
                    <ProfileCard
                      styleProps={{
                        ...{ commonStyle },
                      }}
                    >
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
                        Soft Skills
                      </Typography>
                      <Stack spacing={2}>
                        <EditJdSkillForm />
                        <EditJdTraits />
                      </Stack>
                    </ProfileCard>
                  </Stack>
                </>
              )}
            </>
          )}
        </>
      )}
      {/* {type != 'edit' && activeStep === 2 && <JdTechSkillForm onSubmit={handleStepTwoSubmit} />} */}
    </MyFormContext.Provider>
  );
};

export default JdStepper;
