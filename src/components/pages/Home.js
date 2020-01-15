import React, { Component } from 'react';
import axios from 'axios';
import Div100vh from 'react-div-100vh';
import validator from 'email-validator';

// MUI
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';

// Loading Spinner
import spinner from '../../images/spinner.svg';

// API URL
const API_URL = 'https://modern-dashboard.herokuapp.com';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			showSignIn: true,
			user: '',
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			registerEmail: '',
			registerPassword: '',
			registerConfirm: '',
			registerFName: '',
			registerLName: '',
			passwordStrength: 'weak',
			message: '',
			error: '',
			loading: false,
			cookiesEnabled: false,
			showPassword: false
		}
		this.changeForm = this.changeForm.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.toggleShowPassword = this.toggleShowPassword.bind(this);
		this.useDemo = this.useDemo.bind(this);
	}
	changeForm() {
		this.setState({ showSignIn: !this.state.showSignIn, showPassword: false, first_name: '', last_name: '', email: '', password: '', registerEmail: '', registerConfirm: '', registerFName: '', registerLName: '', registerPassword: '' });
	}
	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name === 'registerPassword') {
			this.validatePassword(e.target.value);
		}
	}
	handleSignUp(e) {
		if (e) {
			e.preventDefault();
		}

		// If email is not valid, show error
		if (validator.validate(this.state.registerEmail) === false) {
			this.setState({ error: 'Please enter a valid email' });
			setTimeout(() => {
				this.setState({ error: '' });
			}, 5500);
		}

		// If email is valid
		if (validator.validate(this.state.registerEmail)) {
			// Header
			let config = {
				headers: {
					authorization: 'authorization',
				}
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
			axios.post(`${API_URL}/account/register`, newUser, config)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						this.setState({ message: 'Registration successful!', loading: false, showSignIn: true });
						setTimeout(() => { this.setState({ message: '' }) }, 5500);
					}
					if (res.status === 201) {
						this.setState({ error: res.data.error, loading: false });
						setTimeout(() => { this.setState({ error: '' }) }, 5500);
					}
				})
				.catch((err) => {
					console.log(err);
					if (typeof (err.response) === 'object') {
						if (err.response.status === 429) {
							this.setState({ error: err.response.data, loading: false });
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
	}
	handleLogin(e) {
		if (e !== undefined) {
			e.preventDefault();
		}
		this.setState({ loading: true, error: '' });
		const login = {
			email: this.state.email.toLowerCase(),
			password: this.state.password
		}
		axios.post(`${API_URL}/account/login`, login)
			.then((res) => {
				// If login successful
				if (res.status === 200) {
					this.setState({ message: `Welcome, ${res.data.first_name.charAt(0).toUpperCase() + res.data.first_name.substr(1)}`, loading: false});
					setTimeout(() => {
						this.props.loginUser(res.data);
						window.location.pathname = '/';
					}, 1000);
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
						this.setState({ error: '', loading: false });
					}, 5500)
				}
			});
	}
	validatePassword(password) {
		var medium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		var strong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		var isMediumStrength = medium.test(password);
		var isStrongStrength = strong.test(password)
		
		// If password is weak
		if (isMediumStrength === false && isStrongStrength === false) {
			this.setState({ passwordStrength: 'weak' });
		}
		// If password is medium
		if (isMediumStrength === true && isStrongStrength === false) {
			this.setState({ passwordStrength: 'medium' });
		}
		if (isStrongStrength) {
			this.setState({ passwordStrength: 'strong' });
		}
	}
	useDemo() {
		if (this.state.cookiesEnabled === true) {
			this.setState({ email: 'guestuser@ethereal.email', password: 'guestuser1' });
			setTimeout(() => { this.handleLogin(); }, 500);
		} else {
			
		}
	}
	toggleShowPassword() {
		this.setState({ showPassword: !this.state.showPassword });
	}
	UNSAFE_componentWillMount() {
		if (navigator.cookieEnabled === false) {
			this.setState({ error: 'Please enable cookies', cookiesEnabled: false });
		}
		if (navigator.cookieEnabled === true) {
			this.setState({ cookiesEnabled: true, error: '' });
		}
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
										type="email"
										value={this.state.email}
										onChange={this.handleInputChange}
										name="email"
										required
									/>
									<FormControl>
										<InputLabel htmlFor="signup-adornment-password">Password</InputLabel>
										<Input
											id="signup-adornment-password"
											value={this.state.password}
											onChange={this.handleInputChange}
											type={this.state.showPassword ? 'text' : 'password'}
											name="password"
											endAdornment={
												<InputAdornment position="end">
													{this.state.showPassword ? <VisibilityIcon onClick={this.toggleShowPassword} /> : <VisibilityOffIcon onClick={this.toggleShowPassword} />}
												</InputAdornment>
											}
											required
										/>
									</FormControl>
									<p onClick={this.useDemo} className="demo">Use Demo Account</p>
									<Button type="submit" color="primary" variant="contained" disabled={!this.state.cookiesEnabled}>Login</Button>
								</form>
							</div>
							:
							<div id="signup">
								<h1>Create An Account</h1>
								<form onSubmit={this.handleSignUp}>
									<TextField
										onChange={this.handleInputChange}
										className="input fNameInput"
										label="First Name"
										type="text"
										name="registerFName"
										required
									/>
									<TextField
										onChange={this.handleInputChange}
										label="Last Name"
										type="text"
										name="registerLName"
										required
									/>
									<TextField
										onChange={this.handleInputChange}
										label="Email"
										name="registerEmail"
										required
										type="text"
									/>
									<FormControl>
										<InputLabel htmlFor="signup-adornment-password">Password</InputLabel>
										<Input
											id="signup-adornment-password"
											onChange={this.handleInputChange}
											type={this.state.showPassword ? 'text' : 'password'}
											name="registerPassword"
											endAdornment={
												<InputAdornment position="end">
													{this.state.showPassword ? <VisibilityIcon onClick={this.toggleShowPassword} /> : <VisibilityOffIcon onClick={this.toggleShowPassword} />}
												</InputAdornment>
											}
											required
										/>
									</FormControl>
									{this.state.registerPassword.length >= 1 ? 
									<div className="password-strength">
										<div className="bars">
											<span className={`${this.state.passwordStrength === 'weak' || this.state.passwordStrength === 'medium' || this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
											<span className={`${this.state.passwordStrength === 'medium' || this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
											<span className={`${this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
										</div>
										<p>{this.state.passwordStrength}</p>
									</div> : null}
									<Button type="submit" color="primary" variant="contained" disabled={!this.state.cookiesEnabled}>Register</Button>
								</form>
							</div>}
							{this.state.loading === true ? <img id="spinner" src={spinner} alt="Loading..." /> : null}
					</div>

					<div className="right">
						<img src="https://i.postimg.cc/hvkF4HCt/dashboard-lg-1.jpg" alt="Dashboard Preview" />
					</div>

					{/* Error Snackbar */}
					<Snackbar className="fixed-snackbar"
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						open={this.state.error.length > 0 ? true : false}
					>
						<SnackbarContent className="sn-bar error-snackbar"
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
						<SnackbarContent className="sn-bar success-snackbar"
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

export default Home;