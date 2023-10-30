import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '47.8px',
  textAlign: 'inherit',
  //   padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '47.8px',
  },
}));

export default Title;
