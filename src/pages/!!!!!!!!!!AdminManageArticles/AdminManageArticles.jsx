import React, { useState, useEffect } from 'react'
import api from '../../api'
import { useHistory } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import './AdminManageArticles.scss'

export const AdminManageArticles = () => {

  const history = useHistory()

  const [articles, setArticles] = useState([])

  useEffect(() => {
    api.articles.fetchAll().then(data => setArticles(data))
  }, [])

  const handlerDelArticle = (articleId) => {
    console.log(articleId)
  }

  return (
    <>
      {articles.length > 0 ? (
        <div className="admin-articles">
          <div className="admin-articles__header-block">
            <h3>Статьи:</h3>
            <button className='btn' onClick={() => history.push('/createarticle') }>Создать статью</button>
          </div>
          <div className="admin-articles__articles-block">
            {articles.map(value => (
              <div className="admin-articles__article-card">
                <span>{value.title}</span> 
                <button className='btn btn-delete' onClick={() => handlerDelArticle(value.id)}>X</button>
              </div>
            ))}
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