// import Navbar from '@/navigationComponents/Navbar';
// import ViewPublic from '@/pageComponents/Profile/ViewPublic';
import useSummary from '@/customHooks/CutsomApiHooks/useSummary';
import { SlugProvider } from '@/reUsableComponents/DataContext/SlugContext';
import LogoLoader from '@/reUsableComponents/LogoLoader';
import * as swagger_api from '@/src/swagger_api/';
import { CandidateProfileApi } from '@/swagger_api/*';
import { callApi } from '@/utils/apirequest';
import { encryptData } from '@/utils/encryption';
import { modeType, roleOfViewer, typeOfViewer } from '@/utils/enum';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const Navbar = dynamic(() => import('@/navigationComponents/Navbar'), {
  ssr: false,
});
const ViewPublic = dynamic(
  () => import('@/pageComponents/Profile/ViewPublic'),
  {
    loading: () => <LogoLoader />,
    ssr: false,
  }
);

const Slug = ({ data, tags }) => {
  const routers = useRouter();
  const summaryProps = useMemo(
    () => ({
      type: typeOfViewer['aspirant'],
      role: roleOfViewer['candidate'],
      mode: modeType['view'],
      slug: routers.query.slug,
    }),
    [routers]
  );
  const summary = useSummary(summaryProps);

  const [tagSlug, setTagSlug] = useState(tags?.body?.tags || []);
  const result = {
    title: '',
    meta: [],
  };
  for (let i = 0; i < tagSlug.length; i++) {
    if (/<title>(.*?)<\/title>/i.test(tagSlug[i])) {
      result.title = tagSlug[i].match(/<title>(.*?)<\/title>/i)[1];
    } else if (/^<meta.*?>$/.test(tagSlug[i])) {
      const tagAttributes = tagSlug[i].match(/<meta\s+(.*?)>/i)[1];
      const attributesArray = tagAttributes.match(
        /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g
      );
      const metaObject = {};
      for (let j = 0; j < attributesArray.length; j++) {
        const attribute = attributesArray[j].split('=');
        metaObject[attribute[0]] = attribute[1].replace(/['"]/g, '');
      }
      result.meta.push(metaObject);
    }
  }

  console.log(result);
  return (
    <>
      <Head>
        <title>{result.title}</title>
        {result.meta.map((metaObject, index) => (
          <meta key={index} {...metaObject} />
        ))}
      </Head>
      <SlugProvider>
        <Navbar />
        <ViewPublic slug={data} />
      </SlugProvider>
    </>
  );
};

export default Slug;

export async function getServerSideProps({ params }) {
  const data = { type: 'c', data: { slug: params.slug } };
  const defaultClient = swagger_api.ApiClient.instance;
  var XRSKeyAuth = defaultClient.authentications['X-RS-Key'];
  XRSKeyAuth.apiKey = encryptData();
  var XRSKeyBearer = defaultClient.authentications['Bearer'];
  XRSKeyBearer.apiKey =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI3IiwibmJmIjoxNjkyODgyNzU3LCJleHAiOjE2OTI5MjU5NTUsImlhdCI6MTY5Mjg4Mjc1N30.m_sHzQiVNI7eZV36n70vrHABG7wNDyuqVj9J7JVyXQY';

  try {
    const [headResponse, profileResponse] = await Promise.allSettled([
      callApi('HeadSSR', data),
      new CandidateProfileApi().apiCandidateProfileGetBySlugSlugGet(
        params.slug
      ),
    ]);

    const headData =
      headResponse.status === 'fulfilled' ? headResponse.value.data : null;
    const profileData =
      profileResponse.status === 'fulfilled' &&
      profileResponse.value.body.message === 'Record Fetched Successfully.'
        ? profileResponse.value.body.result
        : null;

    // Handle cases where any of the API calls fail or return unexpected data

    if (headData && profileData) {
      // Process the data and return it as props
      return {
        props: {
          data: profileData,
          tags: headData,
        },
      };
    } else {
      // Handle cases where data is missing or API calls failed
      // Redirect to an error page or show appropriate error message
      const errorMessage =
        profileResponse.status === 'rejected'
          ? `Profile API error: ${profileResponse.reason}`
          : 'No Record Found.';

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
        notFound: errorMessage === 'No Record Found.',
        // Pass the error message to the page component to display it
        props: {
          error: errorMessage,
        },
      };
    }
  } catch (error) {
    console.log(error);
    // Handle any other errors that may occur during API calls
    // Redirect to an error page or show appropriate error message
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        error: error.message,
      },
    };
  }
}
