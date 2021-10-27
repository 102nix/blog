import React from 'react'
import { StartPage } from '../../pages/StartPage/StartPage'
import { withStartPage } from './withStartPage'
import './StartPage.scss'


export const ForStartPage = () => {

  const StartComponent = withStartPage(StartPage)

  return <StartComponent />
}