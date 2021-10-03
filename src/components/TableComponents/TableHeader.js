import React from "react"
import PropTypes from "prop-types"
//images:
import downPNG from '../../assets/imgs/down.png'
import upPNG from '../../assets/imgs/up.png'

export const TableHeader = ({ onSort, selectedSort, columns }) => {

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
    <thead>
      <tr>
        {Object.keys(columns).map(column => (
          <th 
            key={column} 
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined} 
            className={columns[column].path && 'sort-header'}
          >
            {(columns[column].path === selectedSort.path && selectedSort.order === 'desc') &&
              <div><img src={upPNG} alt=""/></div>
            }
            {(columns[column].path === selectedSort.path && selectedSort.order === 'asc') &&
              <div><img src={downPNG} alt="" /></div>
            }
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}
