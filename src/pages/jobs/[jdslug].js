import useSummary from '@/customHooks/CutsomApiHooks/useSummary';
import AuthNavbar from '@/navigationComponents/AuthNavBar';
import { JDSlugProvider } from '@/reUsableComponents/DataContext/JdSlugContext';
import LogoLoader from '@/reUsableComponents/LogoLoader';
import * as swagger_api from '@/src/swagger_api/';
import { JobDescriptionApi } from '@/swagger_api/*';
import { encryptData } from '@/utils/encryption';
import { typeOfViewer } from '@/utils/enum';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

// import Navbar from '@/navigationComponents/Navbar';
// import ViewPublic from '@/pageComponents/Profile/ViewPublic';
const Navbar = dynamic(() => import('@/navigationComponents/Navbar'), {
  ssr: false,
});
const ViewJd = dynamic(() => import('@/pageComponents/JD/ViewJd'), {
  loading: () => <LogoLoader />,
  ssr: false,
});

const JDSlug = ({ data, tags }) => {
  const routers = useRouter();
  const summaryProps = useMemo(
    () => ({
      slug: routers.query.jdslug,
      type: typeOfViewer['jobs'],
    }),
    [routers.query.jdslug]
  );
  const summary = useSummary(summaryProps);

  return (
    <>
      <JDSlugProvider>
        <AuthNavbar />
        <ViewJd jdslug={data} />
      </JDSlugProvider>
    </>
  );
};

export default JDSlug;

export async function getServerSideProps({ params }) {
  const { jdslug } = params;
  console.log(params);

  const defaultClient = swagger_api.ApiClient.instance;
  var XRSKeyAuth = defaultClient.authentications['X-RS-Key'];
  XRSKeyAuth.apiKey = encryptData();
  var XRSKeyBearer = defaultClient.authentications['Bearer'];
  XRSKeyBearer.apiKey =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI3IiwibmJmIjoxNjkyODgyNzU3LCJleHAiOjE2OTI5MjU5NTUsImlhdCI6MTY5Mjg4Mjc1N30.m_sHzQiVNI7eZV36n70vrHABG7wNDyuqVj9J7JVyXQY';
  try {
    const jobDescriptionApi = new JobDescriptionApi();
    const opts = {
      // slug : decodeURIComponent(slug)
      slug: jdslug,
      //slug:params.slug
    };
    const response = await jobDescriptionApi.apiJobDescriptionGetJdBySlugPost(
      opts
    );

    if (response.body.result) {
      // console.log('response', response);
      return {
        props: {
          data: response.body.result,
        },
      };
    } else {
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
