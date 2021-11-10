import React, { useReducer, useEffect } from 'react'
import Loader from '../common/Loader/Loader'
import { reducer, initialState } from '../../state/state'
import { ACTIONS } from '../../state/constsAC'
import startInfoService from '../../services/startInfoService'
import { toast } from 'react-toastify'

export const withStartPage = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getStartInfo = async () => {
    try {
      const startInfo = await startInfoService.fetchAll()
      return startInfo
    } catch (error) {
      toast(error)
    }
  }

  useEffect(() => {
    getStartInfo().then(startInfo => dispatch({ type: ACTIONS.FETCH_MAININFO, startInfo }))
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