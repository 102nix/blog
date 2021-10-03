import React from 'react'
import { useHistory } from 'react-router-dom'

export const ArticleComponent = ({ articles }) => {

  const history = useHistory()

  const handlerOpenArticle = (articleId) => {
    history.push(`/articles/${articleId}`)
  }
  
  return (
    <>
      {articles.map(article => (
        <div className="articles-list__card" key={article.id}>
          <h4>{article.title}</h4>
          <div className="article-text">
            `{article.article.substr(0,71)}...`
          </div>
          <button className="btn btn-open-article" onClick={() => handlerOpenArticle(article.id)}>Открыть</button>
        </div>
        ))}
    </>
  )
}