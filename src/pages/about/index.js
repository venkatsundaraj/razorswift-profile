import Navbar from '@/navigationComponents/Navbar';

import dynamic from 'next/dynamic';
import Head from 'next/head';

const Hero = dynamic(() => import('@/pageComponents/About/Hero'), {
  loading: () => 'Loading...',
});

const OurValue = dynamic(() => import('@/pageComponents/About/OurValue'), {
  loading: () => 'Loading...',
});
const Companies = dynamic(() => import('@/pageComponents/About/Companies'), {
  loading: () => 'Loading...',
});
const BookDemo = dynamic(() => import('@/reUsableComponents/BookDemo'), {
  loading: () => 'Loading...',
});

const Footer = dynamic(() => import('@/reUsableComponents/Footer'), {
  loading: () => 'Loading...',
});

const About = () => {
  return (
    <>
      <Head>
        <title>RazorSwift</title>
        <meta name="description" content="RazorSwift  by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <OurValue />
      {/* <Companies /> */}

      <BookDemo />
      <Footer />
    </>
  );
};

export default About;
