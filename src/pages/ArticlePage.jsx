import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { goArticlesListPage } from '../store/articles'
import { getComments } from '../store/comments'
import { prepareComments } from '../static/prepareComments'
import Divider from '@mui/material/Divider'

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
  },
  blockComments: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    padding: '10px',
    '& li': {
      listStyleType: 'none',
      marginTop: theme.spacing(3)
    }
  },
  dateComments: {
    fontSize: '12px',
    color: 'grey'
  },
  emailComments: {
    fontSize: '19px'
  }
}))

export const ArticlePage = ({ blog }) => {
  const comments = useSelector(getComments())
  const currentComments = prepareComments(comments, blog[0].id)
  console.log('comments:', comments, currentComments)
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
        {blog[0].article.split(' ~ ').map(textBlog => (
          <Typography variant="body1" gutterBottom key={textBlog}>{textBlog}</Typography>
        ))}
      </div>
      <div className={classes.blockComments}>
        {currentComments?.length > 0 &&
          <>
            <p>Комментарии:</p>
            <ul>
              {currentComments.map(c => ((
                <>
                  <li key={c.id}>
                    <p>
                      <span className={classes.dateComments} >{c.date} </span>
                      <span className={classes.emailComments}>{c.email}, пишет: </span>
                    </p>
                    <p>{c.commentText}</p>
                  </li>
                  <Divider />
                </>
              )))}
            </ul>
          </>
        }
      </div>
      <Button size="medium" color="primary" className={classes.btnBack} onClick={backToArticles}>
        Назад
      </Button>
    </div>
  )
}