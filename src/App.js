import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Link, Route} from "react-router-dom"

import Navbar from './components/navbar';
import Home from './pages/Home';
import Class from './pages/Class';
import A1 from './pages/A1';
import A2 from './pages/A2';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {

  return (
      <Router basename="/react-parcel-starter">
        <Navbar />
        <div>
          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/class' component={Class}/>
            <Route path='/a1' component={A1}/>
            <Route path='/a2' component={A2}/>
            <Route exact path='/' component={Home}/>
          </Switch>
        </div>
      </Router>
    )
};

export default App;
