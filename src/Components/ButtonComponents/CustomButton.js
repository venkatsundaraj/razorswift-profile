import { Button, styled } from '@mui/material';

const CustomButton = ({
  backgroundColor,
  color,
  buttonText,
  heroBtn,
  guideBtn,
  getStartedBtn,
  icon,
  width,
  height,
  onClick,
}) => {
  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: '700',
    fontSize: '1.125rem',
    cursor: 'pointer',
    // padding: '0.5rem 1.25rem',
    borderRadius: '7px',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${color} `,
    width: '100px',
    height: '48px',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      border: `2px solid ${backgroundColor} `,
    },
    [theme.breakpoints.down('md')]: {
      margin: (heroBtn || getStartedBtn) && theme.spacing(0, 'auto', 3, 'auto'),
      // width: (heroBtn || getStartedBtn) && '90%',
      width: width || '70px',
      height: height || '34px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: guideBtn && theme.spacing(3),
      width: guideBtn && '90%',
    },
  }));

  return (
    <CustomButton onClick={onClick}>
      {icon ? icon : null}
      {buttonText}
    </CustomButton>
  );
};

export default CustomButton;
