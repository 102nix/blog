import React from 'react'
import { withNavbar } from './withNavbar'
import { NavbarComponent } from '../../layouts/NavbarComponent/NavbarComponent'

export const NavbarContainer = ({ auth, logout }) => {
  const Navbar = withNavbar(NavbarComponent)
  return <Navbar auth={auth} logout={logout}/>
}