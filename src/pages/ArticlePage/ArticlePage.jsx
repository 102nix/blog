import React from 'react'
import { ArticleText } from '../../components/common/typografy/ArticleText/ArticleText'
import { SubTitle } from '../../components/common/typografy/SubTitle'
// import { useArticles } from '../../hooks/useArticles'
import { useStore } from '../../hooks/useStore'
// import Loader from '../../components/common/Loader/Loader'
import './ArticlePage.scss'

export const ArticlePage = () => {
  const { blog } = useStore()
  return (
    <>
      {
        blog !== null &&
          <div className="current-article">
            <SubTitle>{blog.title}</SubTitle>
            <div className="current-article__body">
              <p className="img-block">
                <img src={blog.img} alt="" />
              </p>
              {blog.article.split(' ~ ').map(textBlog => (
                <ArticleText key={textBlog}>{textBlog}</ArticleText>
              ))}
            </div>
          </div>
      }
    </>
  )
}