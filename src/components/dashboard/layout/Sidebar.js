import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

const Sidebar = ({ ...props }) => {
  // function activeRoute(routeName) {
  //   return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  // }

  const { routes, closeDrawer, user_info } = props;

  var links = (
    <List id="sidebar-links">
      {routes.map((prop, key) => {
        return (
          <NavLink onClick={closeDrawer}
            to={prop.path}
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
        <span>{`${user_info.first_name} ${user_info.last_name}`}</span>
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
            {/* {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />} */}
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

Sidebar.propTypes = {
  user_info: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user_info: state.siteData.user_info
});

export default connect(mapStateToProps)(Sidebar);
