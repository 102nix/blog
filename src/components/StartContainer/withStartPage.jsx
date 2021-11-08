import React, { useReducer, useEffect } from 'react'
import Loader from '../common/Loader/Loader'
import { reducer, initialState } from '../../state/state'
import { ACTIONS } from '../../state/constsAC'
import startInfoService from '../../services/startInfoService'

export const withStartPage = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    startInfoService.fetchAll().then(startInfo => dispatch({ type: ACTIONS.FETCH_MAININFO, startInfo }))
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