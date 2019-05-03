import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setWidgets, updateNotification } from '../../../redux/actions/actions';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PickyDateTime from 'react-picky-date-time';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Close from '@material-ui/icons/Close';

const notificationOptions = ['Work', 'School', 'Personal'];

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            showPickyDateTime: true,
            showForm: false,
            pickedDate: '',
            pickedType: 'Work',
            pickedTitle: ''
        }
        this.hideWidget = this.hideWidget.bind(this);
        this.onDatePicked = this.onDatePicked.bind(this);
        this.selectType = this.selectType.bind(this);
        this.selectTitle = this.selectTitle.bind(this);
        this.addReminder = this.addReminder.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    onYearPicked(res) {
        // console.log(res.year)
    }
    onMonthPicked(res) {
        // console.log(res);
    }
    onDatePicked(res) {
        const format = (d, m) => {
            this.setState({ pickedDate: parseInt(m, 10) + '/' + d, showForm: true})
        }
        format(res.date, res.month);
    }
    hideWidget() {
        // Hide calendar widget
        var obj = {
            bookmarks: this.props.activeWidgets.bookmarks,
            calendar: false,
            chart: this.props.activeWidgets.chart,
            clock: this.props.activeWidgets.clock,
            tasks: this.props.activeWidgets.tasks,
            weather: this.props.activeWidgets.weather
        }
        this.props.setWidgets(obj);
    }
    selectType(e) {
        this.setState({ pickedType: e.target.value })
    }
    selectTitle(e) {
        this.setState({ pickedTitle: e.target.value })
    }
    addReminder() {
        var newId = (this.props.notifications.length === 0 ? 0 : this.props.notifications[this.props.notifications.length - 1].id + 1);
        var newNoti = {
            id: newId,
            type: this.state.pickedType.toLowerCase(),
            name: this.state.pickedTitle,
            date: this.state.pickedDate
        }
        this.props.updateNotification([...this.props.notifications, newNoti]);
        this.setState({ pickedTitle: '' })
        console.log(this.state.pickedDate);
    }
    hideForm() {
        this.setState({ showForm: false })
    }
    render() {
        const { showPickyDateTime } = this.state
        return (
            <div id="calendar" className="widget">
                <div className="delete-widget" onClick={this.hideWidget}><Close /></div>
                <Modal id="calendar-modal" open={this.state.showForm} >
                    <div id="add-reminder" style={{background: 'white'}}>
                        <ClickAwayListener onClickAway={this.hideForm}>
                            <div className="form">
                                <TextField
                                    label="Date"
                                    defaultValue={this.state.pickedDate}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    select
                                    value={this.state.pickedType}
                                    onChange={this.selectType}
                                    label="Type"
                                    SelectProps={{ native: true }}>
                                    {notificationOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Title"
                                    placeholder="Enter Reminder"
                                    onChange={this.selectTitle}
                                />
                                <Button onClick={this.addReminder} variant="contained" color="primary">
                                    Add Reminder
                                </Button>
                            </div>
                        </ClickAwayListener>
                    </div>
                </Modal>
                <PickyDateTime
                size="xs"
                mode={0}
                show={showPickyDateTime}
                locale="en-us"
                onClose={() => this.setState({ showPickyDateTime: false })}
                onYearPicked={res => this.onYearPicked(res)}
                onMonthPicked={res => this.onMonthPicked(res)}
                onDatePicked={res => this.onDatePicked(res)}
                onResetDate={res => this.onResetDate(res)}
                onSecondChange={res => this.onSecondChange(res)}
                onMinuteChange={res => this.onMinuteChange(res)}
                onHourChange={res => this.onHourChange(res)}
                onMeridiemChange={res => this.onMeridiemChange(res)}
                onResetTime={res => this.onResetTime(res)}
                onClearTime={res => this.onClearTime(res)}
                />
            </div>
        )
    }
}

Calendar.propTypes = {
    setWidgets: PropTypes.func.isRequired,
    activeWidgets: PropTypes.object.isRequired,
    updateNotification: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    activeWidgets: state.siteData.activeWidgets,
    notifications: state.siteData.notifications
});

export default connect(mapStateToProps, { setWidgets, updateNotification })(Calendar);