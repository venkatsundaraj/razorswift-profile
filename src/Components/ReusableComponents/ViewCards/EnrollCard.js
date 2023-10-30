import { Box, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PathwayContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(120deg, #fdfbfb, #ebedee)',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '30px',
  boxShadow: `0 10px 15px ${theme.palette.grey[300]}`,
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const PathwayHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '10px',
  marginBottom: '20px',
  borderBottom: '2px solid #e0e0e0',
});

const PathwayTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});

const Status = styled(Typography)({
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '14px',
  textTransform: 'uppercase',
  backgroundColor: '#4caf50',
  color: 'white',
  cursor: 'pointer',
});

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  padding: '15px 0',
  borderBottom: `1px dashed ${theme.palette.grey[300]}`,
  position: 'relative',
  backgroundColor: '#fdfbfb',
  borderRadius: '5px',
  marginBottom: '15px',
  boxShadow: `2px 2px 5px ${theme.palette.grey[100]}`,
}));

const StepIcon = styled('img')({
  position: 'absolute',
  right: '0',
  top: '50%',
  transform: 'translateY(-50%)',
});

const StepNumber = styled(Typography)(({ theme }) => ({
  width: '40px',
  fontSize: '24px',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const StepDetails = styled(Box)({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StepTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#444',
});

const StepInfo = styled(Typography)({
  fontSize: '14px',
  color: '#777',
  position: 'relative',
  display: 'inline-block',
  marginTop: '8px',
});

const InfoIcon = styled('span')(({ theme }) => ({
  marginLeft: '10px',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  fontSize: '16px',
}));

const InfoTooltip = styled(Box)({
  display: 'none',
  position: 'absolute',
  backgroundColor: '#333',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  top: '24px',
  left: '0',
  zIndex: '10',
  fontSize: '12px',
  maxWidth: '200px',
});

const StepInfoHover = styled(StepInfo)({
  '&:hover': {
    '& $infoTooltip': {
      display: 'block',
    },
  },
});

const EnrollButton = styled(Box)(({ theme }) => ({
  display: 'block',
  width: 'max-content',
  margin: '20px auto',
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  textAlign: 'center',
  cursor: 'pointer',
  transition: `background-color 0.3s ${theme.transitions.easing.easeInOut}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const EnrollCard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
        },
      }}
    >
      <PathwayContainer>
        <PathwayHeader>
          <PathwayTitle variant="h2">Java Luminary Pathway</PathwayTitle>
          <Status variant="button">Enrolled</Status>
        </PathwayHeader>

        <StepContainer>
          <StepNumber>1.</StepNumber>
          <StepDetails>
            <StepTitle variant="h4">Dive into Java Mastery</StepTitle>
            <StepInfoHover>
              Elite Java course from UpGrad
              <InfoIcon>i</InfoIcon>
              <InfoTooltip>
                Embark on an elite course from UpGrad, curated for tomorrow's
                Java leaders, unlocking a world of advanced techniques.
              </InfoTooltip>
            </StepInfoHover>
          </StepDetails>
          <StepIcon
            src="https://rslogs1.s3.ap-south-1.amazonaws.com/iconmonstr-education-1.svg"
            alt="Step Icon"
            width="40"
          />
        </StepContainer>

        {/* Add other step containers here */}
        {/* ... */}

        <EnrollButton>Enroll Now</EnrollButton>
      </PathwayContainer>
    </Box>
  );
};

export default EnrollCard;
