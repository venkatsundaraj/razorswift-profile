import React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import Link from '@mui/material/Link'

const FillButton = styled(Link)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  textTransform: 'inherit',
  textDecoration: 'none',
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '20px',
  },
}))

const PrimaryFillButton = function ({ children, ...props }) {
  return (
    <FillButton {...props} component={NextLink}>
      {children}
    </FillButton>
  )
}

export default PrimaryFillButton
