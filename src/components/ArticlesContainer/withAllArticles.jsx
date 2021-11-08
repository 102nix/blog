import React, { useReducer, useEffect } from 'react'
import Loader from '../common/Loader/Loader'
import { reducer, initialState } from '../../state/state'
import { ACTIONS } from '../../state/constsAC'
import { getAllArticles } from '../../services/articleGeters'

export const withAllArticles = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllArticles().then(articles => dispatch({ type: ACTIONS.FETCH_ARTICLES, articles }))
  }, [])

  return (
    <>
      {state.articles ? (
        <Component articles={state.articles} {...props}/>
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </>
  )
}