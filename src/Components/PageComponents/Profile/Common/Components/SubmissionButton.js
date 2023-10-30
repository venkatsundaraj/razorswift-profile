import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import { styled, Typography } from '@mui/material';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const SubmissionButton = ({ children, onClick }) => {
  return (
    <ShadowButtonSubmit
      height="40px"
      width="100%"
      minwidth="200px"
      maxwidth="200px"
      backgroundcolor="#A62973"
      onClick={onClick}
    >
      <ButtonText color="#fff">{children}</ButtonText>
    </ShadowButtonSubmit>
  );
};

export default SubmissionButton;
