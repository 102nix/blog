import React from 'react'
import { Route, useLocation } from 'react-router-dom'
import { NavbarComponent } from './layouts/NavbarComponent'
// import { StartContainer } from './components/StartContainer/StartContainer'
import { Auth } from './layouts/Auth'
// import { AdminContainer } from './components/AdminContainer'
import { AdminAllPage } from './pages/AdminAllPage'
import { ArticlesContainer } from './layouts/ArticlesContainer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { useAuth } from './hooks/useAuth'
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { StateProvider } from './hooks/useStore'
import { StartPage } from './pages/StartPage'
import { Container } from '@material-ui/core'
import { FooterPage } from './layouts/FooterPage'
import { AppLoader } from './components/ui/hoc/AppLoader'

function App () {
  const { isAuth, currentUser } = useAuth()
  const location = useLocation()
  return (
    <>
      <AppLoader>
        <>
          <NavbarComponent />
          <Container maxWidth="md">
            <Route exact path='/' component={StartPage} />
            <Route path='/articles/:articleId?' component={ArticlesContainer} />
            <Route path='/auth/:type?' component={Auth} />
            {/* <Route path='/admin' component={AdminContainer} /> */}
            <ProtectedRoute path='/admin' component={AdminAllPage} auth={isAuth} currentUser={currentUser} />
          </Container>
          {
            (location.pathname === '/articles' || location.pathname === '/') && <FooterPage />
          }
        </>
      </AppLoader>
      <ToastContainer />
    </>
  )
}

export default App