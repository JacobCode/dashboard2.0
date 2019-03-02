import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// SCSS
import '../../scss/Profile.scss';

export default class DashboardView extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            output: {}
        }
        this.firstNameInput = this.firstNameInput.bind(this);
        this.lastNameInput = this.lastNameInput.bind(this);
        this.emailInput = this.emailInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    firstNameInput(e) {
        this.setState({ firstName: e.target.value })
    }
    lastNameInput(e) {
        this.setState({ lastName: e.target.value })
    }
    emailInput(e) {
        this.setState({ email: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        const output = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        this.setState({
            output: output
        })
        console.log(output);
        e.target.reset();
    }
    render() {
        return (
            <div id="profile">
                <div className="profile-form">
                    <h1>Edit Profile</h1>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                        label="Username"
                        defaultValue="@guestuser"
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <TextField
                        onChange={this.firstNameInput}
                        className="input firstNameInput"
                        label="First Name"
                        type="text"
                        required
                        />
                        <TextField
                        onChange={this.lastNameInput}
                        className="input lastNameInput"
                        label="Last Name"
                        type="text"
                        required
                        />
                        <TextField
                        onChange={this.emailInput}
                        className="input emailInput"
                        label="Email Address"
                        type="email"
                        required
                        />
                        <div className="button-container">
                            <Button type="submit" color="primary" variant="contained">Submit</Button>
                        </div>
                    </form>
                </div>
                <div className="profile-card">
                    <div className="logo">{this.state.firstName.length === 0 ? 'HI' : `${this.state.firstName.substr(0, 1).toUpperCase()}${this.state.lastName.substr(0, 1).toUpperCase()}`}</div>
                    <span className="username">@guestuser</span>
                    <span className="full-name">{this.state.firstName.length === 0 ? 'Guest User' : `${this.state.firstName} ${this.state.lastName}`}</span>
                </div>
            </div>
        )
    }
}