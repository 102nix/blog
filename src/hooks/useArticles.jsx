import React, { useEffect, useReducer, useContext, useState } from 'react'
import { useParams } from 'react-router'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { getAllArticles, getArticle } from '../services/articleGeters'
import Loader from '../components/common/Loader/Loader'

const ArticlesContext = React.createContext()

export const useArticles = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { articleId } = useParams()

  useEffect(() => {
    getAllArticles().then(articles => {
      dispatch({ type: ACTIONS.FETCH_ARTICLES, articles })
      setIsLoading(true)
    })
  }, [])

  useEffect(() => {
    console.log('get with id')
    if (articleId !== undefined) {
      setIsLoading(false)
      getArticle(articleId).then(article => {
        dispatch({ type: ACTIONS.FETCH_ARTICLE, article }) // setIsLoading(true)
        setIsLoading(true)
      })
    } else {
      getArticle(articleId).then(article => dispatch({ type: ACTIONS.FETCH_ARTICLE, article })) // setIsLoading(true)
    }
  }, [articleId])

  return (
    <ArticlesContext.Provider value={{ articles: state.articles, blog: state.article }}>
      { isLoading ? children : <div className="loader-container"><Loader /></div> }
    </ArticlesContext.Provider>
  )
}