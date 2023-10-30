import Typography from '@mui/material/Typography';

import { styled } from '@mui/material';

const SubTitle = styled(Typography)(
  ({ theme, color, fontWeight, padding }) => ({
    color: color || '#6A6A6A',
    fontSize: '20px',
    fontWeight: fontWeight || '500',
    lineHeight: '38px',
    textAlign: 'inherit',
    padding: padding || '0px 0px 20px 0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '26px',
      textAlign: 'center',
    },
  })
);

export default SubTitle;
