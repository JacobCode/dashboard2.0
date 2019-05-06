import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import { updateUserInfo } from '../../redux/actions/actions';

// SCSS
import '../../scss/Profile.scss';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            user_name: ''
        }
        this.firstNameInput = this.firstNameInput.bind(this);
        this.lastNameInput = this.lastNameInput.bind(this);
        this.userNameInput = this.userNameInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    userNameInput(e) {
        if (e.target.value.length < 13) {
            this.setState({ user_name: e.target.value })
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const output = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.user_name
        }
        console.log(output);
        e.target.reset();
        this.props.updateUserInfo(output);
    }
    render() {
        const { user_info } = this.props;
        return (
            <Fade in={true}>
                <div id="profile">
                    <div className="profile-form">
                        <h1>Edit Profile</h1>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            label="Username"
                            placeholder={this.state.user_name.length > 0 ? this.state.user_name : "@guestuser1"}
                            required
                            onChange={this.userNameInput}
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
                            <div className="button-container">
                                <Button type="submit" color="primary" variant="contained">Submit</Button>
                            </div>
                        </form>
                    </div>
                    <div className="profile-card">
                        <div className="logo">{this.state.first_name.length === 0 ? 
                            `${user_info.first_name.substr(0, 1).toUpperCase()}${user_info.last_name.substr(0, 1).toUpperCase()}`
                            :
                            `${this.state.first_name.substr(0, 1).toUpperCase()}${this.state.last_name.substr(0, 1).toUpperCase()}`}
                        </div>
                        <span className="username">{this.state.user_name.length === 0 ?
                            `@${user_info.username}`
                            :
                            `@${this.state.user_name}`}
                        </span>
                        <span className="full-name">{this.state.first_name.length === 0 ?
                            `${user_info.first_name} ${user_info.last_name}`
                            :
                            `${this.state.first_name} ${this.state.last_name}`}
                        </span>
                    </div>
                </div>
            </Fade>
        )
    }
}

Profile.propTypes = {
    user_info: PropTypes.object.isRequired,
    updateUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user_info: state.siteData.user_info
});

export default connect(mapStateToProps, { updateUserInfo })(Profile);