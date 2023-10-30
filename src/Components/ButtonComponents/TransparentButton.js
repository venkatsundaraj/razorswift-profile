import { Button, styled } from '@mui/material';

const TransparentButton = ({
  backgroundColor,
  color,
  buttonText,
  heroBtn,
  guideBtn,
  getStartedBtn,
  height,
  width,
  icon,
  ...props
}) => {
  const TransparentButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    height: height || '66px',
    width: width || '207px',
    color: color,
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0.5rem 1.25rem',
    borderRadius: '7px',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: `2px solid ${color} `,
    '&:hover': {
      backgroundColor: 'transparent',
      color: color,
      //   border: `2px solid ${backgroundColor} `,
    },
    // [theme.breakpoints.down('md')]: {
    //   margin: (heroBtn || getStartedBtn) && theme.spacing(0, 'auto', 3, 'auto'),
    //   width: (heroBtn || getStartedBtn) && '80%',
    // },
    [theme.breakpoints.down('sm')]: {
      // marginTop: guideBtn && theme.spacing(3),
      // width: guideBtn && '90%',
      height: '50px',
      width: '162px',
    },
  }));

  return (
    <TransparentButton {...props}>
      {icon ? icon : null}
      {buttonText}
    </TransparentButton>
  );
};

export default TransparentButton;
