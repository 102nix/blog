import React from 'react'
import PropTypes from 'prop-types'
//images:
import DeletePNG from '../../assets/imgs/delete1x.png'
import EditPNG from '../../assets/imgs/edit1x.png'

export const TableBody = ({ data, columns, onDelete, onEdit }) => {

  return (
    <tbody>
      {data.map(item => <tr key={item.id}>
        {Object.keys(columns).map(column => (
          column === 'edit' ? (
            <td 
              className="action-td"
              onClick={() => onEdit(item.id)}
              key={column}
            >
              <img src={EditPNG} alt=''/>
            </td>
          ) : column === 'delete' ? (
            <td 
              className="action-td"
              onClick={() => onDelete(item.id)}
              key={column}
            >
              <img src={DeletePNG} alt=''/>
            </td>    
          ) : (
            <td key={column}>
              {item[column]}
            </td>
          )
        ))}
      </tr>)}
    </tbody>
  )
}

TableBody.protoTypes={
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
}