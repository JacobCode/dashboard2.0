import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dashboardRoutes from '../routes';

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
	updateBookmarks,
	viewFile,
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
import MediaModal from '../components/layout/MediaModal';
import Footer from '../components/layout/Footer';

import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			mobileOpen: false,
			loading: false,
			checked: true,
			mediaOpen: false
		}
		this.toggleMediaModal = this.toggleMediaModal.bind(this);
	}
	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};
	closeDrawer = () => {
		this.setState({ mobileOpen: false })
	}
	toggleMediaModal(mediaOpen) {
		this.setState({ mediaOpen: mediaOpen })
	}
	UNSAFE_componentWillMount() {
		this.setState({ loading: true });
		this.props.viewFile({});
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false })
		}, 1250);
	}
	render() {
		const {
			history,
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
			viewFile,
			currentFile
		} = this.props;
		return (
			(history) ?
			<div>
				{/* If Signed In */}
				{Object.keys(this.props.user).length > 0 ? 
				<div id="dashboard" className="App">
					<Sidebar logoutUser={logoutUser} user={user} routes={dashboardRoutes} handleDrawerToggle={this.handleDrawerToggle} closeDrawer={this.closeDrawer} open={this.state.mobileOpen} />
					<div id="main-panel">
						<Navbar history={history} logoutUser={logoutUser} user={user} handleDrawerToggle={this.handleDrawerToggle} />
						<div className={`loading-container ${this.state.loading === true ? '' : 'hide-loading'}`}>
							<CircularProgress />
						</div>
						<div className="content">
							<div className="container" style={{opacity: this.state.loading ? 0 : 1}}>
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
										updateBookmarks={updateBookmarks}
										toggleMediaModal={this.toggleMediaModal}
										viewFile={viewFile} />
										}
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
						{currentFile.filename !== undefined && <MediaModal currentFile={currentFile} viewFile={viewFile} mediaOpen={this.state.mediaOpen} toggleMediaModal={this.toggleMediaModal} />}
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
			</div> : <div></div>
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
	viewFile: PropTypes.func.isRequired,
	currentFile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	user: state.siteData.user,
	activeWidgets: state.siteData.activeWidgets,
	weather: state.siteData.weather,
	forecast: state.siteData.forecast,
	currentFile: state.siteData.currentFile
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
	updateBookmarks,
	viewFile
})(withRouter((Dashboard)));