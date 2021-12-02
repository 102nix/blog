import React from 'react'
import { AdminProvider } from '../hooks/useAdmin'
import { AdminAllPage } from '../pages/AdminAllPage'

export const AdminContainer = () => {
  return (
    <AdminProvider>
      <AdminAllPage />
    </AdminProvider>
  )
}