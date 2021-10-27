import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from '../Loader/Loader'

export const withArticle = (Component) => (props) => {
  
  const [article, setArticle] = useState()
  useEffect(() => {
      console.log('useEffect')
      api.articles.getById(props.id).then(data => setArticle(data))
    },[])
  
  return (
    <>
      {article ? (
        <Component article={article} />
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
        
      )}
    </>
    
  )
}