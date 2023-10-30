import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import TimeLineText from '@/headingComponents/ProfileText/TimeLineText/TimeLineText';
import VerticalTimeLineEducation from '@/pageComponents/Profile/Common/TimeLine/VerticalTimeLineEducation';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { Box, Stack } from '@mui/material';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled, useTheme } from '@mui/material/styles';
import { useContext } from 'react';
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
      <TimeLineText>{formatDate(data?.endDate, 'month') || '-'}</TimeLineText>
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
        activeStep={qualificationTimeLine?.length}
        // connector={getConnector}
        connector={<ColorlibConnector steeperColor={WorkColorConnector} />}
      >
        {qualificationTimeLine &&
          qualificationTimeLine.map((values, index) => (
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

const Education = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  // const qualificationTimeLine = null;
  const qualificationTimeLine = context2
    ? context2?.data?.qualificationTimeLine
    : context1.data?.qualificationTimeLine;

  const educationMessage = context2
    ? context2?.messages?.view.education
    : context1?.messages?.public_view?.education;
  return (
    <ProfileCard
      styleProps={{
        backgroundImage:
          'linear-gradient(180deg, rgba(215, 231, 255, 0.18) -11.04%, rgba(255, 255, 255, 0) 147.96%);',
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-evenly"
        sx={{
          maxWidth: '700px',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <CardSectionHeader>Education Timeline</CardSectionHeader>
        {(qualificationTimeLine === null ||
          qualificationTimeLine?.length <= 0) && (
          <InfoCard text={educationMessage} />
        )}
        {qualificationTimeLine?.length > 0 && (
          <>
            <CustomStepper />
            <VerticalTimeLineEducation />
          </>
        )}
      </Stack>
    </ProfileCard>
  );
};

export default Education;
