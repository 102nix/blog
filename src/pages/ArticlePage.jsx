import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { goArticlesListPage } from '../store/articles'
import { Comments } from '../components/Comments'
import { Markup } from 'interweave'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  currentArticleBody: {
    padding: '25px',
    backgroundColor: 'rgb(103 103 235)',
    boxShadow: '2px 3px 25px rgb(49, 49, 77)',
    color: '#fff',
    textIndent: '1.5em'
  },
  imgBlock: {
    maxWidth: '300px',
    maxHeight: '150px',
    overflow: 'hidden',
    float: 'left',
    marginTop: '4px',
    marginRight: theme.spacing(2),
    marginLeft: '-20px'
  },
  img: {
    maxWidth: '100%'
  },
  btnBack: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}))

export const ArticlePage = ({ blog }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const backToArticles = () => {
    dispatch(goArticlesListPage())
    history.push('/articles')
  }
  return (
    <div className={classes.root}>
      <SubTitle>{blog[0].title}</SubTitle>
      <div className={classes.currentArticleBody}>
        <div className={classes.imgBlock}>
          <img src={blog[0].img} alt="" className={classes.img} />
        </div>
        {blog[0].article.split(' ~ ').map((textBlog, i) => (
          // <Typography variant="body1" gutterBottom key={textBlog}>{textBlog.replace(/<[^>]+>/g, '')}</Typography>
          <Typography variant="body1" gutterBottom key={i}>
            <Markup content={textBlog} />
          </Typography>
        ))}
      </div>
      <Comments blog={blog}/>
      <Button size="medium" color="primary" className={classes.btnBack} onClick={backToArticles}>
        Назад
      </Button>
    </div>
  )
}