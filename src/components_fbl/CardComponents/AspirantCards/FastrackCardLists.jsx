import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { Box, Typography } from '@mui/material';

function FastrackCardLists({ lists, ...props }) {
  return (
    <>
      {lists.map(item => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: `${item.bgColor}`,
            padding: theme => theme.spacing(2, 2),
            borderRadius: 2,
            minHeight: { xs: '120px', sm: '86px', md: '120px' },
            width: { xs: '100%' },
            transitionDuration: '0.3s',
            '&:hover': {
              transform: 'translateY(-10px)',
              transitionTimingFunction: 'ease',
              transitionDelay: '0s',
              transitionProperty: 'all',
              transitionBehavior: 'normal',
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'violetPalette.dark',
              fontSize: 'clamp(24px,3vw,32px)',
              fontWeight: '500',
            }}
          >
            {item.percentage}
          </Typography>
          <SubtitleHeading>{item.description}</SubtitleHeading>
        </Box>
      ))}
    </>
  );
}

export default FastrackCardLists;
