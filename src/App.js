import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import routes from './routes';

// SCSS
import './scss/reset.scss';
import './scss/Dashboard.scss';

// Components
import Sidebar from './components/dashboard/layout/Sidebar';
import Navbar from './components/dashboard/layout/Navbar';
import Footer from './components/dashboard/layout/Footer';

// MUI
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

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
    return (
      <Route
        path={prop.path}
        component={prop.component}
        key={key}
      />
    );
  })}
  </Switch>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }
  getRoute() {
    return true;
  }
  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };
  closeDrawer = () => {
    this.setState({
      mobileOpen: false
    })
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div id="dashboard">
                <Sidebar routes={routes}
                logoText={"guest user"}
                handleDrawerToggle={this.handleDrawerToggle}
                closeDrawer={this.closeDrawer}
                open={this.state.mobileOpen} />
                <div id="main-panel">
                    <Navbar handleDrawerToggle={this.handleDrawerToggle} />
                    <div className="content">
                      <div className="container">
                        {switchRoutes}
                      </div>
                    </div>
                    {/* <Redirect from='/' to='/main' /> */}
                    <Footer />
                </div>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
