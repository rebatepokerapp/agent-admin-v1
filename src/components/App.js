import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import Signin from './Signin';

// context
import { useUserState } from "./UserContext";

function App() {

  // global
  var { isAuthenticated } = useUserState();

  console.log('AUTENTICACION',isAuthenticated);

  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />       
        <PrivateRoute path="/app" component={Dashboard} />
        <PublicRoute path="/login" component={Signin} />
      </Switch>
    </BrowserRouter>
  );

  function PrivateRoute({ component, ...rest }) {
    console.log('AUTENTICACION',isAuthenticated);
    console.log('PRIVATE COMPONENTEEEEE ',component);
    console.log('PRIVATE RESTTTTTTTTTTTTTT  ',rest);
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    console.log('AUTENTICACION',isAuthenticated);
    console.log('PUBLIC COMPONENTEEEEE ',component);
    console.log('PUBLIC RESTTTTTTTTTTTTTT  ',rest);
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

}

export default App;
