import AuthLayout from '@/layouts/AuthLayout';
import AuthNavbar from '@/navigationComponents/AuthNavBar';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
// import SignUpForm from '@/pageComponents/SignUp/SignUpForm';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const SignUpForm = dynamic(() => import('@/pageComponents/SignUp/SignUpForm'), {
  ssr: false,
});

const SignUp = () => {
  const router = useRouter();

  const ButtonFunctions = () => {
    router.push('/login');
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <AuthNavbar
        text="Already have an account?"
        linkText="Login"
        workingFunctions={ButtonFunctions}
      />
      <AuthLayout
        leftComponent={<SignUpForm />}
        headerText={'Sign up to upgrade your professional life '}
      />
    </Container>
  );
};

export default withAuth(SignUp, 'user');
