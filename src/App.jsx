import { Route } from 'react-router-dom';
// import { NavbarComponent } from './components/NavbarComponent/NavbarComponent'
import { StartContainer } from './components/StartContainer/StartContainer'
import { Auth } from './layouts/Auth/Auth'
import { AdminContainer } from './components/AdminContainer/AdminContainer'
import { ArticlesContainer } from './components/ArticlesContainer/ArticlesContainer'
import { NavbarContainer } from './components/NavbarContainer/NavbarContainer'
import './App.scss'

function App() {
  return (
    <div className="container">
      <NavbarContainer />
      <div className="content">
        <Route exact path='/' component={StartContainer} />
        <Route path='/articles/:articleId?' component={ArticlesContainer} />
        <Route path='/auth/:type?' component={Auth} />
        <Route path='/admin' component={AdminContainer} />
      </div>
    </div>
  )
}

export default App;
