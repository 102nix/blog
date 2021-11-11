import React from 'react'
import { ArticleText } from '../../components/common/typografy/ArticleText/ArticleText'
import { LinkBack } from '../../components/common/typografy/LinkBack/LinkBack'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import { useArticles } from '../../hooks/useArticles'
// import Loader from '../../components/common/Loader/Loader'
import './ArticlePage.scss'

export const ArticlePage = () => {
  const { blog } = useArticles()
  console.log('BLOG: ', blog)
  return (
    <>
      {
        blog !== undefined &&
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
            <LinkBack />
          </div>
      }
    </>
  )
}