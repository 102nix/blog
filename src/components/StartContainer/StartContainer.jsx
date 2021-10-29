import React from 'react'
import { StartPage } from '../../pages/StartPage/StartPage'
import { withStartPage } from './withStartPage'

export const StartContainer = () => {
  const StartComponent = withStartPage(StartPage)
  return <StartComponent />
}