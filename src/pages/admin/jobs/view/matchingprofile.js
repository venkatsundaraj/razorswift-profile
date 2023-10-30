import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import MatchingProfileComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/MatchingProfileComponent';

const MatchingProfile = () => {
  return (
    <AdminLayout>
      <MatchingProfileComponent role="Admin" />
    </AdminLayout>
  );
};

export default MatchingProfile;
