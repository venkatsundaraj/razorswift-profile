import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import Pathway_Type_List from '@/pageComponents/Admin/Pathway_Masters/Pathway_Type/Pathway_Type_List';

const PATHWAY_TYPE = () => {
  return (
    <AdminLayout>
      <Pathway_Type_List />
    </AdminLayout>
  );
};

export default PATHWAY_TYPE;
