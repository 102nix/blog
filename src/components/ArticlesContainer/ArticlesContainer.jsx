import React from 'react'
import { ArticlesListPage } from '../../pages/ArticlesListPage/ArticlesListPage'
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage'
import { ArticlesProvider } from '../../hooks/useArticles'

export const ArticlesContainer = () => {
  return (
    <ArticlesProvider>
      <div className="articles">
        <ArticlesListPage />
        <ArticlePage />
      </div>
    </ArticlesProvider>
  )
}