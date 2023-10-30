import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import ViewJd from '@/pageComponents/JobDescription/ViewJd';

import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const ViewJD = () => {
  const router = useRouter();
  return (
    <ClientLayout>
      <MainCard
        title={
          <TitleBackButton
            title={'View Job Opening'}
            onClick={() => router.back()}
          />
        }
      >
        <Container maxWidth="xl">
          <ViewJd role="Client" />
        </Container>
      </MainCard>
    </ClientLayout>
  );
};

export default ViewJD;
