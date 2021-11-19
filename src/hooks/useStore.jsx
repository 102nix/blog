import React, { useReducer, useContext, useState, useEffect } from 'react'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { useHistory, useLocation } from 'react-router'
import articlesService from '../services/articlesService'
import articleService from '../services/articleService'
import startInfoService from '../services/startInfoService'
import LoadContainer from '../components/common/Loader/Loader'
import { toast } from 'react-toastify'
import _ from 'lodash'

const StoreContext = React.createContext()

export const useStore = () => {
  return useContext(StoreContext)
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  // const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' })

  const sortedArticles = _.orderBy(state.articles, ['date'], ['desc'])
  // const handleSort = (item) => {
  //   setSortBy(item)
  // }

  const history = useHistory()
  const location = useLocation()

  const getStartInfo = async () => {
    try {
      const startInfo = await startInfoService.fetchAll()
      dispatch({ type: ACTIONS.FETCH_MAININFO, startInfo })
      setIsLoading(true)
    } catch (error) {
      toast(error)
    }
  }

  const getAllArticles = async () => {
    try {
      const { content } = await articlesService.get()
      dispatch({ type: ACTIONS.FETCH_ARTICLES, content })
      setIsLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  async function getArticle (articleId) {
    // const article = state.articles.find(p => String(p.id) === String(articleId))
    // dispatch({ type: ACTIONS.FETCH_ARTICLE, article })
    // setIsLoading(true)
    try {
      const content = await articleService.get(articleId)
      // return allArticles
      dispatch({ type: ACTIONS.FETCH_ARTICLE, content })
      setIsLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenArticle = (articleId) => {
    getArticle(articleId)
    history.push(`/articles/${articleId}`)
  }

  function checkLoadByURL () {
    if (location.pathname === '/articles' || location.pathname === '/admin') {
      setIsLoading(false)
      getAllArticles()
    } else if (location.pathname.indexOf('/articles/') !== -1) {
      const arrUrl = location.pathname.split('/')
      // getAllArticles()
      getArticle(arrUrl[2])
    } else if (location.pathname === '/') {
      getStartInfo()
    } else if (location.pathname === '/auth/login') {
      setIsLoading(true)
      history.push('/auth/login')
    } else if (location.pathname === '/auth/register') {
      history.push('/auth/register')
      setIsLoading(true)
    }
  }

  useEffect(() => {
    checkLoadByURL()
  }, [])
  useEffect(() => {
    checkLoadByURL()
  }, [location.pathname])

  return (
    <StoreContext.Provider value={{ articles: sortedArticles, blog: state.article, startInfo: state.mainInfo, handleOpenArticle, setIsLoading, dispatch, getArticle, getAllArticles, checkLoadByURL }}>
      {isLoading ? children : <div className="loader-container"><LoadContainer /></div> }
    </StoreContext.Provider>
  )
}