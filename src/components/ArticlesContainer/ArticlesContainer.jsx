import React from 'react'
import { useParams } from 'react-router-dom'
import { withAllArticles } from './withAllArticles'
import { withArticle } from './withArticle'
import { ArticlesListPage } from '../../pages/ArticlesListPage/ArticlesListPage'
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage'

export const ArticlesContainer = () => {

  const { articleId } = useParams()

  const ArticlesComponent = withAllArticles(ArticlesListPage)
  const ArticleComponent = withArticle(ArticlePage)

  return (
    <div className="articles">
      {articleId ? (
          <ArticleComponent id={articleId}/>
        ) : (
          <ArticlesComponent />
        )
      }
    </div>)
}