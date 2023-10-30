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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { Stack } from '@mui/material';
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
      backgroundImage: steeperColor,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: steeperColor,
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
    // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: ownerState.steeperColor,
  }),
}));

function convertMonthsToYears(months) {
  const years = months / 12;
  const roundedYears = Math.round(years * 100) / 100;
  const formattedYears = roundedYears.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: roundedYears % 1 === 0 ? 0 : 2,
  });
  return `${formattedYears} ${formattedYears === '1' ? 'year' : 'years'}`;
}

function ColorlibStepIcon(props) {
  const theme = useTheme();
  const { active, completed, className, data } = props;

  const steeperColor = data.isCollege ? WorkColor : CollegeColor;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <Stack spacing={2} alignItems={'center'}>
      <TimeLineText>{formatDate(data.startDate, 'month') || '-'}</TimeLineText>
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
  const timeLine = context2
    ? context2?.data?.timeLine
    : context1.data?.timeLine;

  return (
    <Stack sx={{ width: '100%', minWidth: 500 }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={timeLine?.length}
        connector={<ColorlibConnector />}
      >
        {timeLine &&
          timeLine.map(values => (
            <Step key={values.id}>
              <StepLabel
                StepIconComponent={stepIconProps => (
                  <ColorlibStepIcon {...stepIconProps} data={values} />
                )}
                label={values.name}
                data={values}
              >
                <Stack spacing={1}>
                  <TimeLineText>
                    {formatDate(values?.endDate, 'month') || '-'}
                  </TimeLineText>
                  <TimeLineText weight="600">{values?.name}</TimeLineText>
                  <TimeLineText weight="500">
                    {values?.jobTitle}
                    {values?.degereeName}
                  </TimeLineText>
                  <TimeLineText weight="400">
                    {convertMonthsToYearsAndMonths(values?.experienceInMonths)}
                  </TimeLineText>
                </Stack>
              </StepLabel>
            </Step>
          ))}
      </Stepper>
    </Stack>
  );
}

const TimeLine = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  const timeLine = context2
    ? context2?.data?.timeLine
    : context1.data?.timeLine;

  const Message = context2
    ? context2?.messages?.view.timeline
    : context1?.messages?.public_view?.timeline;
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
        <CardSectionHeader>TimeLine</CardSectionHeader>

        {(timeLine === null || timeLine?.length <= 0) && (
          <InfoCard text={Message} />
        )}
        {timeLine?.length > 0 && <CustomStepper />}
      </Stack>
    </ProfileCard>
  );
};

export default TimeLine;
