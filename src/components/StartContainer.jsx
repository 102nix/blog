import React from 'react'
import { StartInfoProvider } from '../../hooks/useStartPage'
import { StartPage } from '../../pages/StartPage/StartPage'

export const StartContainer = () => {
  return (
    <StartInfoProvider>
      <StartPage />
    </StartInfoProvider>
  )
}