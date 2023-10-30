import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import { Stack, styled } from '@mui/material';
import Switch from '@mui/material/Switch';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(10px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const SwitchButton = ({ checked, workingFunctions, Left, Right }) => (
  <Stack direction="row" spacing={1} alignItems="end" justifyContent="flex-end">
    <SectionHeader sx={{ padding: 0 }}>{Left}</SectionHeader>
    <AntSwitch
      checked={checked}
      onChange={workingFunctions}
      inputProps={{ 'aria-label': 'ant design' }}
    />
    <SectionHeader sx={{ padding: 0 }}>{Right}</SectionHeader>
  </Stack>
);

export default SwitchButton;
