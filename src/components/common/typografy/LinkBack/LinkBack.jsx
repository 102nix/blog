import React from 'react'
import { NavLink } from 'react-router-dom'
import list2xPng from '../../../../assets/imgs/list2x.png'
import './LinkBack.scss'

export const LinkBack = () => {
  return (
    <div className="action-block">
    <NavLink 
      className=' '
      to='/articles'          
    >
      <img src={list2xPng} alt="" />
    </NavLink>
  </div>
  )
}