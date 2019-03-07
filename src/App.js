import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from './redux/store';

// SCSS
import './scss/reset.scss';

// Layout
import Login from './layouts/Login';
import Dashboard from './layouts/Dashboard';

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
  },
  typography: {
    useNextVariants: true,
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div className="App">
              <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/dashboard/main" component={Dashboard} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/dashboard/profile" component={Dashboard} exact />
                <Route path="/dashboard/notifications" component={Dashboard} exact />
                <Redirect from="/" to="/dashboard/main" />
              </Switch>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
