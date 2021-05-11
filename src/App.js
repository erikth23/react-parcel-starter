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
      <Router >
        <Navbar />
        <div>
          <Switch>
            <Route path='/react-parcel-starter/home' component={Home}/>
            <Route path='/react-parcel-starter/class' component={Class}/>
            <Route path='/react-parcel-starter/a1' component={A1}/>
            <Route path='/react-parcel-starter/a2' component={A2}/>
            <Route exact path='/react-parcel-starter/' component={Home}/>
          </Switch>
        </div>
      </Router>
    )
};

export default App;
