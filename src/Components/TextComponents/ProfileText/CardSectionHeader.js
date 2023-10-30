import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const CardSectionHeader = styled(Typography)(
  ({ theme, padding = '0px 0px 20px 0px' }) => ({
    color: '#1D1D1D',
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '15.4px',
    textAlign: 'inherit',
    padding: padding,
    [theme.breakpoints.down('sm')]: {
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '12.23px',
    },
  })
);

export default CardSectionHeader;
