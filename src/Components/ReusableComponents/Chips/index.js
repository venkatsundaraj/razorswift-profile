// import { alpha, styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { styled } from '@mui/system';

export const StyledChip = styled(Chip)(
  ({ theme, backgroundColor, isSelected, border }) => ({
    display: 'flex',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center', // Align content to the right
    height: '100%',
    backgroundColor: isSelected ? theme.palette.primary.main : backgroundColor,
    color: isSelected ? '#fff' : theme.palette.primary.main,
    '&:hover': {
      backgroundColor: isSelected
        ? backgroundColor
        : theme.palette.primary.main,
      color: isSelected ? theme.palette.primary.main : '#fff',
    },
    mx: 2,
    maxWidth: 200,
    minWidth: 100,

    border: '2px solid #DDDDDD !important',
    fontWeight: '700',
  })
);
