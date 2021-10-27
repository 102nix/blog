import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import list2xPng from '../../assets/imgs/list2x.png'
import './ArticlePage.scss'

export const ArticlePage = ({ article }) => {

  return (
    <div className="current-article">
    <h2>{article.title}</h2>
    <div className="current-article__body">
      {article.article}
    </div>
    <div className="action-block">
      <NavLink 
          className=' '
          to='/articles'          
        >
          Список статей
        </NavLink>
        <NavLink 
          className=' '
          to='/articles'          
        >
          <img src={list2xPng} alt="" />
        </NavLink>
    </div>
  </div>)
}