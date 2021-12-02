import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useAdmin } from '../../hooks/useAdmin'

export default function SimpleSnackbar () {
  const { open, handleClose, textSnackBar } = useAdmin()
  const Alert = React.forwardRef(function Alert (props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        { textSnackBar }
      </Alert>
    </Snackbar>
  )
}