import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Typography } from '@mui/material';

export async function getServerSideProps(context) {
  const { res } = context;

  // Redirect to /new-page
  res.writeHead(302, { Location: '/client/dashboard' });
  res.end();

  // Return an empty object to stop Next.js from rendering anything
  return { props: {} };
}

function Client() {
  // This code will not run since the user will be immediately redirected
  return (
    <ClientLayout>
      <Typography paragraph>Client</Typography>
      <Typography paragraph>Dashboard</Typography>
    </ClientLayout>
  );
}

export default withAuth(Client, 'client');
