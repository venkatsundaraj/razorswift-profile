import NavBar from '@/pageComponents/Admin/Dashboard/NavBar';
import { Container, useTheme } from '@mui/material';
const DashboardLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: { xs: 2 },
        paddingTop: { xs: 0, sm: 2 },
      }}
    >
      <NavBar />
      {children}
    </Container>
  );
};

export default DashboardLayout;
