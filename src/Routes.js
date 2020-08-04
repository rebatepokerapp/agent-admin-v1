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
import RakeFigures from './components/RakeFigures';
import Agents from './components/Agents';
import Players from './components/Players';
import Transactions from './components/Transactions';
import Accounting from './components/Accounting';
import Settings from './components/Settings';
import Logout from './components/Logout';

function Routes () {  
  return (
    <Router>
      <Switch>        
        <Route path="/dashboard">
          <Players />
        </Route>
        <Route path="/" exact>
          <Signin />
        </Route>
      </Switch>
    </Router>
  );
}

function RoutesMain () {  
  return (
    <Router>
      <Switch>        
        <Route path="/rakefigures">
          <RakeFigures />
        </Route>
        <Route path="/agents">
          <Agents />
        </Route>
        <Route path="/players">
          <Players />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/accounting">
          <Accounting />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
}

export {
  Routes,
  RoutesMain
};

