import { alpha, styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const ToggleButton = ({
  children,
  backgroundColor,
  onPress,
  height,
  width,
  maxWidth,
  border,
  props,
}) => {
  const Button = styled(MuiButton)(({ theme }) => ({
    height: height || 'inherit',
    width: width || 'inherit',
    maxWidth: maxWidth || 'inherit',
    '&:hover': {
      backgroundColor: backgroundColor,
      boxShadow: `7px 9px 1px 2px ${alpha(backgroundColor, 0.1)}`,
      color: '#fff',
    },
    backgroundColor: backgroundColor,
    color: theme.palette.primary.main,
    borderRadius: '6px !important',
    mx: 2,
    border: `2px solid ${theme.palette.primary.main} !important`,
    background: '#fff',
    boxShadow: `7px 10px 1px 2px ${alpha(theme.palette.primary.main, 0.2)}`,

    borderRadius: '6px !important',
    mx: 2,
    border: `2px solid ${border ? border : '#DDDDDD'} !important`,
    fontWeight: '700',
  }));

  return (
    <Button
      onClick={onPress}
      variant="contained"
      disableRipple={false}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ToggleButton;
