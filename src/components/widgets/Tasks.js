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
	handleCheck(e, task) {
		const { user, updateTasks } = this.props;
		const { bugsData, serverData, websiteData } = user;

		this.setState(state => ({
			checkedBoxes: state.checkedBoxes.includes(task) ?
				state.checkedBoxes.filter(c => c !== task):
				[...state.checkedBoxes, task]
		}));

		let taskIndex;
		if (task.type === 'bug') {
			task.checked = !task.checked;
			taskIndex = bugsData.map((t) => { return t.id; }).indexOf(task.id);
			bugsData[taskIndex] = task;
			updateTasks(bugsData, user, 'bugsData');
		}
		if (task.type === 'server') {
			task.checked = !task.checked;
			taskIndex = user.serverData.map((t) => { return t.id; }).indexOf(task.id);
			serverData[taskIndex] = task;
			updateTasks(serverData, user, 'serverData');
		}
		if (task.type === 'website') {
			task.checked = !task.checked;
			taskIndex = websiteData.map((t) => { return t.id; }).indexOf(task.id);
			websiteData[taskIndex] = task;
			updateTasks(websiteData, user, 'websiteData');
		}
	}
	handleChange = (e, value) => {
		this.setState({ value });
	};
	deleteTask(e, type, id) {
		const { user, updateTasks } = this.props;
		const { bugsData, serverData, websiteData } = user;

		if (type === 'bug') {
			this.setState({ bugsData: bugsData });
			updateTasks(bugsData.filter(task => task.id !== id), user, 'bugsData');
		}
		if (type === 'server') {
			this.setState({ serverData: serverData });
			updateTasks(serverData.filter(task => task.id !== id), user, 'serverData');
		}
		if (type === 'website') {
			this.setState({ websiteData: websiteData });
			updateTasks(websiteData.filter(task => task.id !== id), user, 'websiteData');
		}
	}
	hideWidget() {
		const { setWidgets } = this.props;
		const { bookmarks, calendar, crypto, clock, weather, uploader } = this.props.activeWidgets;
		// Hide tasks widget
		var obj = {
			bookmarks,
			calendar,
			crypto,
			clock,
			tasks: false,
			weather,
			uploader,
		}
		setWidgets(obj);
	}
	UNSAFE_componentWillMount() {
		const { bugsData, websiteData, serverData } = this.props.user;
		this.setState({ checkedBoxes: [...bugsData.filter((task) => task.checked === true), ...websiteData.filter((task) => task.checked === true), ...serverData.filter((task) => task.checked === true)] });
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
						color="primary"
						label={task.title}
						onChange={e => this.handleCheck(e,task)}
						checked={checkedBoxes.includes(task)}
						/>
						<div className={`title ${task.checked ? 'complete' : ''}`} onClick={e => this.handleCheck(e,task)}>{task.title}</div>
					</div>
					<img onClick={e => this.deleteTask(e, task.type, task.id)} src={deleteIcon} alt="Delete Icon"/>
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
						<div className={`title ${task.checked ? 'complete' : ''}`} onClick={e => this.handleCheck(e,task)}>{task.title}</div>
					</div>
					<img onClick={e => this.deleteTask(e, task.type, task.id)} src={deleteIcon} alt="Delete Icon"/>
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
						<div className={`title ${task.checked ? 'complete' : ''}`} onClick={e => this.handleCheck(e,task)}>{task.title}</div>
					</div>
					<img onClick={e => this.deleteTask(e, task.type, task.id)} src={deleteIcon} alt="Delete Icon"/>
				</div>
			)
		});
		return (
			<div id="tasks" className="widget">
				<div className="delete-widget" onClick={this.hideWidget}><Close /></div>
				<AppBar position="static" color="primary">
					<Tabs className="tabs" indicatorColor="primary" value={value} onChange={this.handleChange}>
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