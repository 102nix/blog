import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ auth, currentUser, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth && currentUser === 'adminBlog') return <Component {...props} />
        if (!auth || currentUser !== 'adminBlog') return <Redirect to="/auth/login" />
      }}
    />
  )
}