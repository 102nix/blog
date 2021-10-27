import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from '../common/Loader/Loader'
import _ from 'lodash'

export const withAllAdmin = (Component) => (props) => {

  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState({ path: 'name', order: "asc" })

  useEffect(() => {
    api.articles.fetchAll().then(data => setArticles(data))
  }, [])

  const sortedArticles = _.orderBy(articles, [sortBy.path], [sortBy.order])
  
  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlerDelArticle = (articleId) => {
    console.log(articleId)
  }

  return (
    <>
      {articles.length > 0 ? (
        <Component 
          sortedArticles={sortedArticles} 
          columns={props.columns}
          sortBy={sortBy}
          handleSort={handleSort}
          handlerDelArticle={handlerDelArticle}
          handlerEdit={props.handlerEdit}
        />
        ) : (
          <div className="loader-container">
              <Loader />
          </div>
      )}
    </>)
}