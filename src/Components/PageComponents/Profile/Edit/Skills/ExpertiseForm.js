import ProfileCard from '@/cardComponents/ProfileCard';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  commonStyle,
  SkillBadge,
  SkillMainName,
} from '@/pageComponents/Profile/Edit/Skills/CommonComponentsSkills';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { CandidateSkillApi, SkillApi } from '@/swagger_api/api/SkillApi';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useTheme } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  softSkill: Yup.array().required('Required'),
});

const initialValues = {
  softSkill: [],
};

const ExpertiseForm = () => {
  const [count, setCount] = useState(1);
  const theme = useTheme();
  const [screenStatus, setScreenStatus] = useState('1');
  const [skill, setSkill] = useState([]);
  const [skillView, setSkillView] = useState([]);
  const [softSkillsInitialValues, setSoftSkillsInitialValues] =
    useState(initialValues);
  const isAddingViewing = getFormTypes('Add_View') === screenStatus;
  const isEditing = getFormTypes('Edit_Form') === screenStatus;
  const isAdding = getFormTypes('Add_Form') === screenStatus;
  const userDetails = localStorageUtil.getItem('userDetails');
  const [displayCount, setDisplayCount] = useState(5);
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

  const handleReadMoreClick = () => {
    if (displayCount + 5 >= skillView.length) {
      setDisplayCount(skillView.length);
    } else {
      setDisplayCount(displayCount + 5);
    }
  };

  useEffect(() => {
    GetSoftSkillName();
  }, []);

  async function GetSoftSkillName() {
    const skillApi = new SkillApi();
    const opts = { skillType: 3 };
    await skillApi
      .apiSkillGetAllByFilterGet(opts)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            id: res?.id,
            name: res?.name,
          }));
          setSkill(trim);
          getSoftSkillByCandidateId();
        }
      })
      .catch(function (error) {
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

  async function UpdateNonTechnicalSkill(values, { resetForm }) {
    const candidateSkillApi = new CandidateSkillApi();

    const skillId = values.softSkill?.map((res, index) => ({
      skillId: res?.id,
    }));

    const opts = {
      skillType: 3,
      body: skillId,
    };

    await candidateSkillApi
      .apiCandidateSkillUpdateNonTechnicalSkillsCandidateIdPost(
        userDetails?.candidateId,
        opts
      )
      .then(async response => {
        // setLoading(false);
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.body.message,
          });
          setScreenStatus('1');
          resetForm();
          getSoftSkillByCandidateId();

          resetForm();
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
  }
  async function getSoftSkillByCandidateId() {
    const candidateSkillApi = new CandidateSkillApi();
    const opts = {
      skillType: 3,
    };
    await candidateSkillApi
      .apiCandidateSkillGetAllFilterByCandidateIdCandidateIdGet(
        userDetails?.candidateId,
        opts
      )
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            id: res?.skillId,
            name: res?.skill.name,
          }));
          setSkillView(trim);
          setSoftSkillsInitialValues({ softSkill: trim });
        } else if (response.body.message === 'No Records Found.') {
          setSkillView([]);
        }
      })
      .catch(function (error) {
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
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <CardSectionHeader>Expertise Skills</CardSectionHeader>
                  <IconButton
                    color="primary"
                    disableRipple
                    size="small"
                    aria-label="back"
                    sx={{ padding: '0px 0px 20px 0px' }}
                    onClick={() => {
                      setScreenStatus('3');
                    }}
                  >
                    <EditIcon fontSize="12px" />
                  </IconButton>
                </Stack>

                <Stack
                  direction="column"
                  divider={<Divider orientation="horizontal" flexItem />}
                  spacing={1}
                >
                  {skillView &&
                    skillView.slice(0, displayCount).map(skill => (
                      <Stack
                        key={skill.id}
                        direction="row"
                        justifyContent={'space-between'}
                        spacing={1}
                      >
                        <SkillBadge
                          SkillSubName={
                            <SkillMainName
                              key={skill.id}
                              variant="body1"
                              color="initial"
                            >
                              {skill?.name}
                            </SkillMainName>
                          }
                        />
                      </Stack>
                    ))}
                  {skillView && displayCount < skillView.length && (
                    <Button onClick={handleReadMoreClick}> More</Button>
                  )}

                  {skillView && displayCount === skillView.length && (
                    <Button onClick={() => setDisplayCount(5)}>
                      Read Less
                    </Button>
                  )}
                </Stack>
              </Stack>
            </ProfileCard>
          </Grid>
        </Grid>
      </Stack>

      {isAdding || isEditing ? (
        <FormHeaderComponents
          title={`${skillView.length > 0 ? 'Edit' : 'Add'} Expertise Skills`}
          isButtonNotRequired={true}
        />
      ) : null}
      {isAdding || isEditing ? (
        <Formik
          enableReinitialize
          initialValues={softSkillsInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            UpdateNonTechnicalSkill(values, { resetForm });
            setScreenStatus('1');
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
              <Grid container>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Typography
                      sx={{
                        margin: 0.2,

                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '19.8px',
                        color:
                          touched.projectAndSkills && errors.projectAndSkills
                            ? '#f44336'
                            : '#434343',
                        ...textLabel,
                      }}
                    >
                      {'Expertise Skills'} {otherProps.required ? '*' : ''}
                    </Typography>
                    <>
                      <Autocomplete
                        multiple
                        fullWidth
                        id="softSkill"
                        variant="outlined"
                        options={skill}
                        getOptionLabel={option => option.name}
                        value={values.softSkill}
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label=""
                            placeholder="Skill"
                          />
                        )}
                        onChange={(event, value) => {
                          setFieldValue('softSkill', value);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                      />
                      {touched.softSkill && errors.softSkill && (
                        <Typography
                          error
                          variant="body2"
                          color="error"
                          gutterBottom
                        >
                          {errors.softSkill}
                        </Typography>
                      )}
                    </>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : null}
    </>
  );
};

export default ExpertiseForm;
