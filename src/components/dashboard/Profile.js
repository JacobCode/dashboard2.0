import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

// SCSS
import '../../scss/Profile.scss';

export default class DashboardView extends Component {
    render() {
        return (
            <div id="profile">
                <div className="profile-form">
                    <h1>Edit Profile</h1>
                    <form>
                        <TextField
                        className="input usernameInput"
                        label="Username"
                        value="@guestuser"
                        disabled
                        type="email"
                        />
                        <TextField
                        className="input firstNameInput"
                        label="First Name"
                        type="text"
                        />
                        <TextField
                        className="input lastNameInput"
                        label="Last Name"
                        type="text"
                        />
                        <TextField
                        className="input emailInput"
                        label="Email Address"
                        type="email"
                        />
                    </form>
                </div>
                <div className="profile-card">
                    <div className="logo"></div>
                    <span className="username">@guestuser</span>
                    <span className="full-name">Jacob Carver</span>
                </div>
            </div>
        )
    }
}