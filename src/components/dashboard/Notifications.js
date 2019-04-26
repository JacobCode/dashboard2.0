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

// SCSS
import '../../scss/Notifications.scss';

import { addNotification, deleteNotification } from '../../redux/actions/actions';

const notificationOptions = ['Work', 'School', 'Personal'];

class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            chosenNotificationOption: 'Work',
            chosenNotificationName: '',
            chosenNotificationDate: '2019-04-26'
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.handleNotificationOption = this.handleNotificationOption.bind(this);
        this.handleNotificationName = this.handleNotificationName.bind(this);
        this.handleNotificationsDate = this.handleNotificationsDate.bind(this);
        this.addNotification = this.addNotification.bind(this);
    }
    toggleForm() {
        this.setState({ open: !this.state.open })
    }
    handleNotificationOption(e) {
        this.setState({ chosenNotificationOption: e.target.value });
    }
    handleNotificationName(e) {
        this.setState({ chosenNotificationName: e.target.value });
    }
    handleNotificationsDate(e) {
        this.setState({ chosenNotificationDate: e.target.value });
    }
    addNotification() {
        var format = (date) => {
            var newDate = date.split('-');
            newDate.shift();
            return `${parseInt(newDate[0], 10)}/${newDate[1]}`;
        }
        var newId = (this.props.notifications.length === 0 ? 0 : this.props.notifications[this.props.notifications.length - 1].id + 1);
        var newNoti = {
            id: newId,
            type: this.state.chosenNotificationOption.toLowerCase(),
            name: this.state.chosenNotificationName,
            date: format(this.state.chosenNotificationDate)
        }
        this.props.addNotification([...this.props.notifications, newNoti]);
        this.setState({ chosenNotificationName: '' })
    }
    deleteNotification() {

    }
    componentWillMount() {
        var d = new Date();
        var m = d.getMonth() + 1;
        var dt = d.getDate();
        var year = d.getFullYear();
        // Place '0' infront of number if less than 10
        var month = (m < 10) ? ("0" + m) : m;
        var date = (dt < 10) ? ("0" + dt) : dt;
        // Set current date
        this.setState({ chosenNotificationDate: `${year}-${month}-${date}` })
    }
    render() {
        const { notifications } = this.props;
        return (
            <div id="notifications">
                <h1 className="noti-title">Notifications</h1>
                <Modal id="notification-modal"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}>
                    <div className="content">
                        <ClickAwayListener onClickAway={this.toggleForm}>
                            <div className="form">
                                <TextField id="notification-name"
                                    label="Notification Name"
                                    value={this.state.chosenNotificationName}
                                    onChange={this.handleNotificationName}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField id="notification-option"
                                select
                                value={this.state.chosenNotificationOption}
                                onChange={this.handleNotificationOption}
                                label="Type"
                                SelectProps={{ native: true }}>
                                {notificationOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                                </TextField>
                                <TextField
                                    id="notification-date"
                                    label="Date"
                                    type="date"
                                    value={this.state.chosenNotificationDate}
                                    onChange={this.handleNotificationsDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button id="submit-notification" variant="contained" onClick={this.state.chosenNotificationName.length < 1 ? this.toggleForm : this.addNotification} color={this.state.chosenNotificationName.length < 1 ? 'secondary' : 'primary'}>{this.state.chosenNotificationName.length < 1 ? 'Close' : 'Add Notification'}</Button>
                            </div>
                        </ClickAwayListener>
                    </div>
                </Modal>
                <div className="notifications-content">
                    <div id="work" className="section">
                        <h1>Work - 
                            <span className="work-value">{notifications.filter(type => type.type === 'work').length}</span>
                        </h1>
                        {notifications.map((noti, i) => {
                            if (noti.type === 'work') {
                                return (
                                    <div key={i} className="noti">
                                        <p className="noti-info">&bull; {noti.name}</p>
                                        <span className="noti-date">{noti.date}</span>
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <div id="school" className="section">
                        <h1>School - 
                            <span className="school-value">{notifications.filter(type => type.type === 'school').length}</span>
                        </h1>
                        {notifications.map((noti, i) => {
                            if (noti.type === 'school') {
                                return (
                                    <div key={i} className="noti">
                                        <p className="noti-info">&bull; {noti.name}</p>
                                        <span className="noti-date">{noti.date}</span>
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <div id="personal" className="section">
                        <h1>Personal - 
                            <span className="personal-value">{notifications.filter(type => type.type === 'personal').length}</span>
                        </h1>
                        {notifications.map((noti, i) => {
                            if (noti.type === 'personal') {
                                return (
                                    <div key={i} className="noti">
                                        <p className="noti-info">&bull; {noti.name}</p>
                                        <span className="noti-date">{noti.date}</span>
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <Tooltip onClick={this.toggleForm} title="Add Notification" aria-label="Add Notification">
                        <Fab color="primary">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    addNotification: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    notifications: state.siteData.notifications
});

export default connect(mapStateToProps, { addNotification, deleteNotification })(Notifications);