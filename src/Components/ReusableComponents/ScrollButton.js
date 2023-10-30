import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, styled, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
const Label = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#ffffff',
  fontWeight: '600',
  lineHeight: '32.58px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '25.29px',
  },
}));
const ScrollButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);
  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 300);
  };
  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);
  }, []);
  return (
    <>
      {showGoTop && (
        <Box
          sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
          onClick={handleScrollUp}
          role="presentation"
          // sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 2 }}
        >
          <Fab
            sx={{
              backgroundColor: '#2F3B60',
              '&:hover': {
                backgroundColor: '#2F3B60',
              },
            }}
            size="large"
            aria-label="scroll back to top"
          >
            <ArrowUpwardIcon sx={{ color: 'white' }} />
          </Fab>
          <Label>To top</Label>
        </Box>
      )}
    </>
  );
};

export default ScrollButton;
