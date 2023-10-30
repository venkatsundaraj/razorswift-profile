import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import AutoMatchingProfileComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/AutoMatchingProfileComponent';
import withAuth from '@/src/AuthWrapper/AuthWrapper';

const AutoMatchingProfile = () => {
  return (
    <ClientLayout>
      <AutoMatchingProfileComponent role="client" />
    </ClientLayout>
  );
};

export default withAuth(AutoMatchingProfile, 'client');
