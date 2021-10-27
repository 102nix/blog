import React from 'react'
//static data:
import { columns } from '../../static/sortData'
import { AdminAllPage } from '../../pages/AdminAllPage/AdminAllPage'
import { withAllAdmin } from './withAllAdmin'
import './AdminManageArticles.scss'

export const AdminContainer = () => {

  const AdminComponent = withAllAdmin(AdminAllPage)

  return (<AdminComponent columns={columns}/>)
}