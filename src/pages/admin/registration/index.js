import ClientContactForm from '@/pageComponents/Admin/Registration/ClientContactForm';
import RegistrationForm from '@/pageComponents/Admin/Registration/RegistrationForm';
import { Container, Stack } from '@mui/material';
const Registration = () => {
  return (
    <Container>
      <Stack spacing={4}>
        <RegistrationForm />
        <ClientContactForm />
      </Stack>
    </Container>
  );
};
export default Registration;
