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
import NotificationsIcon from "@material-ui/icons/Notifications";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from '@material-ui/core/Button';
import { notificationsData } from '../widgets/variables/notifications';

export default class NavbarLinks extends Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
    console.log('toggle');
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div id="links">

        {/* Dashboard */}
        <Link to="/main">
          <Button
          aria-label="Dashboard">
            <DashboardIcon />
            <Hidden mdUp implementation="css">
              <p>|</p>
            </Hidden>
          </Button>
        </Link>

        {/* Notifications */}
        <div>
          <Button
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}>
            <NotificationsIcon />
            <span className="notifications-number">{notificationsData.length}</span>
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick}>|</p>
            </Hidden>
          </Button>
          {/* Notifications Dropdown */}
          <Poppers
            open={open}
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
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList role="menu">
                              {/* If there are no notifications, display No Notifications */}
                              {notificationsData.length === 0 ? <MenuItem>No Notifications</MenuItem> : notificationsData.map((notification, index) => {
                                return (
                                  <MenuItem className="notification-item" key={index} onClick={this.handleClose}>
                                    <Link to={`/notifications/#${notification.type}`}>{notification.name}</Link>
                                  </MenuItem>
                                )
                              })}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
          </Poppers>
        </div>

        {/* Profile */}
        <Link to="/main">
          <Button
          aria-label="Person">
            <Person />
          </Button>
        </Link>

      </div>
    );
  }
}