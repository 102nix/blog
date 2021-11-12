import React, { useReducer, useContext, useState, useEffect } from 'react'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { useHistory, useLocation } from 'react-router'
import articleService from '../services/articleService'
import startInfoService from '../services/startInfoService'
import Loader from '../components/common/Loader/Loader'
import { toast } from 'react-toastify'

const StoreContext = React.createContext()

export const useStore = () => {
  return useContext(StoreContext)
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()
  const location = useLocation()

  console.log(state, location.pathname)

  const getStartInfo = async () => {
    try {
      const startInfo = await startInfoService.fetchAll()
      // return startInfo
      dispatch({ type: ACTIONS.FETCH_MAININFO, startInfo })
      setIsLoading(true)
    } catch (error) {
      toast(error)
    }
  }

  const getAllArticles = async () => {
    try {
      const allArticles = await articleService.fetchAllArticles()
      // return allArticles
      dispatch({ type: ACTIONS.FETCH_ARTICLES, allArticles })
      setIsLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const getArticle = async (articleId) => {
    setIsLoading(false)
    try {
      const article = await articleService.fetchArticle(articleId)
      dispatch({ type: ACTIONS.FETCH_ARTICLE, article }) // setIsLoading(true)
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
      getAllArticles()
    } else if (location.pathname.indexOf('/articles/') !== -1) {
      const arrUrl = location.pathname.split('/')
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
    <StoreContext.Provider value={{ articles: state.articles, blog: state.article, startInfo: state.mainInfo, handleOpenArticle, setIsLoading, dispatch, getArticle }}>
      { isLoading ? children : <div className="loader-container"><Loader /></div> }
    </StoreContext.Provider>
  )
}