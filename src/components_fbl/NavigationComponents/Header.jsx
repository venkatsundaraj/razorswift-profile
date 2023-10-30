import { headerdData } from '@/constants/Aspirants/aspirantPageData';
import {
  AppBar,
  Box,
  Slide,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import Link from 'next/link';
import CustomImage from '../globalComponents/CustomImage/CustomImage';
import Navigation from './Navigation';
const HideOnScroll = function ({ window, children }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
function Header(props) {
  return (
    <Box component="header">
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          sx={{
            backgroundColor: 'primaryPalette.white',
            boxShadow: 'unset',
            zIndex: '1200',
          }}
        >
          <Toolbar>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              sx={{ width: '100vw' }}
            >
              <Link href="/">
                <CustomImage
                  src={headerdData.logo}
                  alt="Razorswift-logo"
                  width="clamp(160px,10vw,244px)"
                  aspectRatio="2/0.8"
                />
              </Link>
              <Navigation headerdData={headerdData} />
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}

export default Header;
