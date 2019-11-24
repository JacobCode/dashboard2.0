import React, { Component } from 'react';
import axios from 'axios';
import Div100vh from 'react-div-100vh';

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

// SCSS
// import '../../scss/Home.scss';

// API URL
const API_URL = 'http://localhost:3001';

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
		this.firstNameInput = this.firstNameInput.bind(this);
		this.lastNameInput = this.lastNameInput.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.toggleShowPassword = this.toggleShowPassword.bind(this);
		this.useDemo = this.useDemo.bind(this);
	}
	changeForm() {
		this.setState({ showSignIn: !this.state.showSignIn, showPassword: false });
	}

	firstNameInput(e) {
		this.setState({ first_name: e.target.value });
	}
	lastNameInput(e) {
		this.setState({ last_name: e.target.value });
	}

	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name === 'registerPassword') {
			this.validatePassword(e.target.value);
		}
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
				this.setState({ message: 'Registration Successful!', loading: false, showSignIn: true });
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
				// If login successful
				if (res.status === 200) {
					this.setState({ message: `Welcome, ${res.data.first_name}`, loading: false});
					setTimeout(() => {
						this.props.loginUser(res.data);
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
						this.setState({ error: '' });
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
			console.log('weak');
			this.setState({ passwordStrength: 'weak' });
		}
		// If password is medium
		if (isMediumStrength === true && isStrongStrength === false) {
			console.log('medium');
			this.setState({ passwordStrength: 'medium' });
		}
		if (isStrongStrength) {
			console.log('strong');
			this.setState({ passwordStrength: 'strong' });
		}
	}
	useDemo() {
		if (navigator.cookiesEnabled === true) {
			this.setState({ email: 'guest@email.com', password: 'guest1' });
			setTimeout(() => { this.handleLogin(); }, 500);
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
			this.setState({ cookiesEnabled: true });
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

									{/* <TextField
										value={this.state.password}
										onChange={this.handleInputChange}
										label="Password"
										type="password"
										name="password"
										required
									/> */}

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
									<Button type="submit" color="secondary" variant="contained" disabled={!this.state.cookiesEnabled}>Login</Button>
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
											<span className={`${this.state.passwordStrength === 'weak' ? 'active' : ''}`}></span>
											<span className={`${this.state.passwordStrength === 'medium' ? 'active' : ''}`}></span>
											<span className={`${this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
										</div>
										<p>{this.state.passwordStrength}</p>
									</div> : null}
									<Button type="submit" color="secondary" variant="contained" disabled={!this.state.cookiesEnabled}>Register</Button>
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