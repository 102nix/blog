import React from 'react'
import { NavLink } from 'react-router-dom'
import list2xPng from '../../assets/imgs/list2x.png'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import './ArticlePage.scss'

export const ArticlePage = ({ article }) => {

  return (
    <div className="current-article">
      <SubTitle>{article.title}</SubTitle>
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