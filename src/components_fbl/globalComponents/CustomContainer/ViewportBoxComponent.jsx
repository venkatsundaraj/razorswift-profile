import styled from '@emotion/styled';
import { Box } from '@mui/material';

const ViewPortBox = styled(Box)(({ theme }) => ({
  minHeight: { xs: '100vh', lg: '80vh' },
  width: '100vw',
  padding: theme.spacing(4, 0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflowX: 'hidden',
  backgroundColor: theme.palette.primaryPalette.white,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

function ViewportBoxComponent({ children, ...props }) {
  return (
    <ViewPortBox component="section" {...props}>
      {children}
    </ViewPortBox>
  );
}

export default ViewportBoxComponent;
