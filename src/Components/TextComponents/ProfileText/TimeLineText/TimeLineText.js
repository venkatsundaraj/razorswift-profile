import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const TimeLineText = styled(Typography)(({ theme, weight }) => ({
  color: '#1D1D1D',
  fontWeight: weight || '600',
  fontSize: '14px',
  lineHeight: '17.2px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '600',
    fontSize: '11.2px',
    lineHeight: '13.76px',
  },
}));

export default TimeLineText;
