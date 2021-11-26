import React from 'react'
import { ArticleText } from '../../components/common/typografy/ArticleText/ArticleText'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import { useStore } from '../../hooks/useStore'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  currentArticle: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  currentArticleBody: {
    padding: '25px',
    backgroundColor: 'rgb(49, 49, 77)',
    boxShadow: '2px 3px 45px rgb(49, 49, 77)'
  },
  imgBlock: {
    boxShadow: '2px 3px 5px rgb(73, 73, 121)',
    maxWidth: '300px',
    maxHeight: '150px',
    overflow: 'hidden',
    float: 'left',
    margin: '15px 20px 7px 0'
  },
  img: {
    maxWidth: '100%'
  }
}))

export const ArticlePage = () => {
  const { blog } = useStore()
  const classes = useStyles()
  return (
    <>
      {
        blog !== null &&
          <Box className={classes.currentArticle}>
            <SubTitle>{blog.title}</SubTitle>
            <div className={classes.currentArticleBody}>
              <div className={classes.imgBlock}>
                <img src={blog.img} alt="" className={classes.img} />
              </div>
              {blog.article.split(' ~ ').map(textBlog => (
                <ArticleText key={textBlog}>{textBlog}</ArticleText>
              ))}
            </div>
          </Box>
      }
    </>
  )
}