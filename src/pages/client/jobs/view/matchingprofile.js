import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import MatchingProfileComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/MatchingProfileComponent';
import withAuth from '@/src/AuthWrapper/AuthWrapper';

const MatchingProfile = () => {
  return (
    <ClientLayout>
      <MatchingProfileComponent role="Client" />
    </ClientLayout>
  );
};

export default withAuth(MatchingProfile, 'client');
