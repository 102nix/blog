import React from 'react'
import PropTypes from 'prop-types'
// images:
import downPNG from '../../../assets/imgs/down.png'
import upPNG from '../../../assets/imgs/up.png'
import { TableHead, TableRow, TableCell } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  headTh: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      fontSize: '10px'
    }
  },
  sortHeader: {
    cursor: 'pointer',
    transform: 'scaleX(1)',
    '&:hover': {
      transition: 'all .2s ease',
      transform: 'scaleX(1.05)'
    }
  }
}))

export const TableHeader = ({ onSort, selectedSort, columns }) => {
  const classes = useStyles()
  const handleSort = (path) => {
    if (selectedSort.path === path) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: path, order: 'asc' })
    }
  }

  return (
    <TableHead>
      <TableRow>
        {Object.keys(columns).map(column => (
          <TableCell
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            className={columns[column].path ? `${classes.sortHeader} ${classes.headTh}` : classes.headTh}
          >
            {(columns[column].path === selectedSort.path && selectedSort.order === 'desc') &&
              <div><img src={upPNG} alt=''/></div>
            }
            {(columns[column].path === selectedSort.path && selectedSort.order === 'asc') &&
              <div><img src={downPNG} alt=''/></div>
            }
            {columns[column].name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}