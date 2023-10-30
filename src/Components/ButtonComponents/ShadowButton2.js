import { alpha, styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const ShadowButton2 = ({ children, backgroundColor, height }) => {
  const Button = styled(MuiButton)(({ theme }) => ({
    minHeight: '66px',
    width: '207px',
    boxShadow: `7px 10px 1px 2px ${alpha(backgroundColor, 0.1)}`,
    [theme.breakpoints.down('sm')]: {
      height: '50px',
      width: '162px',
    },
  }));

  return (
    <Button
      variant="contained"
      disableRipple={false}
      sx={{
        '&:hover': {
          backgroundColor: backgroundColor,
          boxShadow: `7px 10px 1px 2px ${alpha(backgroundColor, 0.2)}`,
        },
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </Button>
  );
};

export default ShadowButton2;
