import React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import Link from '@mui/material/Link'

const FillButton = styled(Link)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.4, 1.6),
  border: '1px solid #A62973',
  textDecoration: 'none',
  background: 'transparent',
  textTransform: 'inherit',
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

const NavButton = function ({ children, href, ...props }) {
  return (
    <FillButton {...props} href={href} component={NextLink}>
      {children}
    </FillButton>
  )
}

export default NavButton
