import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React from 'react'

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primaryPalette.white,
  width: '100vw',

  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(2, 2),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(8, 3),
  },
}))

function DropDownWrapper({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>
}

export default DropDownWrapper
