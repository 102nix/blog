import React from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(style)': { m: 'auto', width: '100%' },
    display: 'flex',
    flexDirection: 'column'
  },
  divActions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))
export const FormTemplate = ({ handleSubmit, isValid, children }) => {
  const classes = useStyles()
  return (
    <form
      component="form"
      className={ classes.root }
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {children}
      <div className={ classes.divActions}>
        <Button
          type="submit"
          disabled={!isValid}
          variant="outlined"
        >
          Войти
        </Button>
        <Button variant="outlined" onClick={() => { history.push('/') }}>Отмена</Button>
      </div>
    </form>
  )
}