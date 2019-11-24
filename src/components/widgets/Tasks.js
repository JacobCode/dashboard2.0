import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Checkbox from '@material-ui/core/Checkbox';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import deleteIcon from '../../images/delete-icon.svg';

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const NoTasks = (props) => {
    return (
        <div className="no-tasks">
            {`No ${props.type} tasks`}
        </div>
    )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            bugsData: props.bugsData,
            websiteData: props.websiteData,
            serverData: props.serverData,
            checkedBoxes: []
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.hideWidget = this.hideWidget.bind(this);
    };
    handleCheck(e, x) {
        this.setState(state => ({
            checkedBoxes: state.checkedBoxes.includes(x) ?
                state.checkedBoxes.filter(c => c !== x):
                [...state.checkedBoxes, x]
        }));
    }
    handleChange = (e, value) => {
        this.setState({ value });
    };
    deleteTask(e, type, name) {
        if (type === 'bug') {
			this.setState({ bugsData: this.props.user.bugsData });
        	this.props.updateTasks(this.props.user.bugsData.filter(task => task.title !== name), this.props.user, 'bugsData');
        }
        if (type === 'server') {
			this.setState({ serverData: this.props.user.serverData });
        	this.props.updateTasks(this.props.user.serverData.filter(task => task.title !== name), this.props.user, 'serverData');
        }
        if (type === 'website') {
			this.setState({ websiteData: this.props.user.websiteData });
        	this.props.updateTasks(this.props.user.websiteData.filter(task => task.title !== name), this.props.user, 'websiteData');
        }
    }
    hideWidget() {
        // Hide tasks widget
        var obj = {
            bookmarks: this.props.activeWidgets.bookmarks,
            calendar: this.props.activeWidgets.calendar,
            crypto: this.props.activeWidgets.crypto,
            clock: this.props.activeWidgets.clock,
            tasks: false,
			weather: this.props.activeWidgets.weather,
			uploader: this.props.activeWidgets.uploader
        }
        this.props.setWidgets(obj);
    }
    render() {
        const { value, checkedBoxes } = this.state;
		const { bugsData, websiteData, serverData } = this.props.user;
        // Task Variables
        const bugs = bugsData.map((task, i) => {
            return (
                <div key={i} className="task">
                    <div className="left">
                        <Checkbox
                        color="secondary"
                        label={task.title}
                        onChange={e => this.handleCheck(e,task)}
                        checked={checkedBoxes.includes(task)}
                        />
                        <div className="title" onClick={e => this.handleCheck(e,task)}>{task.title}</div>
                    </div>
                    <img onClick={e => this.deleteTask(e, task.type, task.title)} src={deleteIcon} alt="Delete Icon"/>
                </div>
            )
        });
        const websites = websiteData.map((task, i) => {
            return (
                <div key={i} className="task">
                    <div className="left">
                        <Checkbox
                        color="secondary"
                        label={task.title}
                        onChange={e => this.handleCheck(e,task)}
                        checked={checkedBoxes.includes(task)}
                        />
                        <div className="title" onClick={e => this.handleCheck(e,task)}>{task.title}</div>
                    </div>
                    <img onClick={e => this.deleteTask(e, task.type, task.title)} src={deleteIcon} alt="Delete Icon"/>
                </div>
            )
        });
        const servers = serverData.map((task, i) => {
            return (
                <div key={i} className="task">
                    <div className="left">
                        <Checkbox
                        color="secondary"
                        label={task.title}
                        onChange={e => this.handleCheck(e,task)}
                        checked={checkedBoxes.includes(task)}
                        />
                        <div className="title" onClick={e => this.handleCheck(e,task)}>{task.title}</div>
                    </div>
                    <img onClick={e => this.deleteTask(e, task.type, task.title)} src={deleteIcon} alt="Delete Icon"/>
                </div>
            )
        });
        return (
            <div id="tasks" className="widget">
                <div className="delete-widget" onClick={this.hideWidget}><Close /></div>
                <AppBar position="static" color="secondary">
                    <Tabs className="tabs" value={value} onChange={this.handleChange}>
                        <Tab label="Bugs" />
                        <Tab label="Website" />
                        <Tab label="Server" />
                    </Tabs>
                </AppBar>
                <div className="task-content">
                    {value === 0 && <div className="tab-container">{bugsData.length === 0 ? <NoTasks type="bug" /> : bugs}</div>}
                    {value === 1 && <div className="tab-container">{websiteData.length === 0 ? <NoTasks type="website" /> : websites}</div>}
                    {value === 2 && <div className="tab-container">{serverData.length === 0 ? <NoTasks type="server" /> : servers}</div>}
                </div>
            </div>
        )
    }
}

export default Tasks