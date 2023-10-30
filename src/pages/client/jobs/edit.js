import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import JdStepper from '@/pageComponents/JobDescription/FormComponents/JdStepper';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { useRouter } from 'next/router';

const EditJD = () => {
  const router = useRouter();
  return (
    <ClientLayout>
      <MainCard
        title={
          <TitleBackButton title={'Edit Jobs'} onClick={() => router.back()} />
        }
      >
        <JdStepper type="edit" role="client" />
      </MainCard>
    </ClientLayout>
  );
};

export default withAuth(EditJD, 'client');
