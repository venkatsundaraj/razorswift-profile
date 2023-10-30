import AuthLayout from '@/layouts/Client/AuthLayout';
import AuthNavbar from '@/navigationComponents/AuthNavBar';
import ResetPasswordForm from '@/pageComponents/Client/Login/ResetPasswordForm';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Container } from '@mui/material';

const ResetPassword = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <AuthNavbar />
      <AuthLayout leftComponent={<ResetPasswordForm />} />
    </Container>
  );
};

export default withAuth(ResetPassword, 'client');
