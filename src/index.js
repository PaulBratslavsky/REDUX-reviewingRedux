import React from "react";
import { render } from "react-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './redux/configureStore'
import './index.css'

import HomePage from "./pages/home.page.jsx"
import AboutPage from "./pages/about.page.jsx"
import PageNotFound from "./pages/notfound.page.jsx"
import Header from "./components/common/Header/index.jsx"
import CoursesPage from "./pages/courses.page.jsx"
import ManageCourse from "./pages/managecourse.page.jsx"

const store = configureStore()

function App() {
  return <div className="container-fluid"> 
    <Header />
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/courses' component={CoursesPage} />
      <Route path='/course/:slug' component={ManageCourse} />
      <Route path='/course' component={ManageCourse} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
}

render( 
  <ReduxProvider store={store}>
    <Router><App /></Router>
  </ReduxProvider>, document.getElementById("app"));
