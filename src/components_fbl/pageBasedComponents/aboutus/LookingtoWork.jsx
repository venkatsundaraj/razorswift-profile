import React from 'react'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway'
import Link from '@mui/material/Link'
import { Container } from '@mui/material'
import lookingtowork from '@/constants/Aboutus/lookingtowork'
const LookingtoWork = () => {
  return (
    <Container
      sx={{
        backgroundColor: 'primary.main',
        marginTop: '100px',
        marginBottom: '100px',
        borderRadius: '20px',
      }}
    >
      <Grid sx={{ alignItems: 'center' }} container spacing={1}>
        <Grid item xs={12} md={3}>
          <Image alt="lookingtoimg" src={Aboutusimagepathway.lookingto} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography sx={{ fontSize: '36px', color: 'common.white' }}>
            {lookingtowork[0].title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link
            sx={{
              textDecoration: 'none',
              backgroundColor: 'primary.litepink',
              color: 'primary.main',
              cursor: 'pointer',
              fontSize: '37px',
              fontWeight: '600',
              padding: '10px 30px',
              borderRadius: '15px',
            }}
          >
            {lookingtowork[0].button}
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LookingtoWork
