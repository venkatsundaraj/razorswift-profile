import AuthLayout from '@/layouts/AuthLayout';
import AuthNavbar from '@/navigationComponents/AuthNavBar';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const OtpForm = dynamic(() => import('@/pageComponents/Otp/OtpForm'), {
  ssr: false,
});

const Otp = () => {
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
      <AuthLayout
        leftComponent={<OtpForm />}
        headerText={'Sign up to upgrade your professional life '}
      />
    </Container>
  );
};
export default Otp;

// export default withAuth(Otp, 'user');
