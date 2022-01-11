import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticlesLoadingStatus, getOpenArticle, goArticlesListPage, goRegPage, loadArticlesList } from '../../../store/articles'
import { loadStartInfo } from '../../../store/startInfo'
import { useHistory } from 'react-router-dom'
import Loader from '../../common/Loader/Loader'

export const AppLoader = ({ children }) => {
  const articlesStatusLoading = useSelector(getArticlesLoadingStatus())
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    checkLoadByURL()
  }, [])
  useEffect(() => {
    checkLoadByURL()
  }, [location.pathname])

  async function checkLoadByURL () {
    if (location.pathname === '/articles' || location.pathname === '/admin') {
      dispatch(goArticlesListPage())
      await dispatch(loadArticlesList())
    } else if (location.pathname.indexOf('/articles/') !== -1) {
      const arrUrl = location.pathname.split('/')
      await dispatch(loadArticlesList())
      dispatch(getOpenArticle(arrUrl[2]))
    } else if (location.pathname === '/') {
      dispatch(loadStartInfo())
    } else if (location.pathname === '/auth/login') {
      dispatch(goRegPage())
      history.push('/auth/login')
    } else if (location.pathname === '/auth/register') {
      history.push('/auth/register')
      dispatch(goRegPage())
    }
  }
  if (location.pathname === '/') return children
  if (articlesStatusLoading) return <div className="loader-container"><Loader/></div>
  return children
}