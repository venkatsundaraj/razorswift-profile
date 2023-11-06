import styled from '@emotion/styled';
import { Button } from '@mui/material';

const FillButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  textTransform: 'inherit',
  textDecoration: 'none',
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '20px',
  },
}));

function SubmitButton({ children, ...props }) {
  return <FillButton {...props}>{children}</FillButton>;
}

export default SubmitButton;
