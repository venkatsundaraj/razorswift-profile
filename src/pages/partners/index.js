import GetStartedSection from '@/components_fbl/pageBasedComponents/Aspirants/GetStartedSection';
import HeroSection from '@/components_fbl/pageBasedComponents/Aspirants/HeroSection';
import BusinessDropDownBody from '@/components_fbl/pageBasedComponents/Business/BusinessDropDownBody';

import {
  heroSectionData,
  partnersDropDownBodyData,
  readyToStartData,
  TickerBoxData,
} from '@/constants/Partners/partnersPageData';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import DiscoverSection from '@/src/components_fbl/pageBasedComponents/Aspirants/DiscoverSection';
import { Box } from '@mui/material';
import Head from 'next/head';

export const metadata = {
  title: 'Partners | Razorswift',
};

function Partners() {
  return (
    <Layout>
      <Head>
        <title>Partners | Razorswift</title>
        <meta
          name="description"
          content="A dynamic ecosystem where talent and opportunities converge"
        />
      </Head>
      <Box component="main">
        {/* <BannerSection
        TickerBoxData={TickerBoxData}
        heroSectionData={heroSectionData}
      /> */}
        <HeroSection
          TickerBoxData={TickerBoxData}
          heroSectionData={heroSectionData}
        />
        <BusinessDropDownBody dropDownBodyData={partnersDropDownBodyData} />
        <DiscoverSection
          cta={'partners'}
          title={'Unlocking Opportunities with RazorSwift'}
        />
        <GetStartedSection readyToStartData={readyToStartData} />
      </Box>
    </Layout>
  );
}

export default Partners;
