import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import { addBug, addServer, addWebsite, deleteBug, deleteServer, deleteWebsite  } from '../../redux/actions/actions';

import '../../scss/TasksPage.scss';

const taskOptions = ['Bug', 'Server', 'Website'];

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            chosenTaskOption: 'Bug',
            chosenTaskName: ''
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.handleTaskOption = this.handleTaskOption.bind(this);
        this.handleTaskName = this.handleTaskName.bind(this);
        this.handleNewTask = this.handleNewTask.bind(this);
    }
    toggleForm() {
        this.setState({ open: !this.state.open })
    }
    handleTaskOption(e) {
        this.setState({ chosenTaskOption: e.target.value });
    }
    handleTaskName(e) {
        this.setState({ chosenTaskName: e.target.value });
    }
    handleNewTask(e) {
        e.preventDefault();
        if (this.state.chosenTaskName.length > 1) {
            const newTask = { title: this.state.chosenTaskName, type: this.state.chosenTaskOption.toLowerCase() };
            if (this.state.chosenTaskOption === 'Bug') {
                this.props.addBug([...this.props.bugsData, newTask]);
            }
            if (this.state.chosenTaskOption === 'Server') {
                this.props.addServer([...this.props.serverData, newTask]);
            }
            if (this.state.chosenTaskOption === 'Website') {
                this.props.addWebsite([...this.props.websiteData, newTask]);
            }
            this.setState({ chosenTaskName: '' });
        }
    }
    deleteTask(e, type, name) {
        if (type === 'bug') {
            this.props.deleteBug(this.props.bugsData.filter(task => task.title !== name));
        }
        if (type === 'server') {
            this.props.deleteServer(this.props.serverData.filter(task => task.title !== name));
        }
        if (type === 'website') {
            this.props.deleteWebsite(this.props.websiteData.filter(task => task.title !== name));
        }
    }
    render() {
        const { bugsData, serverData, websiteData } = this.props;
        return (
            <div id="tasks-page">
                <h1 className="title">Tasks</h1>
                <Modal id="task-modal"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}>
                    <div className="content">
                        <ClickAwayListener onClickAway={this.toggleForm}>
                            <div className="form">
                                <TextField id="task-name"
                                    label="Task Name"
                                    value={this.state.chosenTaskName}
                                    onChange={this.handleTaskName}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField id="task-option"
                                select
                                value={this.state.chosenTaskOption}
                                onChange={this.handleTaskOption}
                                variant="outlined"
                                SelectProps={{ native: true }}>
                                    {taskOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <Button id="submit-task" variant="contained" type="submit" onClick={this.state.chosenTaskName.length < 1 ? this.toggleForm : this.handleNewTask} color={this.state.chosenTaskName.length < 1 ? 'secondary' : 'primary'}>{this.state.chosenTaskName.length < 1 ? 'Close' : 'Add Task'}</Button>
                            </div>
                        </ClickAwayListener>
                    </div>
                </Modal>
                <div className="container">
                    <div className="task-group bugs">
                        <header><p>Bugs</p></header>
                        {bugsData.map((task, i) => {
                            return (
                                <div className="task" key={i}>
                                    <p>{task.title}</p>
                                    <div onClick={e => this.deleteTask(e, task.type, task.title)} className="delete-task-icon">
                                        <DeleteIcon />
                                    </div>
                                </div>
                            )
                        })}
                        {bugsData.length === 0 ? <p className="tasks-empty"><span>Empty</span></p> : null}
                    </div>
                    <div className="task-group website">
                        <header><p>Website</p></header>
                        {websiteData.map((task, i) => {
                            return (
                                <div className="task" key={i}>
                                    <p>{task.title}</p>
                                    <div onClick={e => this.deleteTask(e, task.type, task.title)} className="delete-task-icon">
                                        <DeleteIcon />
                                    </div>
                                </div>
                            )
                        })}
                        {websiteData.length === 0 ? <p className="tasks-empty"><span>Empty</span></p> : null}
                    </div>
                    <div className="task-group server">
                        <header><p>Server</p></header>
                        {serverData.map((task, i) => {
                            return (
                                <div className="task" key={i}>
                                    <p>{task.title}</p>
                                    <div onClick={e => this.deleteTask(e, task.type, task.title)} className="delete-task-icon">
                                        <DeleteIcon />
                                    </div>
                                </div>
                            )
                        })}
                        {serverData.length === 0 ? <p className="tasks-empty"><span>Empty</span></p> : null}
                    </div>
                    <Tooltip onClick={this.toggleForm} title="Add Task" aria-label="Add Task">
                        <Fab color="primary">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

Tasks.propTypes = {
    bugsData: PropTypes.array.isRequired,
    serverData: PropTypes.array.isRequired,
    websiteData: PropTypes.array.isRequired,
    deleteBug: PropTypes.func.isRequired,
    deleteServer: PropTypes.func.isRequired,
    deleteWebsite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    bugsData: state.siteData.bugsData,
    serverData: state.siteData.serverData,
    websiteData: state.siteData.websiteData
});

export default connect(mapStateToProps, { addBug, addServer, addWebsite, deleteBug, deleteServer, deleteWebsite })(Tasks);