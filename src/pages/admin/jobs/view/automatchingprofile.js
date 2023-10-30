import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import AutoMatchingProfileComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/AutoMatchingProfileComponent';

const AutoMatchingProfile = () => {
  return (
    <AdminLayout>
      <AutoMatchingProfileComponent role="Admin" />
    </AdminLayout>
  );
};

export default AutoMatchingProfile;
