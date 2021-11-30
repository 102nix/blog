import React from 'react'
import { NavbarProvider } from '../hooks/useNavbar'
import { NavbarComponent } from '../layouts/NavbarComponent'

export const NavbarContainer = () => {
  return (
    <NavbarProvider>
      <NavbarComponent />
    </NavbarProvider>
  )
}