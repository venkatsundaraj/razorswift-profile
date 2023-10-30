import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const HeroHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '38px',
  fontWeight: '700',
  lineHeight: '55px',
  textAlign: 'inherit',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
    lineHeight: '40px',
  },
}));

export default HeroHeader;
