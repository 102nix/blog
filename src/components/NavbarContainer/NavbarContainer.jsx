import React from 'react'
import { withNavbar } from './withNavbar'
import { NavbarComponent } from '../../layouts/NavbarComponent/NavbarComponent'

export const NavbarContainer = () => {
  const Navbar = withNavbar(NavbarComponent)
  return <Navbar />
}