import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import TagJdAssessmentComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/TagJdAssessmentComponent';
import withAuth from '@/src/AuthWrapper/AuthWrapper';

const TagJdAssessment = () => {
  return (
    <ClientLayout>
      <TagJdAssessmentComponent role="Client" />
    </ClientLayout>
  );
};

export default withAuth(TagJdAssessment, 'client');
