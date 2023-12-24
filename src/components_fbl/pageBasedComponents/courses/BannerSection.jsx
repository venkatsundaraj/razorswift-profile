import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import SuperText from '@/components_fbl/headingComponents/SuperText';
import { TickerBoxData } from '@/src/constants/Aspirants/aspirantPageData';
import { Box } from '@mui/material';

function BannerSection({ bannerData }) {
  return (
    <Box
      component="section"
      sx={{
        padding: '0px',
        height: { xs: '50vh', md: '100dvh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: { md: 'calc(100% - 65px)' },
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
          width="clamp(300px, 46vw, 800px)"
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
    </Box>
  );
}

export default BannerSection;
