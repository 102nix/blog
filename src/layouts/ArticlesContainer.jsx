import React from 'react'
import { ArticlesListPage } from '../pages/ArticlesListPage'
import { ArticlePage } from '../pages/ArticlePage'
import { useStore } from '../hooks/useStore'

export const ArticlesContainer = () => {
  const { articles, blog, handleOpenArticle } = useStore()
  return (
    <div className="articles">
      {blog ? (
        <ArticlePage blog={blog}/>
      ) : (
        <ArticlesListPage articles={articles} handleOpenArticle={handleOpenArticle} />
      )
      }
    </div>
  )
}