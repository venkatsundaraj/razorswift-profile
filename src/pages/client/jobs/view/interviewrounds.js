import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import InterviewRoundsComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/InterviewRoundsComponent';
import withAuth from '@/src/AuthWrapper/AuthWrapper';

const InterviewRounds = () => {
  return (
    <ClientLayout>
      <InterviewRoundsComponent role="client" />
    </ClientLayout>
  );
};

export default withAuth(InterviewRounds, 'client');
