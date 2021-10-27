import { Route } from 'react-router-dom';
import './App.scss'
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent'
import { StartPageComponent } from './components/StartPageComponents/StartPageComponent'
import { Auth } from './layouts/Auth/Auth'
import { AdminManageArticles } from './pages/AdminManageArticles/AdminManageArticles2'
import { AddArticlePage } from './pages/AddArticlePage/AddArticlePage'
import { AllArticlesComponent } from './components/ArticlesComponents/AllArticlesComponent'

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <Route exact path='/' component={StartPageComponent} />
        <Route path='/articles/:articleId?' component={AllArticlesComponent} />
        <Route path='/auth/:type?' component={Auth} />
        <Route path='/adminmanagearticles' component={AdminManageArticles} />
        <Route path='/addarticle/' component={AddArticlePage} />
      </div>
    </div>
  )
}

export default App;
