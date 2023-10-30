import { Container, useTheme } from '@mui/material';

const AuthFormLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        height: 1,
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: { xs: 0, sm: 0, md: 0 },
        padding: { xs: 4 },
        paddingTop: { xs: 0, sm: 4 },
      }}
    >
      {children}
    </Container>
  );
};

export default AuthFormLayout;
