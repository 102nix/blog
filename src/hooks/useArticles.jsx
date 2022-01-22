
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { getArticles } from '../store/articles'
import _ from 'lodash'
import Pagination from '@mui/material/Pagination'
import { paginate } from '../static/paginate'

const ArticlesContext = React.createContext()

export const useArticles = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }) => {
  const articles = useSelector(getArticles())
  const [findArticleArr, setFindArticleArr] = useState(null)
  const sortedArticles = _.orderBy(findArticleArr || articles, ['date'], ['desc'])
  const pageSize = 3
  const count = Math.ceil(sortedArticles.length / pageSize)
  const [page, setPage] = useState(1)
  const [articlesPaginate, setArticlesPaginate] = useState(paginate(sortedArticles, page, pageSize))
  const handleChange = (value) => {
    setPage(value)
    setArticlesPaginate(paginate(sortedArticles, page, pageSize))
  }

  // const articlesPaginate = paginate(sortedArticles, page, pageSize)

  return (
    <ArticlesContext.Provider value={{ articles, setFindArticleArr, articlesPaginate }}>
      { children }
      <Pagination count={count} page={page} onChange={handleChange} />
    </ArticlesContext.Provider>
  )
}