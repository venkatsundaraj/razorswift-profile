import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export const textLabel = {
  color: 'rgba(106, 106, 106, 1)',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '15.6px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '11px',
    lineHeight: '13.2px',
  },
};
export default textLabel;
