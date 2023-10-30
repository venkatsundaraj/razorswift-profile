import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const Description = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '19px',
  },
}));

export default Description;
