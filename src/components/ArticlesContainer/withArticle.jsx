import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from '../common/Loader/Loader'

export const withArticle = (Component) => (props) => {
  const [article, setArticle] = useState()

  useEffect(() => {
    console.log('testing...')
    api.articles.getById(props.id).then(data => setArticle(data))
  }, [props.id])

  return (
    <>
      {article ? (
        <Component blog={article} />
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </>
  )
}