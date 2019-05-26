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

import '../../scss/TasksPage.scss';

import { addTask, deleteTask } from '../../redux/actions/actions';

const taskOptions = ['Bug', 'Website', 'Server'];

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            chosenTaskOption: 'Bug',
			chosenTaskName: '',
			bugsData: [],
			websiteData: [],
			serverData: []
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
                this.props.addTask([...this.props.user.bugsData, newTask], this.props.user._id, this.props.user, 'bugsData');
            }
            if (this.state.chosenTaskOption === 'Server') {
                this.props.addTask([...this.props.user.serverData, newTask], this.props.user._id, this.props.user, 'serverData');
            }
            if (this.state.chosenTaskOption === 'Website') {
                this.props.addTask([...this.props.user.websiteData, newTask], this.props.user._id, this.props.user, 'websiteData');
            }
            this.setState({ chosenTaskName: '' });
        }
    }
    deleteTask(e, type, name) {
        if (type === 'bug') {
			this.setState({ bugsData: this.props.user.bugsData.filter(task => task.title !== name) });
            this.props.deleteTask(this.props.user._id, this.props.user.bugsData.filter(task => task.title !== name), this.props.user, 'bugsData');
        }
        if (type === 'server') {
			this.setState({ serverData: this.props.user.serverData.filter(task => task.title !== name) });
            this.props.deleteTask(this.props.user._id, this.props.user.serverData.filter(task => task.title !== name), this.props.user, 'serverData');
        }
        if (type === 'website') {
			this.setState({ websiteData: this.props.user.websiteData.filter(task => task.title !== name) });
			this.props.deleteTask(this.props.user._id, this.props.user.websiteData.filter(task => task.title !== name), this.props.user, 'websiteData');
        }
	}
	componentWillMount() {
		this.setState({
			bugsData: this.props.user.bugsData,
			serverData: this.props.user.serverData,
			websiteData: this.props.user.websiteData
		});
	}
    render() {
        const { bugsData, serverData, websiteData } = this.props.user;
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
                                    <div className="delete-task-icon">
                                        <DeleteIcon onClick={e => this.deleteTask(e, task.type, task.title)} />
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
                                    <div className="delete-task-icon">
                                        <DeleteIcon onClick={e => this.deleteTask(e, task.type, task.title)} />
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
                                    <div className="delete-task-icon">
                                        <DeleteIcon onClick={e => this.deleteTask(e, task.type, task.title)} />
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
	user: PropTypes.object.isRequired,
	addTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.siteData.user
});

export default connect(mapStateToProps, { addTask, deleteTask })(Tasks);