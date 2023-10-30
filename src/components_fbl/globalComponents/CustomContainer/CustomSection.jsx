import React from 'react'
import { Box } from '@mui/material'
import styled from '@emotion/styled'

const ViewPortBox = styled(Box)(({ theme }) => ({
  width: '100vw',
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}))

function CustomSection({ children, ...props }) {
  return (
    <ViewPortBox component="section" {...props}>
      {children}
    </ViewPortBox>
  )
}

export default CustomSection
