import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Typography } from '@mui/material';

export async function getServerSideProps(context) {
  const { res } = context;

  // Redirect to /new-page
  res.writeHead(302, { Location: '/admin/assessment/assessmentlist/' });
  res.end();

  // Return an empty object to stop Next.js from rendering anything
  return { props: {} };
}

function Admin() {
  // This code will not run since the user will be immediately redirected
  return (
    <ClientLayout>
      <Typography paragraph>Admin</Typography>
      <Typography paragraph>dashboard</Typography>
    </ClientLayout>
  );
}

export default withAuth(Admin, 'client');
