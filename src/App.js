import React from 'react'
import { Route } from 'react-router-dom'
// import { NavbarContainer } from './components/NavbarContainer/NavbarContainer'
// import { StartContainer } from './components/StartContainer/StartContainer'
import { Auth } from './layouts/Auth/Auth'
import { AdminContainer } from './components/AdminContainer/AdminContainer'
import { ArticlesContainer } from './components/ArticlesContainer/ArticlesContainer'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import useAuth from './hooks/useAuth'
import './App.scss'
import { DataContext } from './components/common/DataContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StateProvider } from './hooks/useStore'
import { StartPage } from './pages/StartPage/StartPage'
import { NavbarProvider } from './hooks/useNavbar'
import { NavbarComponent } from './layouts/NavbarComponent/NavbarComponent'

function App () {
  const [isAuth, login, logout] = useAuth(JSON.parse(localStorage.getItem('login')) || false)

  console.log(isAuth, typeof JSON.parse(localStorage.getItem('login')), JSON.parse(localStorage.getItem('login')))
  return (
    <div className="container">
      <DataContext.Provider value = {{ isAuth, login, logout }}>
        <StateProvider>
          <NavbarProvider>
            <NavbarComponent />
          </NavbarProvider>
          <div className="content">
            <Route exact path='/' component={StartPage} />
            <Route path='/articles/:articleId?' component={ArticlesContainer} />
            <Route path='/auth/:type?' component={Auth} />
            {/* <Route path='/admin' component={AdminContainer} /> */}
            <ProtectedRoute path='/admin' component={AdminContainer} auth={isAuth} />
          </div>
        </StateProvider>
      </DataContext.Provider>
      <ToastContainer />
    </div>
  )
}

export default App