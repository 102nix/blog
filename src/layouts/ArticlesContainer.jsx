import React from 'react'
import { ArticlesListPage } from '../pages/ArticlesListPage'
import { ArticlePage } from '../pages/ArticlePage'
// import { useStore } from '../hooks/useStore'
import { useSelector } from 'react-redux'
import { getCurrentArticle } from '../store/articles'

export const ArticlesContainer = () => {
  // const { articles, blog, handleOpenArticle } = useStore()
  // const { blog } = useStore()
  const blog = useSelector(getCurrentArticle())
  return (
    <div className="articles">
      {blog?.length > 0 ? (
        <ArticlePage blog={blog}/>
      ) : (
        // <ArticlesListPage articles={articles} handleOpenArticle={handleOpenArticle} />
        <ArticlesListPage />
      )
      }
    </div>
  )
}