import React, { useReducer, useEffect } from 'react'
import api from '../../api'
import Loader from '../common/Loader/Loader'
import { reducer, initialState } from '../../state/state'
import { ACTIONS } from '../../state/constsAC'

export const withAllArticles = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    (async () => {
      const articles = await api.articles.fetchAll()
      dispatch({ type: ACTIONS.FETCH_ARTICLES, articles })
    })()
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