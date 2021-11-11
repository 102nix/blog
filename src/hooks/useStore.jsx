import React, { useReducer, useContext, useEffect, useState } from 'react'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { useHistory } from 'react-router'
import articleService from '../services/articleService'
import Loader from '../components/common/Loader/Loader'

const StoreContext = React.createContext()

export const useStore = () => {
  return useContext(StoreContext)
}

export const StateProvider = ({ children }) => {
  console.log('useState')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const getAllArticles = async () => {
    console.log('Getter for articles')
    try {
      const allArticles = await articleService.fetchAllArticles()
      console.log('All articles!!!: ', allArticles)
      return allArticles
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
  useEffect(() => {
    getAllArticles().then((articles) => {
      dispatch({ type: ACTIONS.FETCH_ARTICLES, articles })
      setIsLoading(true)
    })
  }, [])

  const handleOpenArticle = (articleId) => {
    getArticle(articleId)
    history.push(`/articles/${articleId}`)
  }

  const closeArticle = () => dispatch({ type: ACTIONS.CLOSE_ARTICLE })

  // useEffect(() => {
  //   if (articleId !== undefined) {
  //     setIsLoading(false)
  //     getArticle(articleId).then((article) => {
  //       dispatch({ type: ACTIONS.FETCH_ARTICLE, article }) // setIsLoading(true)
  //       setIsLoading(true)
  //     })
  //   } else {
  //     getArticle(articleId).then(article => dispatch({ type: ACTIONS.FETCH_ARTICLE, article })) // setIsLoading(true)
  //   }
  // }, [articleId])
  return (
    <StoreContext.Provider value={{ articles: state.articles, blog: state.article, handleOpenArticle, closeArticle }}>
      { isLoading ? children : <div className="loader-container"><Loader /></div> }
    </StoreContext.Provider>
  )
}