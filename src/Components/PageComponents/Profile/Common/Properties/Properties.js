import { Grid, styled, Typography } from '@mui/material';

export const otherProps = { size: 'small', required: true };

export const ButtonText = styled(Typography)(
  ({ theme, weight, size, sizesmall, color }) => ({
    textTransform: 'none',
    color: color || '#1D1D1D',
    fontSize: size || '16px',
    fontWeight: weight || '600',
    textAlign: 'center',
    lineHeight: '19.2px',
    [theme.breakpoints.down('md')]: {
      fontSize: sizesmall || '14px',
      lineHeight: '16.8px',
    },
  })
);

export const projectSkillValue = [
  { id: 1, skillName: 'javascript', value: 1 },
  { id: 2, skillName: 'react', value: 2 },
];

export const companyIds = [
  { id: 1, value: 1, name: 'Company 1' },
  { id: 2, value: 2, name: 'Company 2' },
];

export const GridComponent = ({ children }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2, md: 4 }}
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};

export const jobTitleIds = [
  { id: 1, value: 1, name: 'Title 1' },
  { id: 2, value: 2, name: 'Title 2' },
];
export const jobProfileTypes = [
  { id: 1, value: 1, name: 'FullTime' },
  { id: 2, value: 2, name: 'Gig' },
  { id: 3, value: 3, name: 'Internship' },
];
