import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { bugsData, websiteData, serverData } from '../widgets/variables/tasks';

// SCSS
import '../../../scss/Tasks.scss';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

// Task Variables
const bugs = bugsData.map((task, i) => {
                return (
                    <div key={i} className="">{task.title}</div>
                )
            });
const websites = websiteData.map((task, i) => {
                    return (
                        <div key={i} className="">{task.title}</div>
                    )
                });
const servers = serverData.map((task, i) => {
                    return (
                        <div key={i} className="">{task.title}</div>
                    )
                })

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
        }
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { value } = this.state;
        return (
            <div id="tasks" className="widget">
                <AppBar position="static">
                    <Tabs className="tabs" value={value} onChange={this.handleChange}>
                        <Tab label="Bugs" />
                        <Tab label="Website" />
                        <Tab label="Server" />
                    </Tabs>
                </AppBar>
                <div className="task-content">
                    {value === 0 && <TabContainer>{bugsData.length === 0 ? 'No Bug Tasks' : bugs}</TabContainer>}
                    {value === 1 && <TabContainer>{websiteData.length === 0 ? 'No Website Tasks' : websites}</TabContainer>}
                    {value === 2 && <TabContainer>{serverData.length === 0 ? 'No Server Tasks' : servers}</TabContainer>}
                </div>
            </div>
        )
    }
}

export default Tasks;