import React from 'react'
import { Route } from 'react-router-dom'
import { NavbarContainer } from './components/NavbarContainer/NavbarContainer'
// import { StartContainer } from './components/StartContainer/StartContainer'
import { Auth } from './layouts/Auth/Auth'
import { AdminContainer } from './components/AdminContainer/AdminContainer'
import { ArticlesContainer } from './components/ArticlesContainer/ArticlesContainer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { useAuth } from './hooks/useAuth'
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StateProvider } from './hooks/useStore'
import { StartPage } from './pages/StartPage/StartPage'
import { Container } from '@material-ui/core'

function App () {
  const { isAuth } = useAuth()
  return (
    <>
      <StateProvider>
        <>
          <NavbarContainer />
          <Container maxWidth="md">
            <Route exact path='/' component={StartPage} />
            <Route path='/articles/:articleId?' component={ArticlesContainer} />
            <Route path='/auth/:type?' component={Auth} />
            {/* <Route path='/admin' component={AdminContainer} /> */}
            <ProtectedRoute path='/admin' component={AdminContainer} auth={isAuth} />
          </Container>
        </>
      </StateProvider>
      <ToastContainer />
    </>
  )
}

export default App