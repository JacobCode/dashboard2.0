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

// Loading Spinner
import spinner from '../../images/spinner.svg';

// API URL
const API_URL = 'http://localhost:3001';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
			email: '',
			password: '',
			newPassword: '',
			deletePassword: '',
			message: '',
			error: '',
			deleteAccount: false,
			loading: false
        }
		this.emailInput = this.emailInput.bind(this);
		this.passwordInput = this.passwordInput.bind(this);
		this.newPasswordInput = this.newPasswordInput.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.deletePasswordInput = this.deletePasswordInput.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
	}
	emailInput(e) {
		if (e.target.value.length < 13) {
			this.setState({
				email: e.target.value
			})
		}
	}
	passwordInput(e) {
        if (e.target.value.length < 13) {
            this.setState({ password: e.target.value })
        }
	}
	newPasswordInput(e) {
		if (e.target.value.length < 13) {
			this.setState({
				newPassword: e.target.value
			})
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
								onChange={this.emailInput}
								type="text"
								/>
								<TextField
								value={this.state.password}
								onChange={this.passwordInput}
								className="input firstNameInput"
								label="Current Password"
								type="password"
								required
								/>
								<TextField
								value={this.state.newPassword}
								onChange={this.newPasswordInput}
								className="input firstNameInput"
								label="New Password"
								type="text"
								required
								/>
								<div className="button-container">
									<Button type="submit" color="primary" variant="contained">Submit</Button>
								</div>
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
								<TextField
								label="Password"
								value={this.state.deletePassword}
								required
								onChange={this.deletePasswordInput}
								type="text"
								/>
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