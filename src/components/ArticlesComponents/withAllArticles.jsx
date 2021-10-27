import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from '../common/Loader/Loader'

export const withAllArticles = (Component) => (props) => {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    api.articles.fetchAll().then(data => setArticles(data))
  }, [])

  return (
    <>
      {articles.length > 0 ? (
        <Component articles={articles} {...props}/>
        ) : (
          <div className="loader-container">
              <Loader />
          </div>
      )}
    </>)
}