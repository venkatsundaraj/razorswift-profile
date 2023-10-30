import { CircularProgress, Container } from '@mui/material';

const LogoLoader = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default LogoLoader;
