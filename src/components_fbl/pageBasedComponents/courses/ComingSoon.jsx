import coursePageImagePaths from '@/src/constants/ImagePaths/Courses/coursesPageImagePaths';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
const ComingSoon = () => {
  const imgstyle = {
    height: 'auto',
    width: 'clamp(300px, 43.5vw, 570px)',
  };
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        marginTop: '200px',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            color: '#EE5064',
            fontSize: '104px',
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          COMING SOON
        </Typography>
        <Typography
          sx={{ color: 'commin.black', fontSize: '24px', textAlign: 'center' }}
        >
          Hang Tight! We're curating the best courses for you.
        </Typography>
      </Box>
      <Image
        style={imgstyle}
        alt="razorswift"
        src={coursePageImagePaths.comingsoon}
      />
    </Stack>
  );
};

export default ComingSoon;
