import React from 'react'
import { useHistory } from 'react-router-dom'

export const ArticlesListPage
 = ({ articles }) => {

  const history = useHistory()

  const handlerOpenArticle = (articleId) => {
    history.push(`/articles/${articleId}`)
  }
  
  return (
    <>
      <h2>Статьи</h2>
      <div className="articles__articles-list">
        {articles.map(article => (
          <div className="articles-list__card" key={article.id}>
            <h4>{article.title}</h4>
            <div className="article-text">
              `{article.article.substr(0,71)}...`
            </div>
            <button 
              className="btn btn-open-article" 
              onClick={() => handlerOpenArticle(article.id)}
            >
              Открыть
            </button>
          </div>
          ))}
      </div>
    </>)
}