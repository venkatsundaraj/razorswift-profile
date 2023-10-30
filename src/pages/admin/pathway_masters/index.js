import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import { Typography } from '@mui/material';

export async function getServerSideProps(context) {
  const { res } = context;

  // Redirect to /new-page
  res.writeHead(302, { Location: '/admin/pathway_masters/pathway_type' });
  res.end();

  // Return an empty object to stop Next.js from rendering anything
  return { props: {} };
}

function Admin() {
  // This code will not run since the user will be immediately redirected
  return (
    <AdminLayout>
      <Typography paragraph>Pathway Masters</Typography>
      <Typography paragraph>Dashboard</Typography>
    </AdminLayout>
  );
}

export default Admin;
