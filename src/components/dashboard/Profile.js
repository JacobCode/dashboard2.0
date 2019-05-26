import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { loginUser } from '../../redux/actions/actions';

// SCSS
import '../../scss/Profile.scss';

import axios from 'axios';

const API_URL = 'http://localhost:3001';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
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
		this.userNameInput = this.userNameInput.bind(this);
		this.passwordInput = this.passwordInput.bind(this);
		this.newPasswordInput = this.newPasswordInput.bind(this);
	}
	userNameInput(e) {
		if (e.target.value.length < 13) {
			this.setState({
				user_name: e.target.value
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
				password: e.target.value
			})
		}
	}
    render() {
        const { user } = this.props;
        return (
            <Fade in={true}>
                <div id="profile">
                    <div className="profile-form">
                        <h1>Change Password</h1>
                        <form onSubmit={this.handleSignUp}>
                            <TextField
                            label="Username"
                            placeholder={this.state.user_name.length > 0 ? this.state.user_name : "@guestuser1"}
                            required
                            onChange={this.userNameInput}
                            />
                            <TextField
                            onChange={this.passwordInput}
                            className="input firstNameInput"
                            label="Current Password"
                            type="password"
                            required
                            />
							<TextField
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
                        <div className="logo">{this.state.first_name.length === 0 ? 
                            `${user.first_name.substr(0, 1).toUpperCase()}${user.last_name.substr(0, 1).toUpperCase()}`
                            :
                            `${this.state.first_name.substr(0, 1).toUpperCase()}${this.state.last_name.substr(0, 1).toUpperCase()}`}
                        </div>
                        <span className="username">{this.state.user_name.length === 0 ?
                            `@${user.username}`
                            :
                            `@${this.state.user_name}`}
                        </span>
                        <span className="full-name">{this.state.first_name.length === 0 ?
                            `${user.first_name} ${user.last_name}`
                            :
                            `${this.state.first_name} ${this.state.last_name}`}
                        </span>
                    </div>

					{/* Error Snackbar */}
					<Snackbar className="fixed-snackbar"
						anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
						}}
						open={this.state.error.length > 0 ? true : false}
						autoHideDuration={6000}
					>
						<SnackbarContent
							aria-describedby="error-snackbar"
							message={
								<span id="error-snackbar">
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
						autoHideDuration={6000}
					>
						<SnackbarContent
							aria-describedby="success-snackbar"
							message={
								<span id="success-snackbar">
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

Profile.propTypes = {
    user: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.siteData.user
});

export default connect(mapStateToProps, { loginUser })(Profile);