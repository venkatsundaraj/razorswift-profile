import MainCard from '@/cardComponents/MainCard';
import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { skillLevels } from '@/src/data/Enum';
import {
  CandidateSkillApi,
  CompanyApi,
  SkillPlatformApi,
} from '@/swagger_api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import {
  multiLineValidation,
  nameValidationwithNoRegex,
  staticDropDownValidation,
} from '@/utils/validationSchema';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';

import ProfileCard from '@/cardComponents/ProfileCard';
import styled from '@emotion/styled';
const commonStyle = {
  //   height: '100px',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 0,
  minHeight: 50,
};
const CardSectionHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '15.4px',
  textAlign: 'inherit',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '12.23px',
  },
}));
// path way

const Option31 = () => {
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState([]);
  const [skillAliases, setAliases] = useState([]);
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const candidateSkillApi = useMemo(() => new CandidateSkillApi(), []);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const companyApi = useMemo(() => new CompanyApi(), []);
  const [skillPlatformList, setSkillPlatformApiList] = useState([]);
  const stepMasters = [
    {
      id: 1,
      stepName: 'create profile',
      isMandate: true,
      attributes: [
        {
          mainHeader: 'Reference',
          details: [
            {
              label: 'Name',
              type: 'text',
              isRequired: true,
              fieldName: 'name',
            },
            {
              label: 'Link',
              type: 'url',
              isRequired: true,
              fieldName: 'link',
            },
            {
              label: 'Date',
              type: 'date',
              isRequired: true,
              fieldName: 'date',
            },
          ],
        },
        {
          mainHeader: 'Outcome',
          details: [
            {
              label: 'Pass',
              type: 'text',
              isRequired: true,
              fieldName: 'pass',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      stepName: 'Assessment',
      isMandate: false,
      attributes: [
        {
          mainHeader: 'Outcome',
          details: [
            {
              label: 'Min marks',
              type: 'number',
              isRequired: true,
              fieldName: 'minMarks',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      stepName: 'Courses',
      isMandate: false,
    },
  ];

  const PathWayTypes = [
    { id: 1, value: 1, name: 'Jobs' },
    { id: 2, value: 2, name: 'Skill' },
    { id: 3, value: 3, name: 'Company' },
  ];

  const INITIAL_FORM_STATE = {
    skill: '',
    skill_level: '',
    pathwayType: '',
    title: '',
    description: '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    skill: Yup.mixed().required('Skill platform is required'),
    title: nameValidationwithNoRegex('Title', true),
    description: multiLineValidation('Description', true),
    skill_level: staticDropDownValidation('SKill Level', true, skillLevels),
    pathwayType: staticDropDownValidation('Path Way', true, PathWayTypes),
  });

  const SubmitDetails = async (values, { resetForm }) => {
    console.log('sub', values);
  };
  const GetSkillAlias = useCallback(async () => {
    try {
      const response =
        await candidateSkillApi.apiCandidateSkillGetAllCandidateSkillPlatformCandidateIdGet(
          userDetails?.candidateId
        );
      const trim =
        response?.body?.result?.map((res, index) => ({
          id: res.id,
          title: res.name,
        })) || [];
      setAliases(trim);
    } catch (error) {
      console.log(error);
    }
  }, [userDetails?.candidateId, candidateSkillApi]);

  const handleInputSkillPlatformName = useCallback(
    debounce(async (event, newValue) => {
      let opts = {
        name: newValue,
      };

      try {
        const response = await skillPlatformApi.apiSkillPlatformGetAllByNameGet(
          opts
        );

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
    GetSkillAlias();
  }, [GetSkillAlias]);
  useEffect(() => {
    handleInputSkillPlatformName('');
  }, [handleInputSkillPlatformName]);
  return (
    <Stack maxWidth="xl" sx={{ margin: 5 }} spacing={10}>
      <MainCard title="PathWay creation">
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) =>
            SubmitDetails(values, { resetForm })
          }
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
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={6} md={6} alignSelf="flex-start">
                  <SelectWrapper
                    name={`pathwayType`}
                    textLabel="Pathway Type"
                    textLabelStyle={textLabel}
                    options={PathWayTypes}
                    placeholder="Select Path Type"
                    inputProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextfieldWrapper
                    name="title"
                    textLabelStyle={textLabel}
                    textLabel="Title"
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextfieldWrapper
                    name="description"
                    multiline
                    minRows={4}
                    textLabelStyle={textLabel}
                    textLabel="Description"
                    otherProps={otherPropsRequired}
                  />
                </Grid>

                <Grid item xs={6} md={6}>
                  <HandleInputChangeAutocomplete
                    isNotAdd={false}
                    otherProps={otherPropsRequired}
                    options={skillPlatformList}
                    handleInputChange={handleInputSkillPlatformName}
                    textLabelStyle={textLabel}
                    name="skill"
                    label="Skills"
                    placeHolder="Select Skill"
                    value={values.Skills}
                    onChange={(e, value) => {
                      setFieldValue('Skills', value);
                    }}
                  />
                </Grid>

                <Grid item xs={6} md={6} alignSelf="flex-start">
                  <SelectWrapper
                    name={`skill_level`}
                    textLabel="Skill Level"
                    textLabelStyle={textLabel}
                    options={skillLevels}
                    placeholder="Select level"
                    inputProps={otherPropsRequired}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  alignSelf="flex-end"
                  textAlign="center"
                >
                  <SubmissionButton onClick={handleSubmit}>
                    Submit
                  </SubmissionButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Divider sx={{ marginY: 3 }} />

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          <Grid item xs={12} sm={4}>
            <ProfileCard
              styleProps={{
                ...commonStyle,
              }}
            >
              <Stack direction="column" justifyContent="space-evenly">
                <CardSectionHeader>List</CardSectionHeader>
                <List>
                  {stepMasters.map(step => (
                    <ListItem key={step.id}>
                      <ListItemText primary={step.stepName} />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </ProfileCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProfileCard
              styleProps={{
                ...commonStyle,
              }}
            >
              <CardSectionHeader>selected Items</CardSectionHeader>
            </ProfileCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ProfileCard
              styleProps={{
                ...commonStyle,
              }}
            >
              <CardSectionHeader>Forms</CardSectionHeader>
            </ProfileCard>
          </Grid>
        </Grid>
      </MainCard>
    </Stack>
  );
};
export default Option31;
