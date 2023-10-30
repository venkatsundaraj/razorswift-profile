import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import JdStepper from '@/pageComponents/JobDescription/FormComponents/JdStepper';

import { useRouter } from 'next/router';

const AddJD = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <MainCard
        title={
          <TitleBackButton title={'Add Jobs'} onClick={() => router.back()} />
        }
      >
        <JdStepper role="Admin" />
      </MainCard>
    </AdminLayout>
  );
};

export default AddJD;
