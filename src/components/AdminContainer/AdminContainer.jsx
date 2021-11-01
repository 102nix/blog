import React from 'react'
import { columns } from '../../static/sortData'
import { AdminAllPage } from '../../pages/AdminAllPage/AdminAllPage'
import { withAllAdmin } from './withAllAdmin'

export const AdminContainer = () => {
  const AdminComponent = withAllAdmin(AdminAllPage)
  return (<AdminComponent columns={columns}/>
  )
}