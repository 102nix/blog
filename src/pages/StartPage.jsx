import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { useStore } from '../hooks/useStore'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  blog: {
    padding: '20px',
    marginBottom: theme.spacing(4),
    border: '1px solid #fff',
    borderRadius: '2px',
    boxShadow: '1px 3px 7px 5px #64678b'
  },
  imgBlock: {
    maxWidth: '550px',
    margin: '0 auto',
    maxHeight: '300px',
    overflow: 'hidden',
    p: 2
  },
  img: {
    maxWidth: '100%'
  },
  text: {
    maxWidth: '550px',
    margin: 'auto'
  }
}))

export const StartPage = () => {
  const { startInfo } = useStore()
  const classes = useStyles()
  return (
    <div>
      <SubTitle>О Frontend&apos;е...</SubTitle>
      {startInfo?.map(blog => (
        <div key={blog.img} className={classes.blog}>
          <div className={classes.imgBlock}>
            <img className={classes.img} src={blog.img} alt=""/>
          </div>
          <Typography variant="h6" gutterBottom component="div" className={classes.title}>
            {blog.text.split(' ')[0]}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div" className={classes.text}>
            {blog.text}
          </Typography>
        </div>
      ))}
    </div>
  )
}