import React, { useReducer, useEffect } from 'react'
import api from '../../api'
import { ACTIONS } from '../../state/constsAC'
import { reducer, initialState } from '../../state/state'
import Loader from '../common/Loader/Loader'

export const withArticle = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { id } = props

  useEffect(() => {
    (async () => {
      const article = await api.articles.getById(id)
      dispatch({ type: ACTIONS.FETCH_ARTICLE, article })
    })()
  }, [id])

  return (
    <>
      {state.article ? (
        <Component blog={state.article} />
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </>
  )
}