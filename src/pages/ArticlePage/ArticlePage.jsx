import React from 'react'
import { NavLink } from 'react-router-dom'
import list2xPng from '../../assets/imgs/list2x.png'
import { ArticleText } from '../../components/common/typografy/ArticleText/ArticleText'
import { LinkBack } from '../../components/common/typografy/LinkBack/LinkBack'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import './ArticlePage.scss'

export const ArticlePage = ({ blog }) => {

  return (
    <div className="current-article">
      <SubTitle>{blog.title}</SubTitle>
      <div className="current-article__body">
        <p className="img-block">
          <img src={blog.img} alt="" />
        </p>
        {blog.article.split(' ~ ').map(textBlog => (
          <ArticleText>{textBlog}</ArticleText>
        ))}
      </div>
      <LinkBack />
  </div>)
}