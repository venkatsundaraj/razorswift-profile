import GetStartedSection from '@/components_fbl/pageBasedComponents/Aspirants/GetStartedSection';
import HeroSection from '@/components_fbl/pageBasedComponents/Aspirants/HeroSection';
import BusinessDropDownBody from '@/components_fbl/pageBasedComponents/Business/BusinessDropDownBody';
import StickyContainerSection from '@/components_fbl/pageBasedComponents/Business/StickyContainerSection';
import WhyRazorswiftSection from '@/components_fbl/pageBasedComponents/Business/WhyRazorswiftSection';
import {
  TickerBoxData,
  businessDropDownBodyData,
  heroSectionData,
  readyToStartData,
} from '@/constants/Business/businessPageData';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import { Box } from '@mui/material';
import Head from 'next/head';

export const metadata = {
  title: 'Business | Razorswift',
};

function Business() {
  return (
    <Layout>
      <Head>
        <title>Business | Razorswift</title>
        <meta
          name="description"
          content="A dynamic ecosystem where talent and opportunities converge"
        />
      </Head>
      <Box component="main">
        <HeroSection
          TickerBoxData={TickerBoxData}
          heroSectionData={heroSectionData}
        />
        <BusinessDropDownBody dropDownBodyData={businessDropDownBodyData} />
        <StickyContainerSection />
        <WhyRazorswiftSection />
        <GetStartedSection readyToStartData={readyToStartData} />
      </Box>
    </Layout>
  );
}

export default Business;
