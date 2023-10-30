import AuthLayout from '@/layouts/AuthLayout';
import AuthNavbar from '@/navigationComponents/AuthNavBar';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
// import LoginForm from '@/pageComponents/Login/LoginForm';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const LoginForm = dynamic(() => import('@/pageComponents/Login/LoginForm'), {
  ssr: false,
});

const Login = () => {
  const router = useRouter();

  const ButtonFunctions = () => {
    router.push('/signup');
  };
  return (
    <Container maxWidth="xl" disableGutters>
      <AuthNavbar
        text="Don’t have an account yet?"
        linkText="Sign up"
        workingFunctions={ButtonFunctions}
      />
      <AuthLayout leftComponent={<LoginForm />} />
    </Container>
  );
};

export default withAuth(Login, 'user');
