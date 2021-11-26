import React from 'react'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import { useStore } from '../../hooks/useStore'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import './StartPage.scss'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  blog: {
    padding: '20px',
    marginBottom: '10px',
    border: '1px solid #3f51b5',
    borderRadius: '5px',
    boxShadow: '1px 3px 5px #3f51b5'
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
    <Box sx={{ pl: 2, pr: 2, color: '#3f51b5' }}>
      <SubTitle>Статьи, посвещенные Frontend-у: ReactJS, JS, ...</SubTitle>
      {startInfo.map(blog => (
        <div key={blog.img} className={classes.blog}>
          <div className={classes.imgBlock}>
            <img className={classes.img} src={blog.img} alt=""/>
          </div>
          <Typography variant="h6" className={classes.title}>
            {blog.text.split(' ')[0]}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div" className={classes.text}>
            {blog.text}
          </Typography>
        </div>
      ))}
    </Box>
    // <div className="start-container">
    //   <SubTitle>Статьи, посвещенные Frontend-у: ReactJS, JS, ...</SubTitle>
    //   <div className="start-container__body">
    //     {startInfo.map(blog => (
    //       <div key={blog.img} className="start-container__body-line">
    //         <div className="img-block">
    //           <img src={blog.img} alt="" />
    //         </div>
    //         <div className="text-block">{blog.text}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}