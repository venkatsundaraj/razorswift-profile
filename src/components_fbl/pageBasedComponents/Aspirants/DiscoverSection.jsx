import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import BlogCardCopy from '@/src/components_fbl/pageBasedComponents/blogs/BlogCardCopy';
import { compareDates } from '@/utils/helpers/compareDate';
import { allBlogs } from 'contentlayer/generated';
import { useRouter } from 'next/router';

function DiscoverSection({ cta, title, emptyButton }) {
  const router = useRouter();

  const filteredBlogData = allBlogs
    .filter(item => item.parent === cta)
    .sort(compareDates)
    .slice(0, 3);

  if (!filteredBlogData) null;
  return (
    <CustomSection
      style={{ padding: 'clamp(16px,3vw,32px) 0', minHeight: 'max-content' }}
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
      {title ? (
        <PrimaryHeading
          sx={{ color: 'violetPalette.dark', textAlign: 'center' }}
        >
          {title}
        </PrimaryHeading>
      ) : null}
      {emptyButton ? null : (
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
      )}
      {/* <DiscoverCardLists cardData={discoverSectionData.cards} /> */}
      <BlogCardCopy filteredBlogData={filteredBlogData} />
    </CustomSection>
  );
}

export default DiscoverSection;
