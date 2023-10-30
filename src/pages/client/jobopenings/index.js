import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Typography } from '@mui/material';

const JobOpenings = () => {
  return (
    <ClientLayout>
      <Typography paragraph>Jobs</Typography>
    </ClientLayout>
  );
};

export default withAuth(JobOpenings, 'client');
