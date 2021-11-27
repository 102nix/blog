import React from 'react'
// import './InputFile.scss'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  customFileUpload: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
    border: '1px solid #ccc',
    padding: '10px 12px'
  },
  imgBlock: {
    maxWidth: '300px',
    maxHeight: '150px',
    overflow: 'hidden',
    marginBottom: '5px'
  },
  img: {
    maxWidth: '100%'
  },
  file: {
    opacity: '0',
    width: '0.1px',
    height: '0.1px',
    position: 'absolute'
  },
  fileInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileInputLabel: {
    position: 'relative',
    width: '190px',
    height: '50px',
    borderRadius: '10px',
    background: '#ccc',
    border: '1px solid rgb(63, 62, 62)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: '15px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'transform .2s ease-out',
    marginRight: '10px',
    '&:hover': {
      transition: 'all .2s ease-out',
      boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)'
    }
  }
}))

export const InputFile = ({ article, fileUploadInputChange, uploadName, dataUri }) => {
  const classes = useStyles()
  return (
    <Box className={classes.customFileUpload} component="div">
      {article?.img && !dataUri ? (
        <Box className={classes.imgBlock} component="div">
          <img src={article.img} alt="" className={classes.img}/>
        </Box>
      ) : (
        <Box className={classes.imgBlock} component="div">
          <img src={dataUri} alt="" className={classes.img}/>
        </Box>
      )
      }
      <Box className={classes.fileInput} component="div">
        <input
          type="file"
          id="file"
          className={classes.file}
          onChange={(e) => fileUploadInputChange(e)}
        />
        <label htmlFor="file" className={classes.fileInputLabel}>Select file</label>
        <p>{uploadName}</p>
      </Box>
    </Box>
  )
}