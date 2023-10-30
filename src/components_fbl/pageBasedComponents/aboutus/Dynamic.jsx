import React from 'react'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import DynamicConst from '@/constants/Aboutus/DynamicConst'
import Container from '@mui/material/Container'
const Dynamic = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid sx={{}} item md={6}>
            <Typography>{DynamicConst[0].description}</Typography>
          </Grid>
          <Grid sx={{}} item md={6}>
            <Image alt="bannerImage" src={DynamicConst[0].img} />
          </Grid>
        </Grid>
        <Typography>{DynamicConst[0].descriptiontwo}</Typography>
      </Container>
    </Box>
  )
}

export default Dynamic
