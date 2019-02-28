import React, { Component } from 'react';
import routes from '../routes';
import { Switch, Route, Redirect } from "react-router-dom";

// SCSS
import '../scss/Dashboard.scss';

// Components
import Sidebar from '../components/dashboard/layout/Sidebar';
import Navbar from '../components/dashboard/layout/Navbar';
import Footer from '../components/dashboard/layout/Footer';

const logo = "https://jacobcode.github.io/portfolio/images/jacob-cartoon.svg";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.dir === "/dashboard") {
        return (
          <Route
            path={prop.dir + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
    }
    getRoute() {
        return this.props.location.pathname !== "/admin/maps";
    }
    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };
    render() {
        return (
            <div id="dashboard">
                <Sidebar routes={routes}
                logoText={"Jacob Carver"}
                logo={logo}
                handleDrawerToggle={this.handleDrawerToggle}
                open={this.state.mobileOpen} />
                <div id="main-panel">
                    <Navbar handleDrawerToggle={this.handleDrawerToggle} />
                    <div className="content">
                        {this.getRoute() ? (
                            <div className="container">
                                {switchRoutes}
                            </div>
                        ) : (
                            <div>{switchRoutes} style={{border: '10px solid red'}}</div>
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}