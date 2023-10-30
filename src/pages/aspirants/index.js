import CareerSection from '@/components_fbl/pageBasedComponents/Aspirants/CareerSection';
import DropdownSection from '@/components_fbl/pageBasedComponents/Aspirants/DropdownSection';
import FastrackSection from '@/components_fbl/pageBasedComponents/Aspirants/FastrackSection';
import GetStartedSection from '@/components_fbl/pageBasedComponents/Aspirants/GetStartedSection';
import HeroSection from '@/components_fbl/pageBasedComponents/Aspirants/HeroSection';
import StaticScrollSection from '@/components_fbl/pageBasedComponents/Aspirants/StaticScrollSection';
import {
  TickerBoxData,
  dropDownBodyData,
  dropDownData,
  heroSectionData,
  readyToStartData,
  stickySliderData,
} from '@/constants/Aspirants/aspirantPageData';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import { Box } from '@mui/material';
export const metadata = {
  title: 'Aspirants | Razorswift',
};

function Aspirants() {
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
        <StaticScrollSection stickySliderData={stickySliderData} />
        <CareerSection />
        <DropdownSection
          dropDownData={dropDownData}
          dropDownBodyData={dropDownBodyData}
        />

        <FastrackSection />
        <GetStartedSection readyToStartData={readyToStartData} />
      </Box>
    </Layout>
  );
}

export default Aspirants;
