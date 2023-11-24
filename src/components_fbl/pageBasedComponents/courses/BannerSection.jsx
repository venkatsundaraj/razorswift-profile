import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import { TickerBoxData } from '@/src/constants/Aspirants/aspirantPageData';
import { Box } from '@mui/material';

function BannerSection({ bannerData }) {
  return (
    <CustomSection style={{ padding: '0px', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: 'calc(100vh - 65px)',
          width: '100%',
          alignItems: 'center',
          justifyContent: { xs: 'end' },
          gap: { xl: '100px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: { xs: 'center' },
          }}
        >
          <SuperText
            sx={{
              color: 'pinkPalette.dark',
              width: '100%',
            }}
          >
            {bannerData.mainHeaderOne}
          </SuperText>
          <SuperText
            sx={{
              color: 'violetPalette.dark',
              width: '100%',
            }}
          >
            {bannerData.mainHeaderTwo}
          </SuperText>
        </Box>
        <CustomImage
          alt="Courses page banner"
          src={bannerData.bannerImage}
          aspectRatio="1358/593"
          width="clamp(300px, 55vw, 800px)"
        />
      </Box>
      <TickerComponent
        variant="div"
        data={TickerBoxData}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </CustomSection>
  );
}

export default BannerSection;
