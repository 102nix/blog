import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from '../Loader/Loader'

export const withStartPage = (Component) => (props) => {
  
  const [startInfo, setStartInfo] = useState([])

  useEffect(() => {
    api.articles.fetchAllMain().then(data => setStartInfo(data))
  }, [])
  
  return (
    <>
      {startInfo.length > 0 ? (
        <Component startInfo={startInfo} />
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
        
      )}
    </>
    
  )
}