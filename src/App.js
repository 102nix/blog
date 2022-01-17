import React from 'react'
import { Route } from 'react-router-dom'
import { NavbarComponent } from './layouts/NavbarComponent'
import { Auth } from './layouts/Auth'
import { AdminAllPage } from './pages/AdminAllPage'
import { ArticlesContainer } from './layouts/ArticlesContainer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { useAuth } from './hooks/useAuth'
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StartPage } from './pages/StartPage'
import { Container } from '@material-ui/core'
import { FooterPage } from './layouts/FooterPage'
import { AppLoader } from './components/ui/hoc/AppLoader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'md',
    minHeight: 'calc(100vh - 100px)'
  }

}))
function App () {
  const { isAuth, currentUser } = useAuth()
  // const location = useLocation()
  const classes = useStyles()
  return (
    <>
      <AppLoader>
        <>
          <NavbarComponent />
          <Container className={classes.root}>
            <Route exact path='/' component={StartPage} />
            <Route path='/articles/:articleId?' component={ArticlesContainer} />
            <Route path='/auth/:type?' component={Auth} />
            {/* <Route path='/admin' component={AdminContainer} /> */}
            <ProtectedRoute path='/admin' component={AdminAllPage} auth={isAuth} currentUser={currentUser} />
          </Container>
          <FooterPage />
          {/* {
            (location.pathname === '/articles' || location.pathname === '/') && <FooterPage />
          } */}
        </>
      </AppLoader>
      <ToastContainer />
    </>
  )
}

export default App