import React from 'react'
// import { useHistory } from 'react-router-dom'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import { useStore } from '../../hooks/useStore'
import './ArticlesList.scss'

export const ArticlesListPage = () => {
  const { articles, blog, handleOpenArticle } = useStore()

  return (
    <>
      {blog === null &&
      <>
        <SubTitle>Статьи</SubTitle>
        <div className="articles__articles-list">
          {articles.map(article => (
            <div className="articles-list__card" key={article.id}>
              <h4>{article.title}</h4>
              <div className="article-text">
                {article.article.substr(0, 71)}...
              </div>
              <button
                className="btn btn-open-article"
                onClick={() => handleOpenArticle(article.id)}
              >
                Открыть
              </button>
            </div>
          ))}
        </div>
      </>
      }
    </>
  )
}