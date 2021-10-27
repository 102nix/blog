import React from 'react'
import { useParams } from 'react-router-dom'
import { withAllArticles } from './withAllArticles'
import { withArticle } from './withArticle'
import { ArticlesListPage } from '../../pages/ArticlesListPage/ArticlesListPage'
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage'
import './ArticlesList.scss'

export const AllArticles = () => {

  const { articleId } = useParams()

  const AllArticles = withAllArticles(ArticlesListPage)
  const Article = withArticle(ArticlePage)

  return (
    <div className="articles">
      {articleId ? (
          <Article id={articleId}/>
        ) : (
          <AllArticles />
        )
      }
    </div>)
}