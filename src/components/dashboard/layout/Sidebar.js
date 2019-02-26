import React, { Component } from 'react';
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";


// core components

// import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
// import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  const { logo, logoText, routes } = props;

  var links = (
    <List id="sidebar-links">
      {routes.map((prop, key) => {
        return (
          <NavLink
            to={prop.dir + prop.path}
            activeClassName="active"
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
    </List>
  );

  var brand = (
    <div id="sidebar-brand">
      <a href="https://jacobcode.github.io/portfolio/">
        <div className="user-icon">
            {logoText.charAt(0).toUpperCase()}
        </div>
        <span>{logoText}</span>
      </a>
    </div>
  );
  
  return (
    <div id="sidebar">
    
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.open}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}>
          {brand}
          <div className="divider">erer</div>
          <div>
            {/* {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />} */}
            {links}
          </div>
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open>
          {brand}
          <div className="divider"></div>
          <div>{links}</div>
        </Drawer>
      </Hidden>

    </div>
  );
};

export default Sidebar;
