import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import JdStepper from '@/pageComponents/JobDescription/FormComponents/JdStepper';
import withAuth from '@/src/AuthWrapper/AuthWrapper';

import { useRouter } from 'next/router';

const AddJD = () => {
  const router = useRouter();
  return (
    <ClientLayout>
      <MainCard
        title={
          <TitleBackButton title={'Add Jobs'} onClick={() => router.back()} />
        }
      >
        <JdStepper role="Client" />
      </MainCard>
    </ClientLayout>
  );
};

export default withAuth(AddJD, 'client');
