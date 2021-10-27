import { Route } from 'react-router-dom';
import './App.scss'
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent'
import { Main } from './pages/Main/Main'
import { Auth } from './layouts/Auth/Auth'
import { AdminManageArticles } from './pages/AdminManageArticles/AdminManageArticles2'
import { AddArticlePage } from './pages/AddArticlePage/AddArticlePage'
import { AllArticles } from './components/Articles/AllArticles'

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <Route exact path='/' component={Main} />
        <Route path='/articles/:articleId?' component={AllArticles} />
        <Route path='/auth/:type?' component={Auth} />
        <Route path='/adminmanagearticles' component={AdminManageArticles} />
        <Route path='/addarticle/' component={AddArticlePage} />
      </div>
    </div>
  )
}

export default App;
