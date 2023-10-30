import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import ViewJd from '@/pageComponents/JobDescription/ViewJd';

import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const ViewJD = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <MainCard
        title={
          <TitleBackButton
            title={'View Job Opening'}
            onClick={() => router.back()}
          />
        }
      >
        <Container maxWidth="xl">
          <ViewJd role="Admin" />
        </Container>
      </MainCard>
    </AdminLayout>
  );
};

export default ViewJD;
