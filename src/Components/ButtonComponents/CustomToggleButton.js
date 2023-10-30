// import ToggleButton from '@mui/material/ToggleButton'
import { alpha, styled, useTheme } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';

const CustomToggleButton = ({ key, value, values, children }) => {
  const theme = useTheme();

  const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    // margin: 5,

    '&.MuiToggleButton-root , &.MuiToggleButton-root:hover': {
      color: '#000000',
      borderColor: '#DDDDDD',
      border: '3px solid #DDDDDD',
      borderRadius: 9,
      borderRight: '3px solid #DDDDDD',
      borderLeftRadius: 9,
      borderLeft: '3px solid #DDDDDD',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      border: '3px solid red',

      borderRadius: 9,
    },
  }));

  return (
    <ToggleButton
      sx={{
        '&.MuiToggleButtonGroup-grouped': {
          borderRadius: '4px !important',
          mx: 2,
          border: '3px solid #DDDDDD !important',
          // border: '1px solid red !important',
        },
        '&.Mui-selected, &.Mui-selected:hover': {
          color: theme.palette.primary.main,

          borderRadius: '4px !important',
          mx: 2,
          border: `1px solid ${theme.palette.primary.main} !important`,
          boxShadow: `7px 10px 1px 2px ${alpha(
            theme.palette.primary.main,
            0.2
          )}`,
        },
      }}
      key={values.id}
      value={values.value}
    >
      {children}
    </ToggleButton>
  );
};

export default CustomToggleButton;
