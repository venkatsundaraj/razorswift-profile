import React from 'react'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import { Container } from '@mui/material'
import ourcommitment from '@/constants/Aboutus/ourcommitment'
const OurCommitment = () => {
  return (
    <Container sx={{ marginTop: '100px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Box>
            <Typography
              sx={{ textAlign: 'center', fontSize: '44px', fontWeight: '600' }}
            >
              {ourcommitment[0].title}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Typography
            sx={{
              textAlign: 'justify',
              fontSize: '20px',
              color: 'primary.paragrey',
            }}
          >
            {ourcommitment[0].description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </Container>
  )
}

export default OurCommitment
