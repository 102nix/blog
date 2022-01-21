import React from 'react'
import { ComponentInput } from './common/form/TextField'

export const SearchArticleComponent = ({ searchArticle, setSearchArticle, articles, setFindArticleArr }) => {
  const handlerSearchArticle = (e) => {
    setSearchArticle(e.value)
    const findArticles = []
    articles.forEach(a => {
      if (
        a.title.toLowerCase().indexOf(e.value.toLowerCase()) !== -1
      ) {
        findArticles.push(a)
      }
    })
    setFindArticleArr(findArticles)
  }
  return (
    <ComponentInput
      label='Название статьи:'
      name='searchArticle'
      value={searchArticle}
      onChange={(e) => handlerSearchArticle(e)}
      placeholder='Поиск...'
    />
  )
}