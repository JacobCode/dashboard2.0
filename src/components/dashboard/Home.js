import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Div100vh from 'react-div-100vh';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';

import spinner from '../../images/spinner.svg';

import { loginUser } from '../../redux/actions/actions';

import '../../scss/Home.scss';

// const API_URL = 'https://modern-dashboard.herokuapp.com';
const API_URL = 'http://localhost:3001';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			showSignIn: true,
			user: '',
			first_name: '',
			last_name: '',
			email: 'jacxbcarver@gmail.com',
			password: 'jacob',
			registerEmail: '',
			registerPassword: '',
			registerConfirm: '',
			registerFName: '',
			registerLName: '',
			message: '',
			error: '',
			loading: false
		}
		this.changeForm = this.changeForm.bind(this);
		this.firstNameInput = this.firstNameInput.bind(this);
		this.lastNameInput = this.lastNameInput.bind(this);
		this.passwordInput = this.passwordInput.bind(this);
		this.emailInput = this.emailInput.bind(this);
		this.registerEmailInput = this.registerEmailInput.bind(this);
		this.registerPasswordInput = this.registerPasswordInput.bind(this);
		this.registerFName = this.registerFName.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.registerFName = this.registerFName.bind(this);
		this.registerLName = this.registerLName.bind(this);
		this.useDemo = this.useDemo.bind(this);
	}
	changeForm() {
		this.setState({ showSignIn: !this.state.showSignIn });
	}
	firstNameInput(e) {
		this.setState({ first_name: e.target.value });
	}
	lastNameInput(e) {
		this.setState({ last_name: e.target.value });
	}
	passwordInput(e) {
		this.setState({ password: e.target.value });
	}
	emailInput(e) {
		this.setState({ email: e.target.value });
	}
	registerEmailInput(e) {
		this.setState({ registerEmail: e.target.value });
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
		// Header
		let config = {
			headers: {
				authorization: 'authorization',
			}
		}
		// Prevent Default
		if (e !== undefined) {
			e.preventDefault();
		}
		// Set Loading
		this.setState({ loading: true });
		// New User Object
		const newUser = {
			first_name: this.state.registerFName,
			last_name: this.state.registerLName,
			email: this.state.registerEmail,
			password: this.state.registerPassword
		}
		// Request
		axios.post(`${API_URL}/account/register`, newUser, config).then((res) => {
			if (res.status === 200) {
				this.setState({ message: 'Registration Successful!', loading: false });
				setTimeout(() => {
					window.location.pathname = '/'
				}, 750);
			}
			if (res.status === 201) {
				this.setState({ error: res.data, loading: false });
				setTimeout(() => { this.setState({ error: '' }) }, 5500);
			}
		}).catch((err) => {
			if (typeof (err.response) === 'object') {
				if (err.response.status === 429) {
					this.setState({ error: err.response.data });
					setTimeout(() => { this.setState({ error: '' }) }, 5500);
				}
				if (err.response.status === 404) {
					this.setState({ message: 'Registration Successful!', loading: false });
					setTimeout(() => {
						this.setState({ message: '' });
					}, 750);
				}
			}
		});
	}
	handleLogin(e) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.setState({ loading: true });
		const login = {
			email: this.state.email.toLowerCase(),
			password: this.state.password
		}
		axios.post(`${API_URL}/account/login`, login)
			.then((res) => {
				this.props.loginUser(res.data);
				// If login successful
				if (res.status === 200) {
					this.setState({ message: `Welcome, ${res.data.email}`, loading: false});
					try {
						localStorage.setItem('user', JSON.stringify(res.data));
					} catch(e) {
						console.log("Please Enable Cookies");
					}
					setTimeout(() => {
						window.location.pathname = '/dashboard'
					}, 750);
				}
				// If login error
				if (res.status === 201) {
					this.setState({ error: res.data.error, loading: false});
					setTimeout(() => {
						this.setState({ error: '' });
					}, 5500);
				}
			}).catch((err) => {
				if (err.response !== undefined) {
					this.setState({ error: 'Too many attempts, please try again later', loading: false });
					setTimeout(() => {
						this.setState({ error: '' });
					}, 5500)
				}
			});
	}
	useDemo() {
		this.setState({ email: 'guest', password: 'guest1' });
		setTimeout(() => { this.handleLogin(); }, 500);
	}
	render() {
		return (
			<Div100vh id="home">
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
										label="Email"
										required
										type="email"
										value={this.state.email}
										onChange={this.emailInput}
									/>
									<TextField
										value={this.state.password}
										onChange={this.passwordInput}
										label="Password"
										type="password"
										required
									/>
									<p onClick={this.useDemo} className="demo">Use Demo Account</p>
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
										label="Email"
										required
										type="text"
										onChange={this.registerEmailInput}
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
							{this.state.loading === true ? <img id="spinner" src={spinner} alt="Loading..." /> : null}
					</div>

					<div className="right">
						<img src="https://i.postimg.cc/ncsYRQnW/dashboard-lg.png" alt="Dashboard Preview" />
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
			</Div100vh>
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