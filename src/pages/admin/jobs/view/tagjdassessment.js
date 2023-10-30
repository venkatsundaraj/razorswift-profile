import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import TagJdAssessmentComponent from '@/pageComponents/JobDescription/ReuseablePageComponents/TagJdAssessmentComponent';

const TagJdAssessment = () => {
  return (
    <AdminLayout>
      <TagJdAssessmentComponent role="Admin" />
    </AdminLayout>
  );
};

export default TagJdAssessment;
