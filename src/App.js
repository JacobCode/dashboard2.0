import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import routes from './routes';

// Pages
import Main from './components/dashboard/Main';
import Profile from './components/dashboard/Profile';
import Notifications from './components/dashboard/Notifications';
import Tasks from './components/dashboard/Tasks';

// SCSS
import './scss/reset.scss';
import './scss/Dashboard.scss';

// Components
import Sidebar from './components/dashboard/layout/Sidebar';
import Navbar from './components/dashboard/layout/Navbar';
import Footer from './components/dashboard/layout/Footer';

// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
  typography: {
    useNextVariants: true,
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      loading: false,
      checked: true
    };
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  closeDrawer = () => {
    this.setState({ mobileOpen: false })
  }
  componentWillMount() {
    this.setState({ loading: true })
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  }
  render() {
    const { loading, checked } = this.state;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div id="dashboard">
              <Sidebar routes={routes}
              handleDrawerToggle={this.handleDrawerToggle}
              closeDrawer={this.closeDrawer}
              open={this.state.mobileOpen} />
              <div id="main-panel">
                  <Navbar handleDrawerToggle={this.handleDrawerToggle} />
                  <div className={`loading-container ${this.state.loading === true ? '' : 'hide-loading'}`}>
                    <CircularProgress />
                  </div>
                  <div className="content">
                    <div className="container">
                      <Route path='/' component={Main} loading={loading} exact />
                      <Route path='/profile' component={Profile} loading={loading} />
                      <Route path='/notifications' component={Notifications} loading={loading} />
                      <Route path='/tasks' component={Tasks} loading={loading} />
                    </div>
                  </div>
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
