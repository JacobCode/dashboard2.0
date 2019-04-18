import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTask, deleteTask } from '../../redux/actions/actions';

import '../../scss/TasksPage.scss';

class Tasks extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        const { tasks } = this.props;
        return (
            <div id="tasks-page">
                <div className="container">
                    <div className="task-group bugs">
                        <header>Bugs <span>+</span></header>
                        {tasks.bugsData.map((task, i) => {
                            return (
                                <div className="task" key={i}>
                                    <p>{task.title}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="task-group server">
                        <header>Server <span>+</span></header>
                        {tasks.serverData.map((task, i) => {
                            return (
                                <div className="task" key={i}>
                                    <p>{task.title}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="task-group website">
                        <header>Website <span>+</span></header>
                        {tasks.websiteData.map((task, i) => {
                            return (
                                <div className="task" key={i}>
                                    <p>{task.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

Tasks.propTypes = {
    addTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    tasks: state.siteData.tasks
});

export default connect(mapStateToProps, { addTask, deleteTask })(Tasks);