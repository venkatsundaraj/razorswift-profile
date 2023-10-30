import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import Pathway_Attribute_List from '@/pageComponents/Admin/Pathway_Masters/Pathway_Attribute/Pathway_Attribute_List';

const PATHWAY_ATTRIBUTE = () => {
  return (
    <AdminLayout>
      <Pathway_Attribute_List />
    </AdminLayout>
  );
};

export default PATHWAY_ATTRIBUTE;
