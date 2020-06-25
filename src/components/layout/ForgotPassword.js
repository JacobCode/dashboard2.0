import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'email-validator';

// MUI
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// API URL
const API_URL = 'https://modern-dashboard.herokuapp.com';

const ForgotPassword = (props) => {
	const { toggleModal, showModal } = props;
	const [emailInputValue, updateEmailInput] = useState('');
	const handleSubmit = (e) => {
		const { setModalError, toggleModal } = props;
		e.preventDefault();
		// If email is valid
		if (validator.validate(emailInputValue)) {
			axios.post(`${API_URL}/user/forgotpassword`, {email: emailInputValue})
				.then((res) => {
					updateEmailInput('');
					if (res.status === 200) {
						setModalError('message', res.data.message);
						setTimeout(() => {
							setModalError('message', '');
							toggleModal(false);
						}, 3000)
					}
				})
				.catch((err) => {
					// If too many requests error
					if (err['response'].status === 429) {
						setModalError('error', err.response.data);
						setTimeout(() => {
							setModalError('error', '');
						}, 3000);
					}
					// If account not found error
					if (err['response'].status === 404) {
						setModalError('error', 'Account with this email not found');
						setTimeout(() => {
							setModalError('error', '');
						}, 3000);
					}
				})
		} else {
			setModalError('error', "Email is not valid");
			setTimeout(() => {
				setModalError('error', '');
			}, 3000);
		}
	}
	return (
		<Modal id="forgot-password" open={showModal}>
			<div>
				<ClickAwayListener onClickAway={e => toggleModal(false)}>
					<form onSubmit={handleSubmit}>
						<div className="close"><Close onClick={e => toggleModal(false)} /></div>
						<h1>Forgot Your Password?</h1>
						<FormControl id="control">
							<InputLabel htmlFor="your_email">Enter Your Email *</InputLabel>
							<Input id="your_email" value={emailInputValue} onChange={e => updateEmailInput(e.target.value)}
							/>
						</FormControl>
						<Button type="submit" color="primary" variant="contained">Send Recovery Email</Button>
					</form>
				</ClickAwayListener>
			</div>
		</Modal>
	)
}

export default ForgotPassword;