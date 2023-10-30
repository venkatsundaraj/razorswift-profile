import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

function CustomImage({ width, height, aspectRatio, alt, objectFit, ...props }) {
  const altTag = alt || 'Razorswift'
  const objectFitValue = objectFit || 'cover'
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: aspectRatio,
        width: width,
        height: `${height ? height : 'auto'}`,
      }}
      component="div"
    >
      <Image
        priority={true}
        alt={altTag}
        style={{ objectFit: objectFitValue }}
        fill={true}
        sizes="auto"
        {...props}
      />
    </Box>
  )
}

export default CustomImage
