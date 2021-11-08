import React, { useReducer, useEffect } from 'react'
import { ACTIONS } from '../../state/constsAC'
import { reducer, initialState } from '../../state/state'
import Loader from '../common/Loader/Loader'
import { getArticle } from '../../services/articleGeters'

export const withArticle = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { id } = props

  useEffect(() => {
    getArticle(id).then(article => dispatch({ type: ACTIONS.FETCH_ARTICLE, article }))
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