import { alpha, styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const ShadowButton = ({
  children,
  backgroundColor,
  height,
  width,
  maxWidth,
  minWidth,
  onClick,
  styleProps,
  ...props
}) => {
  const Button = styled(MuiButton)(({ theme }) => ({
    height: height || '66px',
    width: width || '207px',
    maxWidth: maxWidth || 'initial',
    boxShadow: `7px 10px 1px 2px ${alpha(backgroundColor, 0.1)}`,
    [theme.breakpoints.down('sm')]: {
      height: height || '50px',
      width: width || '163px',
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
        ...styleProps,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ShadowButton;
