import AuthLayout from '@/layouts/Client/AuthLayout';
import AuthNavbar from '@/navigationComponents/AuthNavBar';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';
const LoginForm = dynamic(
  () => import('@/pageComponents/Client/Login/LoginForm'),
  {
    ssr: false,
  }
);

const Login = () => {
  //   const { isLoading } = useNotAuth();

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <Container maxWidth="xl" disableGutters>
      <AuthNavbar />
      <AuthLayout leftComponent={<LoginForm />} />
    </Container>
  );
};
export default withAuth(Login, 'client');
