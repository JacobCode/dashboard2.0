import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dashBoardRoutes from '../routes';

// Redux Functions
import {
	loginUser,
	logoutUser,
	setWidgets,
	updateTasks,
	getUserFiles,
	uploadFile,
	deleteFile,
	getWeather,
	getForecast,
	updateNotifications,
	updateBookmarks
} from '../redux/actions/actions';

// Pages
import Home from '../components/pages/Home';
import Main from '../components/pages/Main';
import Profile from '../components/pages/Profile';
import Notifications from '../components/pages/Notifications';
import Tasks from '../components/pages/Tasks';
import ManageWidgets from '../components/pages/ManageWidgets';

// Components
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// SCSS
import '../scss/main.scss';

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
	UNSAFE_componentWillMount() {
		this.setState({ loading: true })
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false })
		}, 1000)
	}
	render() {
		const {
			user,
			activeWidgets,
			weather,
			forecast,
			loginUser,
			logoutUser,
			setWidgets,
			updateTasks,
			getUserFiles,
			uploadFile,
			deleteFile,
			getWeather,
			getForecast,
			updateNotifications,
			updateBookmarks,
		} = this.props;
		return (
			<div>
				{/* If Signed In */}
				{Object.keys(this.props.user).length > 0 ? 
				<div id="dashboard" className="App">
					<Sidebar logoutUser={logoutUser} user={user} routes={dashBoardRoutes} handleDrawerToggle={this.handleDrawerToggle} closeDrawer={this.closeDrawer} open={this.state.mobileOpen} />
					<div id="main-panel">
						<Navbar logoutUser={logoutUser} user={user} handleDrawerToggle={this.handleDrawerToggle} />
						<div className={`loading-container ${this.state.loading === true ? '' : 'hide-loading'}`}>
							<CircularProgress />
						</div>
						<div className="content">
							<div className="container">
								<Switch>
									{/* Widget Grid */}
									<Route path={process.env.PUBLIC_URL + '/dashboard'} render={() => <Main 
										user={user}
										weather={weather}
										forecast={forecast}
										activeWidgets={activeWidgets}
										setWidgets={setWidgets}
										updateTasks={updateTasks}
										getUserFiles={getUserFiles}
										uploadFile={uploadFile}
										deleteFile={deleteFile}
										getWeather={getWeather}
										getForecast={getForecast}
										updateNotifications={updateNotifications}
										updateBookmarks={updateBookmarks} />}
									exact />
									{/* Profile */}
									<Route path={process.env.PUBLIC_URL + '/dashboard/profile'} render={() => <Profile 
										user={user}
										logoutUser={logoutUser} />} 
									exact />
									{/* Notifications */}
									<Route path={process.env.PUBLIC_URL + '/dashboard/notifications'} render={() => <Notifications 
										user={user}
										updateNotifications={updateNotifications} />} 
									exact />
									{/* Tasks */}
									<Route path={process.env.PUBLIC_URL + '/dashboard/tasks'} render={() => <Tasks 
										user={user}
										updateTasks={updateTasks} />} 
									exact />
									{/* Manage Widgets */}
									<Route path={process.env.PUBLIC_URL + '/dashboard/manage'} render={() => <ManageWidgets 
										activeWidgets={activeWidgets}
										setWidgets={setWidgets} />} 
									exact />
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
						{/* Home Page */}
						<Route path={process.env.PUBLIC_URL + '/'} render={() => <Home loginUser={loginUser} />} exact />
						<Redirect from="/*" to="/" />
					</Switch>
				</div>}
			</div>
		)
	}
}

Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
	activeWidgets: PropTypes.object.isRequired,
	weather: PropTypes.object.isRequired,
	forecast: PropTypes.array.isRequired,
	loginUser: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	setWidgets: PropTypes.func.isRequired,
	updateTasks: PropTypes.func.isRequired,
	getUserFiles: PropTypes.func.isRequired,
	uploadFile: PropTypes.func.isRequired,
	deleteFile: PropTypes.func.isRequired,
	getWeather: PropTypes.func.isRequired,
	getForecast: PropTypes.func.isRequired,
	updateNotifications: PropTypes.func.isRequired,
	updateBookmarks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.siteData.user,
	activeWidgets: state.siteData.activeWidgets,
	weather: state.siteData.weather,
	forecast: state.siteData.forecast,
});

export default connect(mapStateToProps, {
	loginUser,
	logoutUser,
	setWidgets,
	updateTasks,
	getUserFiles,
	uploadFile,
	deleteFile,
	getWeather,
	getForecast,
	updateNotifications,
	updateBookmarks
})(Dashboard);