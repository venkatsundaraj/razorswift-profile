import DropdownSection from '@/components_fbl/pageBasedComponents/Aspirants/DropdownSection';
import HeroSection from '@/components_fbl/pageBasedComponents/Homepage/HeroSection';
// import HeroSectionCopy from '@/components_fbl/pageBasedComponents/Homepage/HeroSectionCopy';
// import DropdownSection from "@/components_fbl/pageBasedComponents/Homepage/DropdownSection";
import Layout from '@/components_fbl/NavigationComponents/Layout';
import DemoSection from '@/components_fbl/pageBasedComponents/Homepage/DemoSection';
import ExploreSection from '@/components_fbl/pageBasedComponents/Homepage/ExploreSection';
import PathwaySection from '@/components_fbl/pageBasedComponents/Homepage/PathwaySection';
import dropDownBodyData from '@/constants/Homepage/dropDownBodyData';
import dropDownData from '@/constants/Homepage/dropDownData';
import { heroSectionData } from '@/src/constants/Homepage/heroTabContents';
import Head from 'next/head';

export const metadata = {
  title: 'Home | Razorswift',
};

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Homepage | Razorswift</title>
        <meta
          name="description"
          content="A dynamic ecosystem where talent and opportunities converge"
        />
      </Head>
      <HeroSection heroSectionData={heroSectionData} />
      <main className="Topcontainer">
        <DropdownSection
          dropDownData={dropDownData}
          dropDownBodyData={dropDownBodyData}
        />
        <PathwaySection />
        <ExploreSection />
        <DemoSection />
      </main>
    </Layout>
  );
}
