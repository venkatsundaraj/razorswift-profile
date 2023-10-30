import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import JdStepper from '@/pageComponents/Admin/Clients/JDStepper';
import { useRouter } from 'next/router';

const AddClients = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <MainCard
        title={
          <TitleBackButton title={'Add Client'} onClick={() => router.back()} />
        }
      >
        <JdStepper />
      </MainCard>
    </AdminLayout>
  );
};

export default AddClients;
