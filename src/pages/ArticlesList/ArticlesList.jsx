import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
//components:
import Loader from '../../components/Loader/Loader'
import { ArticleComponent } from '../../components/ArticleComponent/ArticleComponent'
import { CurrentArticle } from '../CurrentArticle/CurrentArticle'
import './ArticlesList.scss'

export const ArticlesList = () => {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    api.articles.fetchAll().then(data => setArticles(data))
  }, [])

  const params = useParams()
  const { articleId } = params

  return (
    <div className="articles-list">
      {!articleId &&
        <h2>Статьи</h2>
      }
      <div className="articles-list__container">
        {articles.length !== 0 ? (
          articleId ? (
            <CurrentArticle id={articleId} />
          ) : (
            <ArticleComponent articles={articles} />
          )) : (
            <div className="loader-container">
              <Loader />
            </div>
          )
        }
      </div>
    </div>
  )
}