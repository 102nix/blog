import React from 'react'
import PropTypes from 'prop-types'
// images:
// import DeletePNG from '../../../assets/imgs/delete1x.png'
// import EditPNG from '../../../assets/imgs/edit1x.png'
import { TableBody, TableRow, TableCell, IconButton, Tooltip } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles((theme) => ({
  tdStyle: {
    cursor: 'pointer',
    transform: 'scaleX(1)',
    '&:hover': {
      transition: 'all .4s ease-in-out',
      transform: 'scaleX(1.05)'
    }
  }
}))
export const TblBody = ({ data, columns, onDelete, onEdit }) => {
  const classes = useStyles()
  return (
    <TableBody>
      {data.map(item => <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {Object.keys(columns).map(column => (
          column === 'edit' ? (
            <TableCell
              className={classes.tdStyle}
              onClick={() => onEdit(item.id)}
              key={column}
            >
              <Tooltip title="Edit">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : column === 'delete' ? (
            <TableCell
              onClick={() => onDelete(item.id)}
              key={column}
            >
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : (
            <TableCell key={column}>
              {item[column]}
            </TableCell>
          )
        ))}
      </TableRow>)}
    </TableBody>
  )
}

TableBody.protoTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
}