import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import BlogCardCopy from '@/src/components_fbl/pageBasedComponents/blogs/BlogCardCopy';
import { allBlogs } from 'contentlayer/generated';
import { useRouter } from 'next/router';

function DiscoverSection({ cta, title }) {
  const router = useRouter();

  console.log(router);
  const filteredBlogData = allBlogs.filter(item => item.parent === cta);

  if (!filteredBlogData) null;
  return (
    <CustomSection
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        minHeight: { xs: '100vh', lg: '80vh' },
        justifyContent: 'start',
        color: 'violetPalette.dark',
      }}
    >
      <PrimaryHeading>{title}</PrimaryHeading>
      <PrimaryFillButton
        href={`/blogs/${cta}`}
        variant="contained"
        sx={{
          backgroundColor: theme => theme.palette.violetPalette.dark,
          color: theme => theme.palette.primaryPalette.white,
          '&:hover': {
            backgroundColor: theme => theme.palette.violetPalette.dark,
          },
        }}
      >
        View All Blogs
      </PrimaryFillButton>
      {/* <DiscoverCardLists cardData={discoverSectionData.cards} /> */}
      <BlogCardCopy filteredBlogData={filteredBlogData} />
    </CustomSection>
  );
}

export default DiscoverSection;
