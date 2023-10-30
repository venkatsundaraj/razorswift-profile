import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const SectionHeader = styled(Typography)(
  ({ theme, weight, padding = '0px 0px 20px 0px' }) => ({
    color: '#1D1D1D',
    fontWeight: weight || '600',
    fontSize: '16px',
    lineHeight: '17.2px',
    textAlign: 'inherit',
    padding: padding,
    [theme.breakpoints.down('sm')]: {
      fontWeight: weight || '700',
      fontSize: '14px',
      lineHeight: '17.2px',
    },
  })
);

export default SectionHeader;
