
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { getArticles } from '../store/articles'
import _ from 'lodash'
// import Pagination from '@mui/material/Pagination'
import { paginate } from '../static/paginate'

const ArticlesContext = React.createContext()

export const useArticles = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }) => {
  const articles = useSelector(getArticles())
  const [findArticleArr, setFindArticleArr] = useState(null)

  const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' })

  // const sortedArticles = _.orderBy(findArticleArr || articles, ['date'], ['desc'])
  const sortedArticles = _.orderBy(findArticleArr || articles, [sortBy.path], [sortBy.order])

  const pageSize = 6
  const count = Math.ceil(sortedArticles.length / pageSize)
  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const articlesPaginate = paginate(sortedArticles, page, pageSize)

  return (
    <ArticlesContext.Provider value={{ articles, setFindArticleArr, articlesPaginate, sortBy, handleSort, count, handleChange, page }}>
      { children }
    </ArticlesContext.Provider>
  )
}