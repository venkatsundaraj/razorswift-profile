import TitleBackButton from '@/buttonComponents/TitleBackButton';
import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import JdStepper from '@/pageComponents/JobDescription/FormComponents/JdStepper';
import { useRouter } from 'next/router';

const EditJD = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <MainCard
        title={
          <TitleBackButton title={'Edit Jobs'} onClick={() => router.back()} />
        }
      >
        <JdStepper type="edit" role="Admin" />
      </MainCard>
    </AdminLayout>
  );
};

export default EditJD;
