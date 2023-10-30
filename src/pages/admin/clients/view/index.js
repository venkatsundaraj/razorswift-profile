import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import ViewClients from '@/pageComponents/Admin/Clients/ViewClients';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const ViewJD = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <MainCard
        title={
          <TitleBackButton
            title={'View Client'}
            onClick={() => router.back()}
          />
        }
      >
        <Container maxWidth="xl">
          <ViewClients />
        </Container>
      </MainCard>
    </AdminLayout>
  );
};

export default ViewJD;
