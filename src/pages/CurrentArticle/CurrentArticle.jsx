import React, { useEffect, useState } from 'react'
import api from '../../api'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
// import list1xPng from '../../assets/imgs/list1x.png'
import list2xPng from '../../assets/imgs/list2x.png'
import './CurrentArticle.scss'

export const CurrentArticle = ({ id }) => {

  const [article, setArticle] = useState()

  useEffect(() => {
    api.articles.getById(id).then(data => setArticle(data))
  },[])

  return (
    <>
      {article ? (
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
        </div>
        ) : (
          <div className="loader-container">
            <Loader />
          </div>
        )
      }
    </>
  )

}