import React, { useReducer, useEffect } from 'react'
import api from '../../api'
import Loader from '../common/Loader/Loader'
import { reducer, initialState } from '../../state/state'

export const withStartPage = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    (async () => {
      const startInfo = await api.articles.fetchAllMain()
      dispatch({ type: 'downloadMainInfo', startInfo })
    })()
  }, [])

  return (
    <>
      {state.mainInfo ? (
        <Component startInfo={state.mainInfo} />
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </>
  )
}