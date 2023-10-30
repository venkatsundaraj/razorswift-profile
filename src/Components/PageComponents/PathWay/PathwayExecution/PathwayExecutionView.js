import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import useReadMore from '@/customHooks/useReadMore';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { EnrollContext } from '@/src/pages/pathway/enroll';
import { PathwayViewContext } from '@/src/pages/pathway/enroll/pathway_execution';
import { setAlertPopup } from '@/store/alertSlice';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const createValidationSchema = questions => {
  return yup.object().shape(
    questions.reduce((acc, curr) => {
      if (curr.is_required) {
        acc[curr.question_id] = yup.string().required('This field is required');
      } else {
        acc[curr.question_id] = yup.string();
      }
      return acc;
    }, {})
  );
};

const AUTO_URL_COPY = 1;
const JUST_LINK = 2;
const LIST_OF_QUESTIONS = 3;
const LINK_WITH_BUTTON = 4;

const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};
const SkillTitleName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '17px',
  lineHeight: '23.33px',
  width: '100%',
  wordBreak: 'break-word',

  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '18.66px',
  },
}));

const SkillMainName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '23.33px',
  width: '100%',
  overflow: 'hidden',
  // textOverflow: 'ellipsis',
  wordBreak: 'break-word',

  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '18.66px',
  },
}));

const SkillSubName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '13px',
  lineHeight: '20.33px',
  width: '100%',
  // maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '16.66px',
  },
}));

const PathwayExecutionView = ({ explore }) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const EnrollContextData = useContext(EnrollContext);
  const router = useRouter();

  const PathwayViewContextData = useContext(PathwayViewContext);
  console.log('PathwayViewContextData', PathwayViewContextData);

  let data = PathwayViewContextData?.pathwayDetails;
  let pathwayDetail = data?.pathway_detail;
  console.log('data', data);

  if (!data) {
    return <NoItemCard Message={'No Enrolled Data'} />;
  }

  const handleEnroll = value => {
    console.log('enroll', value);
    const confirmAction = async () => {
      setLoading(true);
      try {
        dispatch(
          setAlertPopup({
            message: 'You have enrolled to this Pathway Successfully',
            type: 'success',
            duration: 3000,
          })
        );
      } catch (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      } finally {
        setLoading(false);
      }
    };

    const revertAction = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the Enroll action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to enroll to this Jobs!',
      confirmAction,
      revertAction
    );
  };

  const handlePathwayExecution = value => {
    console.log('value', value);
    router.push({
      pathname: '/pathway/enroll/pathway_execution',
      query: {
        // guId: value.id,
        id: value.id,
      },
    });
  };
  return (
    <ProfileCard
    //   styleProps={{
    //     ...{ commonStyle },
    //   }}
    >
      <Stack spacing={2}>
        <HeadingDisplay title="Title" value={pathwayDetail.job_title} />
        <HeadingDisplay title="Name" value={pathwayDetail.name} />
        {pathwayDetail?.jd_slug && (
          <HeadingDisplay
            title="Slug"
            value={pathwayDetail.jd_slug}
            type="link"
            label="View Jobs Info"
          />
        )}
        <Divider
          sx={{
            border: '1px solid #DDDDDD',
            borderRadius: '13px',
          }}
        />
        <SoftSkills values={pathwayDetail} explore={explore} />
        {!explore && (
          <Stack alignItems={'center'} sx={{ marginTop: 2 }}>
            <Button
              sx={{ maxWidth: 300 }}
              variant="contained"
              onClick={() => handlePathwayExecution(pathwayDetail)}
            >
              Pathway Execution
            </Button>
          </Stack>
        )}
        {explore && (
          <Stack alignItems={'center'} sx={{ marginTop: 2 }}>
            <Button
              sx={{ maxWidth: 100 }}
              variant="contained"
              onClick={() => handleEnroll(pathwayDetail)}
            >
              Enroll
            </Button>
          </Stack>
        )}
      </Stack>
    </ProfileCard>
  );
};

export default PathwayExecutionView;

const SoftSkills = ({ values, explore }) => {
  const data = values?.steps_data || [];
  const [selectedStepId, setSelectedStepId] = useState(null); // Initially, no step is selected

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(data);
  const handleSelection = stepId => {
    setSelectedStepId(stepId);
  };

  const selectedData = displayData.find(
    item => item.step_id === selectedStepId
  );

  if (!data || data.length === 0) {
    return (
      <NoItemCard Message={`No ${explore ? 'Explored' : 'Enrolled'} Data`} />
    );
  }
  let isUpdateEnabled = false;

  const handleCopyToClipboard = text => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('Successfully copied to clipboard');
        },
        function (err) {
          console.error('Unable to copy', err);
        }
      );
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };
  const handleLinkWithAButton = value => {
    console.log(value);
  };
  const validationSchema = createValidationSchema(
    selectedData?.step_data?.step_delivery?.questions_data || []
  );
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <ProfileCard>
          <Stack
            direction="column"
            // divider={<Divider orientation="horizontal" flexItem />}
            spacing={1}
          >
            <SectionHeader padding={0}>Steps</SectionHeader>
            {displayData.map((value, index) => {
              const isFirstItemWithStatusZero =
                value?.status === 0 && !isUpdateEnabled;
              isUpdateEnabled = isUpdateEnabled || isFirstItemWithStatusZero;

              return (
                <ButtonBase
                  variant="outlined"
                  fullWidth
                  onClick={() => handleSelection(value.step_id)}
                  key={value?.step_id}
                  sx={{
                    '--tw-bg-opacity': 1,
                    backgroundColor:
                      value.step_id === selectedStepId
                        ? 'lightyellow'
                        : 'white',
                    border: '1px solid',
                    borderRadius: 2,
                    textAlign: 'start',
                  }}
                >
                  <SkillMainName
                    key={data.step_id}
                    variant="body1"
                    color="initial"
                    sx={{
                      position: 'relative',
                      paddingLeft: '19px',
                      '&::before': {
                        content: `"${index + 1}."`,
                        position: 'relative',
                        left: 0,
                        top: '0',
                      },
                    }}
                  >
                    {value?.step_data?.short_text}
                  </SkillMainName>
                </ButtonBase>
              );
            })}
            {showMoreButton && (
              <Button onClick={handleReadMoreClick}>More</Button>
            )}
            {showReadLessButton && (
              <Button onClick={handleReadLessClick}>Read Less</Button>
            )}
          </Stack>
        </ProfileCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProfileCard>
          <Box
            ml={2}
            flexGrow={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {selectedData ? (
              <>
                {selectedData?.step_data?.step_delivery?.type ===
                  AUTO_URL_COPY && (
                  <Tooltip title="Copy to clipboard">
                    <Stack direction={'row'} alignItems={'center'}>
                      <Typography>
                        {selectedData?.step_data?.step_delivery?.statement}
                      </Typography>{' '}
                      <IconButton
                        onClick={() =>
                          handleCopyToClipboard(
                            selectedData?.step_data?.step_delivery
                              ?.action_endpoint
                          )
                        }
                      >
                        <FileCopyIcon />
                      </IconButton>
                    </Stack>
                  </Tooltip>
                )}

                {selectedData?.step_data?.step_delivery?.type === JUST_LINK && (
                  <Stack direction={'row'}>
                    <Typography sx={{ fontWeight: '600' }}>Link:</Typography>
                    <MuiLink
                      component={NextLink}
                      underline="none"
                      prefetch={false}
                      href={decodeURIComponent(
                        selectedData?.step_data?.step_delivery?.link || ''
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedData?.step_data?.step_delivery?.label ||
                        'Candidate Link'}
                    </MuiLink>
                  </Stack>
                )}
                {selectedData?.step_data?.step_delivery?.type ===
                  LINK_WITH_BUTTON && (
                  <Stack
                    direction={'Column'}
                    sx={{ height: 1, alignItems: 'center' }}
                  >
                    <Typography sx={{ fontWeight: '600', textAlign: 'center' }}>
                      {selectedData?.step_data?.step_delivery?.statement}
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() =>
                        handleLinkWithAButton(selectedData?.step_data)
                      }
                    >
                      {selectedData?.step_data?.step_delivery?.button_text}
                    </Button>
                  </Stack>
                )}
                {selectedData?.step_data?.step_delivery?.type ===
                  LIST_OF_QUESTIONS && (
                  <Formik
                    initialValues={selectedData?.step_data?.step_delivery?.questions_data.reduce(
                      (acc, curr) => ({
                        ...acc,
                        [curr.question_id]: curr.user_input || '',
                      }),
                      {}
                    )}
                    onSubmit={values => {
                      console.log(values);
                    }}
                    validationSchema={validationSchema}
                  >
                    {() => (
                      <Form>
                        <Typography sx={{ fontWeight: '600' }}>
                          {selectedData?.step_data?.step_delivery?.statement}
                        </Typography>

                        {selectedData?.step_data?.step_delivery?.questions_data.map(
                          question => (
                            <TextfieldWrapper
                              key={question.question_id}
                              name={question.question_id.toString()}
                              textLabelStyle={textLabel}
                              textLabel={question.question_text}
                              otherProps={
                                question.is_required
                                  ? otherPropsRequired
                                  : otherPropsNotRequired
                              }
                            />
                          )
                        )}

                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                        >
                          {selectedData?.step_data?.step_delivery?.button_text}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                )}
              </>
            ) : (
              <Typography>Please select a step to view details</Typography>
            )}
          </Box>
        </ProfileCard>
      </Grid>
    </Grid>
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
const SkillBadge = ({ SkillSubName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <Box
        sx={{
          height: 5,
          width: 5,
          borderRadius: '100%',
          bgcolor: 'red',
        }}
      />
      {SkillSubName}
    </Box>
  );
};

const HeadingDisplay = ({ title, value, type, label }) => (
  <Stack spacing={2}>
    <Stack direction="column">
      <SkillTitleName>
        {title}:
        {type != 'link' && (
          <span style={{ fontWeight: 'normal' }}>{value}</span>
        )}
        {type === 'link' && (
          <MuiLink
            component={NextLink}
            underline="none"
            prefetch={false}
            href={decodeURIComponent(value || '')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </MuiLink>
        )}
      </SkillTitleName>
    </Stack>
  </Stack>
);
