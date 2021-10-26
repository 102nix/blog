import { Route } from 'react-router-dom';
import './App.scss'
import { ArticlesList } from './pages/ArticlesList/ArticlesList';
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent'
import { Main } from './pages/Main/Main'
import { Auth } from './layouts/Auth/Auth'
import { AdminManageArticles } from './pages/AdminManageArticles/AdminManageArticles2'
import { AddArticle } from './pages/AddArticle/AddArticle'

function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <div className="content">
        <Route exact path='/' component={Main} />
        <Route path='/articles/:articleId?' component={ArticlesList} />
        <Route path='/auth/:type?' component={Auth} />
        <Route path='/adminmanagearticles' component={AdminManageArticles} />
        <Route path='/addarticle/' component={AddArticle} />
      </div>
    </div>
  )
}

export default App;
