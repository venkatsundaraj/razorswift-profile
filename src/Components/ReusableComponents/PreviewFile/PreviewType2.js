import { Typography } from '@mui/material';

const PreviewType2 = ({ file, width, height, maxWidth }) => {
  return (
    <Typography
      noWrap
      sx={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        textOverflow: 'ellipsis',
      }}
    >
      {file.name}
    </Typography>
  );
};

export default PreviewType2;
