import CustomSection from '@/src/components_fbl/globalComponents/CustomContainer/CustomSection';
import PrimaryHeading from '@/src/components_fbl/headingComponents/PrimaryHeading';
function index({ blogId }) {
  return (
    <CustomSection
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PrimaryHeading>{blogId}</PrimaryHeading>
    </CustomSection>
  );
}
export default index;
export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params);
  return {
    props: {
      blogId: params.id,
    },
  };
}
