// import Navbar from '@/navigationComponents/Navbar';
// import ViewPublic from '@/pageComponents/Profile/ViewPublic';
import { SlugProvider } from '@/reUsableComponents/DataContext/SlugContext';
import * as swagger_api from '@/src/swagger_api/';
import { CandidateProfileApi } from '@/swagger_api/*';
import { encryptData } from '@/utils/encryption';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/navigationComponents/Navbar'), {
  ssr: false,
});
const ViewPublic = dynamic(
  () => import('@/pageComponents/Profile/ViewPublic'),
  {
    ssr: false,
  }
);

const Slug = ({ data }) => {
  return (
    <SlugProvider>
      <Navbar />
      <ViewPublic slug={data} />
    </SlugProvider>
  );
};

export default Slug;

export async function getServerSideProps({ params }) {
  const defaultClient = swagger_api.ApiClient.instance;
  var XRSKeyAuth = defaultClient.authentications['X-RS-Key'];
  XRSKeyAuth.apiKey = encryptData();
  var XRSKeyBearer = defaultClient.authentications['Bearer'];
  XRSKeyBearer.apiKey =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI3IiwibmJmIjoxNjkyODgyNzU3LCJleHAiOjE2OTI5MjU5NTUsImlhdCI6MTY5Mjg4Mjc1N30.m_sHzQiVNI7eZV36n70vrHABG7wNDyuqVj9J7JVyXQY';
  try {
    const candidateProfileApi = new CandidateProfileApi();
    const response =
      await candidateProfileApi.apiCandidateProfileGetBySlugSlugGet(
        params.slug
      );

    if (response.body.message === 'Record Fetched Successfully.') {
      return {
        props: {
          data: response?.body?.result,
        },
      };
    } else if (response.body.message === 'No Record Found.') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
