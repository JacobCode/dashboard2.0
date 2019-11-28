import React, { Component } from 'react';
import axios from 'axios';

// MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';

// Loading Spinner
import spinner from '../../images/spinner.svg';
import { FormControl } from '@material-ui/core';

// API URL
const API_URL = 'https://modern-dashboard.herokuapp.com';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
			email: '',
			password: '',
			newPassword: '',
			passwordStrength: 'weak',
			deletePassword: '',
			message: '',
			error: '',
			deleteAccount: false,
			loading: false,
			showPassword: false,
			showNewPassword: true,
			showDeletePassword: false
        }
		this.passwordInput = this.passwordInput.bind(this);
		this.newPasswordInput = this.newPasswordInput.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.deletePasswordInput = this.deletePasswordInput.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
		this.togglePassword = this.togglePassword.bind(this);
	}
	passwordInput(e) {
        if (e.target.value.length < 50) {
            this.setState({ password: e.target.value })
        }
	}
	newPasswordInput(e) {
		if (e.target.value.length < 50) {
			this.setState({ newPassword: e.target.value });
			this.validatePassword(e.target.value);
		}
	}
	changePassword(e) {
		e.preventDefault();
		this.setState({ loading: true });
		axios.post(`${API_URL}/user/changepassword`, {
			id: this.props.user._id,
			new: this.state.newPassword,
			old: this.state.password
		})
			.then((res) => {
				if (res.status === 200) {
					this.setState({ message: res.data, email: '', password: '', newPassword: '', loading: false });
					setTimeout(() => { this.setState({ message: '' }) }, 5500);
				}
			})
			.catch((err) => {
				if (err.response.status === 404) {
					this.setState({ error: err.response.data, loading: false });
					setTimeout(() => { this.setState({ error: '' }) }, 5500);
				}
			})
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
	deletePasswordInput(e) {
		this.setState({ deletePassword: e.target.value });
	}
	handleCheckBox() {
		this.setState({ deleteAccount: !this.state.deleteAccount })
	}
	deleteAccount(e) {
		e.preventDefault();
		this.setState({ loading: true });
		axios.delete(`${API_URL}/account/delete/${this.props.user._id}/${this.state.deletePassword}`)
			.then((res) => {
				if (res.status === 200) {
					this.setState({ message: res.data, loading: false });
					setTimeout(() => {
						this.setState({ message: '' });
						this.props.logoutUser();
						window.location.pathname = '/';
					}, 1500);
				}
			})
			.catch((err) => {
				this.setState({ error: err.response.data, loading: false });
				setTimeout(() => {
					this.setState({ error: '' });
				}, 3500);
			});
	}
	togglePassword(type) {
		this.setState({ [type]: !this.state[type] })
	}
    render() {
        const { user } = this.props;
        return (
            <Fade in={true}>
                <div id="profile">
					<h1>Settings</h1>
                    <div className="settings">
						<div className="profile-form">
							<h2>Change Password</h2>
							<form onSubmit={this.changePassword}>
								<TextField
								label="Email"
								value={this.props.user.email}
								InputProps={{readOnly: true}}
								required
								type="text"
								/>
								<FormControl>
									<InputLabel htmlFor="current-password">Current Password *</InputLabel>
									<Input
										id="current-password"
										value={this.state.password}
										onChange={this.passwordInput}
										className="input firstNameInput"
										label="Current Password"
										type={this.state.showPassword ? 'text' : 'password'}
										required
										endAdornment={
											<InputAdornment position="end">
												{this.state.showPassword ? <VisibilityIcon onClick={e => this.togglePassword('showPassword')} /> : <VisibilityOffIcon onClick={e => this.togglePassword('showDeletePassword')} />}
											</InputAdornment>
										}
									/>
								</FormControl>
								<FormControl>
									<InputLabel htmlFor="new-password">New Password *</InputLabel>
									<Input
										id="new-password"
										value={this.state.newPassword}
										onChange={this.newPasswordInput}
										className="input firstNameInput"
										label="New Password"
										type={this.state.showNewPassword ? 'text' : 'password'}
										required
										endAdornment={
											<InputAdornment position="end">
												{this.state.showNewPassword ? <VisibilityIcon onClick={e => this.togglePassword('showNewPassword')} /> : <VisibilityOffIcon onClick={e => this.togglePassword('showDeletePassword')} />}
											</InputAdornment>
										}
									/>
									{this.state.newPassword.length >= 1 ? 
									<div className="password-strength">
										<div className="bars">
											<span className={`${this.state.passwordStrength === 'weak' || this.state.passwordStrength === 'medium' || this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
											<span className={`${this.state.passwordStrength === 'medium' || this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
											<span className={`${this.state.passwordStrength === 'strong' ? 'active' : ''}`}></span>
										</div>
										<p>{this.state.passwordStrength}</p>
									</div> : null}
								</FormControl>

								<FormControl className="form-control">
									<div className="button-container">
										<Button type="submit" color="primary" variant="contained">Submit</Button>
									</div>
								</FormControl>
							</form>
						</div>

						<div className="profile-card">
							<div className="logo">{user.first_name.length === 0 ? 
								`${user.first_name.substr(0, 1).toUpperCase()}${user.last_name.substr(0, 1).toUpperCase()}`
								:
								`${user.first_name.substr(0, 1).toUpperCase()}${this.props.user.last_name.substr(0, 1).toUpperCase()}`}
							</div>
							<span className="username">{user.email.length === 0 ?
								`${user.email}`
								:
								`${user.email}`}
							</span>
							<span className="full-name">{user.first_name.length === 0 ?
								`${user.first_name} ${user.last_name}`
								:
								`${user.first_name} ${this.props.user.last_name}`}
							</span>
						</div>

						<div className="delete-form">
							<h2>Delete Account</h2>
							<form onSubmit={this.deleteAccount}>
								<FormControl>
									<InputLabel htmlFor="delete-account-password">Password *</InputLabel>
									<Input
										id="delete-account-password"
										label="Password"
										value={this.state.deletePassword}
										required
										onChange={this.deletePasswordInput}
										type={this.state.showDeletePassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												{this.state.showDeletePassword ? <VisibilityIcon onClick={e => this.togglePassword('showDeletePassword')} /> : <VisibilityOffIcon onClick={e => this.togglePassword('showDeletePassword')} />}
											</InputAdornment>
										}
									/>
								</FormControl>
								<FormControlLabel
									control={
									<Checkbox
										checked={this.state.deleteAccount}
										onChange={this.handleCheckBox}
										value="delete account"
										color="primary"
										required
									/>
									}
									label="Delete your account and files?"
								/>
								<Button disabled={this.props.user._id === '5ceacc65e852d006964341f2' ? true : false} type="submit" color="primary" variant="contained">Delete Profile</Button>
							</form>
						</div>
					</div>

					{/* Loading Spinner */}
					{this.state.loading === true ? <img id="spinner" src={spinner} alt="Loading..." /> : null}

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
            </Fade>
        )
    }
}

export default Profile;