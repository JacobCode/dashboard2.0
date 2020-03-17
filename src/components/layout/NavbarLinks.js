import React, { Component } from "react";
import { Link } from 'react-router-dom';

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from "@material-ui/icons/Notifications";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from '@material-ui/core/Button';

class NavbarLinks extends Component {
	constructor() {
		super();
		this.state = {
			openNoti: false
		};
		this.handleToggles = this.handleToggles.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.logout = this.logout.bind(this);
	}
	handleToggles() {
		this.setState({ openNoti: !this.state.openNoti });
	}
	handleClose() {
		this.setState({ openNoti: false });
	}
	logout() {
		this.props.logoutUser();
		window.location.pathname = '/';
	}
	render() {
		const { user, history } = this.props;
		const { notifications } = user;
		return (
			<div id="links">

			{/* Notifications */}
			<ClickAwayListener onClickAway={this.handleClose}>
			<div id="notifications-dropdown">
					<Button
					aria-owns={this.state.openNoti ? "menu-list-grow" : null}
					aria-haspopup="true"
					onClick={this.handleToggles}>
					<Badge badgeContent={notifications.length} color="primary">
						<NotificationsIcon />
					</Badge>
					<Hidden mdUp implementation="css">
						<p>|</p>
					</Hidden>
					</Button>
					{/* Notifications Dropdown */}
					<Poppers
					open={this.state.openNoti}
					anchorEl={this.anchorEl}
					transition
					disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
						{...TransitionProps}
						id="menu-list-grow"
						style={{
							transformOrigin:
							placement === "bottom" ? "center top" : "center bottom"
						}}>
							<Paper>
								<MenuList role="menu">
									{/* If there are no notifications, display No Notifications */}
									{notifications.length === 0 ? 
									<MenuItem>No Notifications</MenuItem>
									:
									notifications.map((notification, index) => {
										return (
											<MenuItem className="notification-item" key={index} onClick={this.handleToggles}>
												<Link to={`/dashboard/notifications/#${notification.type}`}>
													<p className={`type-color ${notification.type === 'work' ? 'red' : notification.type === 'school' ? 'purple' : notification.type === 'personal' ? 'blue' : ''}`}>&bull;</p>
													<span>{notification.name}</span> <span className="notification-date">{notification.date}</span>
												</Link>
											</MenuItem>
										)
									})}
								</MenuList>
							</Paper>
						</Grow>
					)}
					</Poppers>
			</div>
			</ClickAwayListener>

			{/* Logout */}
			<div className="nav-logout">
				<Button onClick={this.logout} style={{textTransform: 'capitalize'}}>
					Sign Out
				</Button>
			</div>

			</div>
		);
	}
}

export default NavbarLinks;