import React from 'react';
import { NavLink } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';

const Sidebar = ({ ...props }) => {
	const { routes, closeDrawer, user, logoutUser } = props;
	const logout = (e) => {
		logoutUser();
	}
  var links = (
    <List id="sidebar-links">
      {routes.map((prop, key) => {
        return (
          <NavLink onClick={closeDrawer}
            to={prop.path}
            activeClassName='active'
            key={key}>
            <ListItem button>
              {typeof prop.icon === "string" ? (
                <Icon>
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon />
              )}
              <ListItemText
                primary={prop.name}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
	  <Divider />
		<NavLink id="sidebar-logout" onClick={logout} to="/">
			<ListItem>
				<ListItemText
					primary="Sign Out"
					disableTypography={true}
				/>
			</ListItem>
		</NavLink>
    </List>
  );

  var brand = (
    <div id="sidebar-brand">
      <a href="/dashboard">
        <span>{`${user.first_name} ${user.last_name}`}</span>
      </a>
    </div>
  );
  
  return (
    <div id="sidebar">
      <Hidden mdUp implementation="css">
        <Drawer
          id="sidebar1"
          variant="temporary"
          anchor="left"
          open={props.open}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}>
          {brand}
          <div>
            {links}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          id="sidebar2"
          anchor="left"
          variant="permanent"
          open>
          {brand}
          <div>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  );
};

export default Sidebar;
