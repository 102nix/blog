import React, { useEffect, useReducer, useContext } from 'react'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { getAllArticles } from '../services/articleGeters'
import Loader from '../components/common/Loader/Loader'

const ArticlesContext = React.createContext()
export const useArticles = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllArticles().then(articles => dispatch({ type: ACTIONS.FETCH_ARTICLES, articles }))
  }, [])

  return (
    <ArticlesContext.Provider value={{ articles: state.articles }}>
      {state.articles ? children : <div className="loader-container"><Loader/></div>}
    </ArticlesContext.Provider>
  )
}