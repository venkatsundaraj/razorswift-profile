import GetStartedSection from '@/components_fbl/pageBasedComponents/Aspirants/GetStartedSection';
import HeroSection from '@/components_fbl/pageBasedComponents/Aspirants/HeroSection';
import BusinessDropDownBody from '@/components_fbl/pageBasedComponents/Business/BusinessDropDownBody';
import StickyContainerSection from '@/components_fbl/pageBasedComponents/Business/StickyContainerSection';
import WhyRazorswiftSection from '@/components_fbl/pageBasedComponents/Business/WhyRazorswiftSection';
import { TickerBoxData } from '@/constants/Aspirants/aspirantPageData';
import {
  businessDropDownBodyData,
  heroSectionData,
  readyToStartData,
} from '@/constants/Business/businessPageData';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Business | Razorswift',
};

function Business() {
  return (
    <Layout>
      <Box component="main">
        {/* <BannerSection
        TickerBoxData={TickerBoxData}
        heroSectionData={heroSectionData}
      /> */}
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
