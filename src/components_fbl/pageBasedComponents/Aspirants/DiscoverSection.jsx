import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import DiscoverCardLists from '@/components_fbl/CardComponents/AspirantCards/DiscoverCardLists';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { discoverSectionData } from '@/constants/Aspirants/aspirantPageData';

function DiscoverSection() {
  return (
    <CustomSection
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        minHeight: '100vh',
        justifyContent: 'start',
        color: 'violetPalette.dark',
      }}
    >
      <PrimaryHeading>{discoverSectionData.title}</PrimaryHeading>
      <PrimaryFillButton
        href="/blogs/aspirants"
        variant="contained"
        sx={{
          backgroundColor: theme => theme.palette.violetPalette.dark,
          color: theme => theme.palette.primaryPalette.white,
          mb: 8,
          '&:hover': {
            backgroundColor: theme => theme.palette.violetPalette.dark,
          },
        }}
      >
        {discoverSectionData.buttonTitle}
      </PrimaryFillButton>
      <DiscoverCardLists cardData={discoverSectionData.cards} />
    </CustomSection>
  );
}

export default DiscoverSection;
