import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  color: '#1D1D1D',
  fontWeight: '700',
  textAlign: 'center',
  lineHeight: '41.8px',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

export default PageTitle;
