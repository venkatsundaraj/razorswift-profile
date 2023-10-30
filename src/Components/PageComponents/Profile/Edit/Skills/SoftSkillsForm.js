import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import useReadMore from '@/customHooks/useReadMore';
import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import {
  commonStyle,
  SkillBadge,
  SkillMainName,
} from '@/pageComponents/Profile/Edit/Skills/CommonComponentsSkills';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { CandidateSkillApi, SkillApi } from '@/swagger_api/api/SkillApi';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Divider, Grid, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  softSkill: Yup.array(),
  //.min(1, 'Please select at least one Soft Skill')
  // .required('Soft Skills are  required'),
});

const initialValues = {
  softSkill: [],
};

const SoftSkillsForm = () => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
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
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(skillView);
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const Message = context2
    ? context2?.messages?.edit.softskills
    : context1?.messages?.edit?.softskills;

  useEffect(() => {
    GetSoftSkillName();
  }, []);

  async function GetSoftSkillName() {
    const skillApi = new SkillApi();
    const opts = { skillType: 2 };
    await skillApi
      .apiSkillGetAllByFilterGet(opts)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            year: res?.id,
            title: res?.name,
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
    console.log('softskills', values.softSkill);

    const skillId = values.softSkill?.map((res, index) => ({
      skillId: res?.year,
      name: res?.title,
    }));

    const opts = {
      skillType: 2,
      body: skillId,
    };

    await candidateSkillApi
      .apiCandidateSkillUpdateNonTechnicalSkillsCandidateIdPost(
        userDetails?.candidateId,
        opts
      )
      .then(async response => {
        // setLoading(false);
        if (response.body.message === 'Updated Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Soft Skills updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
          setScreenStatus('1');
          resetForm();
          GetSoftSkillName();
          getSoftSkillByCandidateId();

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
      .catch(function (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
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
      skillType: 2,
    };
    await candidateSkillApi
      .apiCandidateSkillGetAllFilterByCandidateIdCandidateIdGet(
        userDetails?.candidateId,
        opts
      )
      .then(async response => {
        if (response?.body?.result) {
          const trim = response?.body?.result?.map((res, index) => ({
            year: res?.skillId,
            title: res?.skill.name,
          }));
          setSkillView(trim);
          console.log('trim values', trim);
          setSoftSkillsInitialValues({ softSkill: trim });
        } else if (response.body.message === 'No Records Found.') {
          setSkillView([]);
          setSoftSkillsInitialValues(initialValues);
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
  const componentRef = useRef(null);

  const handleClickScroll = () => {
    const element = document.getElementById('section-1');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
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
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <CardSectionHeader>Soft Skills</CardSectionHeader>

                  {skillView.length > 0 && (
                    <IconButton
                      color="primary"
                      disableRipple
                      size="small"
                      aria-label="back"
                      sx={{ padding: '0px 0px 20px 0px' }}
                      onClick={() => {
                        setScreenStatus('3');
                        handleClickScroll();
                      }}
                    >
                      <EditIcon fontSize="12px" />
                    </IconButton>
                  )}
                </Stack>
                {skillView.length <= 0 && <NoItemCard Message={Message} />}
                <Stack
                  direction="column"
                  divider={<Divider orientation="horizontal" flexItem />}
                  spacing={1}
                >
                  {skillView &&
                    displayData.map(skill => (
                      <Stack
                        key={skill.year}
                        direction="row"
                        justifyContent={'space-between'}
                        spacing={1}
                      >
                        <SkillBadge
                          SkillSubName={
                            <SkillMainName
                              key={skill.year}
                              variant="body1"
                              color="initial"
                            >
                              {skill?.title}
                            </SkillMainName>
                          }
                        />
                      </Stack>
                    ))}
                  {showMoreButton && (
                    <Button onClick={handleReadMoreClick}>More</Button>
                  )}
                  {showReadLessButton && (
                    <Button onClick={handleReadLessClick}>Read Less</Button>
                  )}
                </Stack>
              </Stack>
            </ProfileCard>
          </Grid>
        </Grid>
      </Stack>

      {isAdding || isEditing ? (
        <Stack direction="row" justifyContent="space-between">
          <FormHeaderComponents
            title={`${skillView.length > 0 ? 'Add/Edit' : 'Add '} Soft Skills`}
            isButtonNotRequired={true}
          />
          <IconButton
            size="small"
            disableRipple
            onClick={() => {
              setScreenStatus('1');
            }}
          >
            <ClearIcon color="primary" />
          </IconButton>
        </Stack>
      ) : null}
      {isAdding || isEditing ? (
        <Formik
          enableReinitialize
          initialValues={softSkillsInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
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
              <Grid container spacing={2} id="section-1">
                <Grid item xs={12}>
                  <GetValuesAutocomplete
                    multiple={true}
                    otherProps={{ ...otherProps, required: false }}
                    options={skill}
                    textLabelStyle={textLabel}
                    name="softSkill"
                    label="Soft Skills"
                    placeHolder="Select your Soft Skills"
                    value={values.softSkill}
                    onChange={(e, value) => {
                      setFieldValue('softSkill', value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <SubmissionButton type="submit" onClick={handleSubmit}>
                      Submit
                    </SubmissionButton>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : null}
      {skillView.length < 1 && isAddingViewing && (
        <Stack direction="row" spacing={2}>
          <ShadowButtonSubmit
            height="40px"
            width="100%"
            minwidth="200px"
            maxwidth="200px"
            backgroundcolor="#A62973"
            variant="contained"
            onClick={() => {
              setScreenStatus('2');
            }}
          >
            Add New Soft Skills
          </ShadowButtonSubmit>
        </Stack>
      )}
    </>
  );
};

export default SoftSkillsForm;

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
