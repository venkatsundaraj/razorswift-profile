import { alpha, styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const PlainButton = ({ children, backgroundColor, onPress }) => {
  const Button = styled(MuiButton)(({ theme }) => ({
    height: '66px',
    width: '207px',

    boxShadow: `7px 10px 1px 2px ${alpha(backgroundColor, 0.2)}`,
    [theme.breakpoints.down('sm')]: {
      height: '50px',
      width: '162px',
    },
  }));

  return (
    <Button
      onClick={onPress}
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

export default PlainButton;
