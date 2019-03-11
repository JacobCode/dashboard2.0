import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Checkbox from '@material-ui/core/Checkbox';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { bugsData, websiteData, serverData } from '../widgets/variables/tasks';

import deleteIcon from '../../../images/delete-icon.svg';

// SCSS
import '../../../scss/Tasks.scss';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            checkedBoxes: []
        }
        this.handleCheck = this.handleCheck.bind(this);
    };
    handleCheck(e, x) {
        this.setState(state => ({
            checkedBoxes: state.checkedBoxes.includes(x) ?
                state.checkedBoxes.filter(c => c !== x):
                [...state.checkedBoxes, x]
        }));
    }
    handleChange = (event, value) => {
        this.setState({
            value
        });
    };
    deleteTask(e) {
        e.target.parentElement.style.display = 'none'
    }
    render() {
        const { value, checkedBoxes } = this.state;
        // Task Variables
        const bugs = bugsData.map((task, i) => {
            return (
                <div key={i} className="task">
                    <div className="left">
                        <Checkbox
                        color="primary"
                        label={task.title}
                        onChange={e => this.handleCheck(e,task)}
                        checked={checkedBoxes.includes(task)}
                        />
                        <div className="title" onClick={e => this.handleCheck(e,task)}>{task.title}</div>
                    </div>
                    <img onClick={this.deleteTask} src={deleteIcon} alt="Delete Icon"/>
                </div>
            )
        });
        const websites = websiteData.map((task, i) => {
            return (
                <div key={i} className="task">
                    <div className="left">
                        <Checkbox
                        color="primary"
                        label={task.title}
                        onChange={e => this.handleCheck(e,task)}
                        checked={checkedBoxes.includes(task)}
                        />
                        <div className="title" onClick={e => this.handleCheck(e,task)}>{task.title}</div>
                    </div>
                    <img onClick={this.deleteTask} src={deleteIcon} alt="Delete Icon"/>
                </div>
            )
        });
        const servers = serverData.map((task, i) => {
            return (
                <div key={i} className="task">
                    <div className="left">
                        <Checkbox
                        color="primary"
                        label={task.title}
                        onChange={e => this.handleCheck(e,task)}
                        checked={checkedBoxes.includes(task)}
                        />
                        <div className="title" onClick={e => this.handleCheck(e,task)}>{task.title}</div>
                    </div>
                    <img onClick={this.deleteTask} src={deleteIcon} alt="Delete Icon"/>
                </div>
            )
        });
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
                    {value === 0 && <div className="tab-container">{bugsData.length === 0 ? 'No Bug Tasks' : bugs}</div>}
                    {value === 1 && <div className="tab-container">{websiteData.length === 0 ? 'No Website Tasks' : websites}</div>}
                    {value === 2 && <div className="tab-container">{serverData.length === 0 ? 'No Server Tasks' : servers}</div>}
                </div>
                    {/* <Checkbox
                    label='hey'
                    onChange={e => this.handleCheck(e)}
                    checked={this.state}
                    /> */}
                    {/* { bugsData.map(x =>
                        <Checkbox
                        label={x.title} key={x.title.toString()}
                        onChange={e => this.handleCheck(e,x)}
                        checked={this.state.checkedBoxes.includes(x)}
                        />
                    )}} */}
                {/* )}} */}
            </div>
        )
    }
}

export default Tasks;