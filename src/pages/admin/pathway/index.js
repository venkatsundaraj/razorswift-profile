import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import PathwayForm from '@/pageComponents/Admin/Pathway/FormSection/PathwayForm';
// import NormalForm from '@/pageComponents/Admin/Pathway/FormSection/NormalForm';

const PathWay = () => {
  return (
    <AdminLayout>
      {/* <NormalForm /> */}
      <PathwayForm />
    </AdminLayout>
  );
};

export default PathWay;
