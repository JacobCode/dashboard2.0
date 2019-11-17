import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dashBoardRoutes from '../routes';

// Redux Functions
import { loginUser } from '../redux/actions/actions';

// Pages
import Home from '../components/dashboard/Home';
import Main from '../components/dashboard/Main';
import Profile from '../components/dashboard/Profile';
import Notifications from '../components/dashboard/Notifications';
import Tasks from '../components/dashboard/Tasks';
import ManageWidgets from '../components/dashboard/ManageWidgets';

// SCSS
import '../scss/reset.scss';
import '../scss/Dashboard.scss';

// Components
import Sidebar from '../components/dashboard/layout/Sidebar';
import Navbar from '../components/dashboard/layout/Navbar';
import Footer from '../components/dashboard/layout/Footer';

import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends Component {
	constructor() {
		super();
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
		return (
			<div>
				{/* If Signed In */}
				{this.props.user.email !== undefined ? 
				<div id="dashboard" className="App">
				<Sidebar routes={dashBoardRoutes} handleDrawerToggle={this.handleDrawerToggle} closeDrawer={this.closeDrawer} open={this.state.mobileOpen} />
				<div id="main-panel">
					<Navbar handleDrawerToggle={this.handleDrawerToggle} />
					<div className={`loading-container ${this.state.loading === true ? '' : 'hide-loading'}`}>
					<CircularProgress />
					</div>
					<div className="content">
					<div className="container">
						<Switch>
						<Route path={process.env.PUBLIC_URL + '/dashboard'} component={Main} exact />
						<Route path={process.env.PUBLIC_URL + '/dashboard/profile'} component={Profile} exact />
						<Route path={process.env.PUBLIC_URL + '/dashboard/notifications'} component={Notifications} exact />
						<Route path={process.env.PUBLIC_URL + '/dashboard/tasks'} component={Tasks} exact />
						<Route path={process.env.PUBLIC_URL + '/dashboard/manage'} component={ManageWidgets} exact />
						<Redirect from="/*" to="/dashboard" />
						</Switch>
					</div>
					</div>
					<Footer />
				</div>
				</div>
				:
				<div>
					<Switch>
						<Route path={process.env.PUBLIC_URL + '/'} component={Home} exact />
						<Redirect from="/*" to="/" />
					</Switch>
				</div>}
			</div>
		)
	}
}

Dashboard.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	user: state.siteData.user
});

export default connect(mapStateToProps)(Dashboard);