import React from 'react'
import { NavbarProvider } from '../../hooks/useNavbar'
import { NavbarComponent } from '../../layouts/NavbarComponent/NavbarComponent'

export const NavbarContainer = () => {
  return (
    <NavbarProvider>
      <NavbarComponent />
    </NavbarProvider>
  )
}