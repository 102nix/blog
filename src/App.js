import React from 'react'
import { Route } from 'react-router-dom'
import { NavbarContainer } from './components/NavbarContainer/NavbarContainer'
import { StartContainer } from './components/StartContainer/StartContainer'
import { Auth } from './layouts/Auth/Auth'
import { AdminContainer } from './components/AdminContainer/AdminContainer'
import { ArticlesContainer } from './components/ArticlesContainer/ArticlesContainer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import useAuth from './hooks/useAuth'
import './App.scss'

function App () {
  const [isAuth, login, logout] = useAuth(false)

  console.log(isAuth)
  return (
    <div className="container">
      <NavbarContainer auth={isAuth} logout={logout} />
      <div className="content">
        <Route exact path='/' component={StartContainer} />
        <Route path='/articles/:articleId?' component={ArticlesContainer} />
        <Route path='/auth/:type?' render={() => <Auth login={login} />} />
        {/* <Route path='/admin' component={AdminContainer} /> */}
        <ProtectedRoute path='/admin' component={AdminContainer} auth={isAuth} />
      </div>
    </div>
  )
}

export default App