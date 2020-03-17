import React, { Component } from 'react';

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

import NavbarLinks from './NavbarLinks';

export default class Navbar extends Component {
    render() {
		const { logoutUser, user, history } = this.props;
        return (
            <AppBar id="navbar" color="primary">
                <Toolbar id="toolbar">
                    <div className="title">
                        <Button color="inherit" href="/">Dashboard</Button>
                    </div>
                    <Hidden smDown implementation="css">
                        <NavbarLinks history={history} logoutUser={logoutUser} user={user} />
                    </Hidden>
                    <Hidden mdUp implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerToggle}>
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        )
    }
}