import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import JDStepper from '@/pageComponents/Admin/Clients/JDStepper';
import { useRouter } from 'next/router';

const EditClients = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <MainCard
        title={
          <TitleBackButton
            title={'Edit Client'}
            onClick={() => router.back()}
          />
        }
      >
        <JDStepper type="edit" />
      </MainCard>
    </AdminLayout>
  );
};

export default EditClients;
