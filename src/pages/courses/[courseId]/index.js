import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import CourseRegistrationForm from '@/src/components_fbl/pageBasedComponents/courses/CourseRegistrationForm';
import {
  geneateUrls,
  getCourseList,
  getSelectedCourse,
} from '@/utils/getCourseList';
import Head from 'next/head';
import { useContext, useState } from 'react';

function EnrollForm({ data }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [course, setCourse] = useState(data);

  return (
    <Layout>
      <Head>
        <title>{course.name}</title>
        <meta name="description" content={course.description} />
      </Head>
      <ToastProvider>
        <CourseRegistrationForm data={course} />
      </ToastProvider>
    </Layout>
  );
}

export default EnrollForm;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const courseId = params.courseId;

//   const filteredCourse = await getSelectedCourse(courseId);

//   return {
//     props: {
//       data: filteredCourse,
//     },
//   };
// }

export async function getStaticProps(context) {
  const { params } = context;

  const courseId = params.courseId;

  const filteredCourse = await getSelectedCourse(courseId);

  return {
    props: {
      data: filteredCourse,
    },
  };
}

export async function getStaticPaths() {
  const lists = await getCourseList();

  if (!lists.courses.length) return;
  const ids = lists.courses.map(item => geneateUrls(item.name));

  const paths = ids.map(id => ({ params: { courseId: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}
