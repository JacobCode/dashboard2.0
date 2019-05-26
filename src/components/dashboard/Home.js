import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';

import { loginUser } from '../../redux/actions/actions';

import '../../scss/Home.scss';

// https://modern-dashboard.herokuapp.com
const API_URL = '';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			showSignIn: true,
			user: '',
			first_name: '',
			last_name: '',
			user_name: '',
			password: '',
			registerUsername: '',
			registerPassword: '',
			registerConfirm: '',
			registerFName: '',
			registerLName: '',
			message: '',
			error: ''
		}
		this.changeForm = this.changeForm.bind(this);
		this.firstNameInput = this.firstNameInput.bind(this);
		this.lastNameInput = this.lastNameInput.bind(this);
		this.passwordInput = this.passwordInput.bind(this);
		this.userNameInput = this.userNameInput.bind(this);
		this.registerUserNameInput = this.registerUserNameInput.bind(this);
		this.registerPasswordInput = this.registerPasswordInput.bind(this);
		this.registerFName = this.registerFName.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.registerFName = this.registerFName.bind(this);
		this.registerLName = this.registerLName.bind(this);
	}
	changeForm() {
		this.setState({ showSignIn: !this.state.showSignIn });
	}
	firstNameInput(e) {
		if (e.target.value.length < 13) {
			this.setState({ first_name: e.target.value })
		}
	}
	lastNameInput(e) {
		if (e.target.value.length < 13) {
			this.setState({ last_name: e.target.value })
		}
	}
	passwordInput(e) {
		if (e.target.value.length < 13) {
			this.setState({ password: e.target.value })
		}
	}
	userNameInput(e) {
		if (e.target.value.length < 13) {
			this.setState({ user_name: e.target.value })
		}
	}
	registerUserNameInput(e) {
		this.setState({ registerUsername: e.target.value });
	}
	registerPasswordInput(e) {
		this.setState({ registerPassword: e.target.value });
	}
	registerFName(e) {
		this.setState({ registerFName: e.target.value });
	}
	registerLName(e) {
		this.setState({ registerLName: e.target.value });
	}
	handleSignUp(e) {
		e.preventDefault();
		const newUser = {
			first_name: this.state.registerFName,
			last_name: this.state.registerLName,
			username: this.state.registerUsername,
			password: this.state.registerPassword
		}
		axios.post(`${API_URL}/register`, newUser).then((res) => {
			if (res.status === 200) {
				this.setState({ message: 'Registration Successful!' });
				setTimeout(() => {
					window.location.pathname = '/'
				}, 750);
			}
			if (res.status === 201) {
				this.setState({ error: res.data });
				setTimeout(() => { this.setState({ error: '' }) }, 5500);
			}
		}).catch((err) => {
			if (typeof (err.response) === 'object') {
				if (err.response.status === 429) {
					this.setState({ error: err.response.data });
					setTimeout(() => { this.setState({ error: '' }) }, 5500);
				}
				if (err.response.status === 404) {
					this.setState({ message: 'Registration Successful!' });
					setTimeout(() => {
						this.setState({ message: '' });
					}, 750);
				}
			}
		});
	}
	handleLogin(e) {
		e.preventDefault();
		const login = {
			username: this.state.user_name.toLowerCase(),
			password: this.state.password
		}
		axios.post(`${API_URL}/login`, login)
			.then((res) => {
				this.props.loginUser(res.data);
				if (res.status === 200) {
					this.setState({
						message: `Welcome, ${res.data.username}`
					});
					localStorage.setItem('user', JSON.stringify(res.data));
					setTimeout(() => {
						window.location.pathname = '/dashboard'
					}, 750);
				}
				if (res.status === 201) {
					this.setState({ error: res.data });
					setTimeout(() => {
						this.setState({ error: '' });
					}, 5500);
				}
			}).catch((err) => {
				if (err.response !== undefined) {
					this.setState({ error: 'Too many attempts, please try again later' });
					setTimeout(() => {
						this.setState({ error: '' });
					}, 5500)
				}
			});
	}
	render() {
		return (
			<div id="home">
				<div className="sides">

					<div className="left">
						<header>
							<div className="logo">Dashboard</div>
							<div className="toggle" onClick={this.changeForm}>{this.state.showSignIn === true ? 'Sign Up' : 'Sign In'}</div>
						</header>
						{/* If showSignIn is true, show the signin form */}
						{this.state.showSignIn === true ?
							<div id="signin">
								<p className="welcome">Welcome Back!</p>
								<h1>Login To Your Account</h1>
								<form onSubmit={this.handleLogin}>
									<TextField
										label="Username"
										required
										type="text"
										onChange={this.userNameInput}
									/>
									<TextField
										onChange={this.passwordInput}
										label="Password"
										type="password"
										required
									/>
									<Button type="submit" color="secondary" variant="contained">Login</Button>
								</form>
							</div>
							:
							<div id="signup">
								<h1>Create An Account</h1>
								<form onSubmit={this.handleSignUp}>
									<TextField
										onChange={this.registerFName}
										className="input fNameInput"
										label="First Name"
										type="text"
										required
									/>
									<TextField
										onChange={this.registerLName}
										label="Last Name"
										type="text"
										required
									/>
									<TextField
										label="Username"
										required
										type="texts"
										onChange={this.registerUserNameInput}
									/>
									<TextField
										onChange={this.registerPasswordInput}
										label="Password"
										type="password"
										required
									/>
									<Button type="submit" color="secondary" variant="contained">Register</Button>
								</form>
							</div>}
					</div>

					<div className="right">
					</div>

					{/* Error Snackbar */}
					<Snackbar className="fixed-snackbar"
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						open={this.state.error.length > 0 ? true : false}
					>
						<SnackbarContent className="sn-bar" id="error-snackbar"
							aria-describedby="error-snackbar"
							message={
								<span>
									{this.state.error}
									<ErrorIcon />
								</span>
							}
						/>
					</Snackbar>
					{/* Success Snackbar */}
					<Snackbar className="fixed-snackbar"
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						open={this.state.message.length > 0 ? true : false}
					>
						<SnackbarContent className="sn-bar" id="success-snackbar"
							aria-describedby="success-snackbar"
							message={
								<span>
									{this.state.message}
									<CheckCircleIcon />
								</span>
							}
						/>
					</Snackbar>
				</div>
			</div>
		)
	}
}

Home.propTypes = {
	user: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.siteData.user
});

export default connect(mapStateToProps, { loginUser })(Home);