import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import InterviewRoundsComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/InterviewRoundsComponent';

const InterviewRounds = () => {
  return (
    <AdminLayout>
      <InterviewRoundsComponent role="Admin" />
    </AdminLayout>
  );
};

export default InterviewRounds;
