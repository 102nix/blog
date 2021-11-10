import React, { useState, useEffect, useReducer, useContext } from 'react'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { toast } from 'react-toastify'
import startInfoService from '../services/startInfoService'
import Loader from '../components/common/Loader/Loader'

const StartInfoContext = React.createContext()

export const useStartPage = () => {
  return useContext(StartInfoContext)
}

export const StartInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(true)
  console.log(state)
  const getStartInfo = async () => {
    try {
      const startInfo = await startInfoService.fetchAll()
      dispatch({ type: ACTIONS.FETCH_MAININFO, startInfo })
      setIsLoading(false)
    } catch (error) {
      toast(error)
    }
  }

  useEffect(() => {
    getStartInfo()
  }, [])

  return (
    <StartInfoContext.Provider value={{ startInfo: state.mainInfo }}>
      {!isLoading ? children : <div className="loader-container"><Loader /></div>}
    </StartInfoContext.Provider>
  )
}