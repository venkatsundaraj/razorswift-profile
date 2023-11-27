'use client';

import CustomSection from '@/src/components_fbl/globalComponents/CustomContainer/CustomSection';
import PrimaryHeading from '@/src/components_fbl/headingComponents/PrimaryHeading';
const data = [
  { id: 'aspirants', title: 'Aspirants Page' },
  { id: 'business', title: 'Business Page' },
  { id: 'partners', title: 'Partners Page' },
];
function index({ id }) {
  const filteredData = data.find(item => item.id === id);
  return (
    <CustomSection
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {filteredData ? (
        <PrimaryHeading>{filteredData.title}</PrimaryHeading>
      ) : null}
    </CustomSection>
  );
}
export default index;
export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params.slug);
  return {
    props: {
      id: params.slug,
    },
  };
}
