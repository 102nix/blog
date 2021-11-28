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
// import React from 'react'
// import Button from '@mui/material/Button'
// import Snackbar from '@mui/material/Snackbar'
// import IconButton from '@mui/material/IconButton'
// import CloseIcon from '@mui/icons-material/Close'
// import { useAdmin } from '../../hooks/useAdmin'

// export default function SimpleSnackbar () {
//   const { open, setOpen, textSnackBar } = useAdmin()

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return
//     }

//     setOpen(false)
//   }

//   const action = (
//     <React.Fragment>
//       <Button color="secondary" size="small" onClick={handleClose}>
//         Отменить
//       </Button>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={handleClose}
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </React.Fragment>
//   )

//   return (
//     <div>
//       <Snackbar
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         message={textSnackBar}
//         action={action}
//       />
//     </div>
//   )
// }