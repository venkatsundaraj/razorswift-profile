import Navbar from '@/navigationComponents/Navbar';

import dynamic from 'next/dynamic';
import Head from 'next/head';

const Hero = dynamic(() => import('@/pageComponents/Contact/Hero'), {
  loading: () => 'Loading...',
});

const FormSection = dynamic(
  () => import('@/pageComponents/Contact/FormSection'),
  {
    loading: () => 'Loading...',
  }
);
const BookDemo = dynamic(() => import('@/reUsableComponents/BookDemo'), {
  loading: () => 'Loading...',
});

const Footer = dynamic(() => import('@/reUsableComponents/Footer'), {
  loading: () => 'Loading...',
});

const Contact = () => {
  return (
    <>
      <Head>
        <title>RazorSwift</title>
        <meta name="description" content="RazorSwift  by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <FormSection />

      {/* <BookDemo /> */}
      <Footer />
    </>
  );
};

export default Contact;
