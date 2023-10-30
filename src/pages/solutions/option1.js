import Check from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 14,
    left: 'calc(-50% + 7px)',
    right: 'calc(50% + 7px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
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
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function getMonthYearFromUTC(utcTimestamp) {
  const date = new Date(utcTimestamp);
  const year = date.getUTCFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${month} ${year}`;
}
function convertMonthsToYears(months) {
  const years = months / 12;
  const roundedYears = Math.round(years * 100) / 100;
  const formattedYears = roundedYears.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: roundedYears % 1 === 0 ? 0 : 2,
  });
  return `${formattedYears} ${formattedYears === '1' ? 'year' : 'years'}`;
}

const timeLine = [
  {
    id: 1,
    startDate: '2019-02-14T13:27:22.963Z',
    endDate: '2020-02-14T13:27:22.963Z',
    name: 'Kannada School',
    jobTitle: '',
    degereeName: 'SSLC',
    expierenceInMonths: null,
    isCurrentEmployee: false,
  },
  {
    id: 2,
    startDate: '2020-02-14T13:27:22.963Z',
    endDate: null,
    name: 'VCNR',
    jobTitle: 'Staff',
    degereeName: '',
    expierenceInMonths: '48',
    isCurrentEmployee: true,
  },
  {
    id: 3,
    startDate: '2020-02-14T13:27:22.963Z',
    endDate: null,
    name: 'VCNR',
    jobTitle: 'Staff',
    degereeName: '',
    expierenceInMonths: '48',
    isCurrentEmployee: true,
  },
];
function ColorlibStepIcon(props) {
  const { active, completed, className, data } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <Stack spacing={2} alignItems={'center'}>
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={`${className} ${stepConnectorClasses.root}`}
      >
        {/* {icons[String(data?.id)]} */}
      </ColorlibStepIconRoot>
    </Stack>
  );
}

export default function CustomStepper() {
  return (
    <Stack sx={{ width: '100%', minWidth: 500 }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={2}
        connector={<ColorlibConnector />}
      >
        {timeLine.map(values => (
          <Step key={values.id}>
            <StepLabel
              StepIconComponent={stepIconProps => (
                <ColorlibStepIcon {...stepIconProps} data={values} />
              )}
              label={values.name}
              data={values}
            >
              <Typography variant="body1" color="initial">
                {getMonthYearFromUTC(values.startDate)}
              </Typography>
              <Typography variant="body1" color="initial">
                {values?.name}
              </Typography>
              <Typography variant="body1" color="initial">
                {values?.jobTitle}
                {values?.degereeName}
              </Typography>
              <Typography variant="body1" color="initial">
                {convertMonthsToYears(values?.expierenceInMonths)}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
