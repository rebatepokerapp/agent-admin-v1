import React from 'react';
//Importacion de la libreria para el ROUTING
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
//Importacion de los componentes
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

function Routes () {  
  return (
    <Router>
      <Switch>        
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/" exact>
          <Signin />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;

