import { Typography } from '@mui/material';
import React from 'react';

const PreviewFile = ({ file, width, height, maxWidth }) => {
  const [preview, setPreview] = React.useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  reader.onload = () => {
    setPreview(isFileImage(file) ? reader.result : '/default.svg');
  };

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

export default PreviewFile;
