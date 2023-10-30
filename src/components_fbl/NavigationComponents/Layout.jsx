import Header from './Header'
import Footer from './Footer'

import React from 'react'

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
