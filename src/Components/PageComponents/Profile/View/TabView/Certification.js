import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import TimeLineText from '@/headingComponents/ProfileText/TimeLineText/TimeLineText';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import {
  convertMonthsToYearsAndMonths,
  formatDate,
} from '@/utils/CommonFunctions/DateRelatedFunction';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Stack, styled } from '@mui/material';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';

const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '14px',
  lineHeight: lineHeight || '16.8px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '700',
  fontSize: '16px',
  lineHeight: lineHeight || '19.2px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '700',
    fontSize: '14px',
    lineHeight: lineHeight || '32.6px',
  },
}));

const WorkColor =
  'linear-gradient(261.41deg, #F1231A -12.87%, rgba(254, 139, 134, 0) 247.66%);';
const CollegeColor =
  'linear-gradient(180deg, #4F2ED3 0%, rgba(79, 46, 211, 0.0104167) 166.39%, rgba(138, 80, 230, 0) 166.41%);';

const ColorlibConnector = styled(StepConnector)(({ theme, steeperColor }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 47,
    left: 'calc(-50% + 7px)',
    right: 'calc(50% + 7px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: steeperColor || CollegeColor,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: steeperColor || CollegeColor,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: '30px',
  height: '30px',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: ownerState.steeperColor,
  }),
  ...(ownerState.completed && {
    backgroundImage: ownerState.steeperColor,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, data } = props;
  const steeperColor = CollegeColor;

  return (
    <Stack spacing={2} alignItems={'center'}>
      <TimeLineText>{formatDate(data?.startDate, 'month') || `-`}</TimeLineText>

      <ColorlibStepIconRoot
        ownerState={{ completed, active, steeperColor }}
        className={`${className} ${stepConnectorClasses.root}`}
      />
    </Stack>
  );
}

function CustomStepper() {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  // const certificateTimeLine = null;
  const certificateTimeLine = context2
    ? context2?.data?.certificates
    : context1.data?.certificates;

  const certificateMessage = context2
    ? context2?.messages?.view.certification
    : context1?.messages?.public_view?.certification;

  const qualificationTimeLine = context2
    ? context2?.data?.qualificationTimeLine
    : context1.data?.qualificationTimeLine;

  const theme = useTheme();
  const WorkColorConnector = 'linear-gradient(to bottom, #E2DDF8, white)';
  const CollegeColorConnector =
    'linear-gradient(270deg, #FEE2E1 -7.72%, #E2DDF8 105.76%);';

  return (
    <Box sx={{ width: '100%', minWidth: 500 }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={certificateTimeLine?.length}
        // connector={getConnector}
        connector={<ColorlibConnector steeperColor={WorkColorConnector} />}
      >
        {certificateTimeLine &&
          certificateTimeLine.map((values, index) => (
            <Step key={values.id}>
              <StepLabel
                StepIconComponent={stepIconProps => (
                  <ColorlibStepIcon {...stepIconProps} data={values} />
                )}
                label={values.name}
                data={values}
              ></StepLabel>
            </Step>
          ))}
      </Stepper>
    </Box>
  );
}

const Certification = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  // const certificateTimeLine = null;
  const certificateTimeLine = context2
    ? context2?.data?.certificates
    : context1.data?.certificates;

  const certificateMessage = context2
    ? context2?.messages?.view.certification
    : context1?.messages?.public_view?.certification;
  return (
    <ProfileCard
      styleProps={{
        backgroundImage:
          'linear-gradient(180deg, rgba(215, 231, 255, 0.18) -11.04%, rgba(255, 255, 255, 0) 147.96%);',
      }}
    >
      <CardSectionHeader>Certification</CardSectionHeader>
      {certificateTimeLine === null && <InfoCard text={certificateMessage} />}
      {certificateTimeLine && certificateTimeLine.length > 0 && (
        <>
          <CustomStepper />
          <Stack>
            <Timeline
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.2,
                },

                // '& .MuiTimelineItem-missingOppositeContent:before': { content: 'none' },
              }}
            >
              {certificateTimeLine &&
                certificateTimeLine.map(certificate => (
                  <TimelineItem key={certificate.id}>
                    <TimelineOppositeContent
                      style={{ flex: 0.4 }}
                    ></TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          background:
                            'linear-gradient(180deg, #F1231A 0%, #FE8B86 100%);',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack spacing={1}>
                        <Title>{certificate?.title}</Title>

                        <SubTitle weight="500">
                          {certificate?.authority}
                        </SubTitle>

                        <Stack direction="row" spacing={2}>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={'center'}
                            alignItems="center"
                            divider={
                              <Box
                                sx={{
                                  height: 5,
                                  width: 5,
                                  borderRadius: '100%',
                                  bgcolor: 'red',
                                }}
                              />
                            }
                          >
                            <SubTitle weight="600">
                              {formatDate(certificate.startDate, 'month') ||
                                '-'}
                            </SubTitle>
                            <SubTitle weight="600">
                              {formatDate(certificate.endDate, 'month') || '-'}
                            </SubTitle>
                          </Stack>
                          <SubTitle color="#6A6A6A">
                            {convertMonthsToYearsAndMonths(
                              certificate.expierenceInMonths
                            )}
                          </SubTitle>
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                ))}
            </Timeline>
          </Stack>
        </>
      )}
    </ProfileCard>
  );
};

export default Certification;
