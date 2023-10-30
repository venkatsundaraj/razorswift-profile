import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const TestimonialText = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '44px',
  textAlign: 'inherit',
  //   padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: '500',
  },
}));

export default TestimonialText;
