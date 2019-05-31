import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setWidgets } from '../../../redux/actions/actions';

import PickyDateTime from 'react-picky-date-time';
import Close from '@material-ui/icons/Close';

class Clock extends Component {
    constructor() {
        super();
        this.state = {
            showPickyDateTime: false,
            time: '',
            date: '',
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.startTime = this.startTime.bind(this);
        this.getDate = this.getDate.bind(this);
        this.hideWidget = this.hideWidget.bind(this);
    }
    getDate() {
        var d = new Date();
        var weekDay = this.state.days[d.getDay()];
        var month = this.state.months[d.getMonth()];
        var dayNum = d.getDate();
        this.setState({ date: `${weekDay}, ${month} ${dayNum}` })
    }
    startTime() {
        var d = new Date();
        var hour = d.getHours();
        var minute = d.getMinutes();
        if (hour > 12) {
            hour = d.getHours() - 12;
        }
        if (minute < 10) {
            minute = `0${minute}`
        }
        this.setState({ time: `${hour}:${minute}` })
        setTimeout(this.startTime, 500);
    }
    hideWidget() {
        // Hide clock widget
        var obj = {
            bookmarks: this.props.activeWidgets.bookmarks,
            calendar: this.props.activeWidgets.calendar,
            crypto: this.props.activeWidgets.crypto,
            clock: false,
            tasks: this.props.activeWidgets.tasks,
            weather: this.props.activeWidgets.weather
        }
        this.props.setWidgets(obj);
    }
    componentDidMount() {
        this.getDate();
        this.startTime();
    }
    componentWillMount() {
        this.setState({ showPickyDateTime: true })
    }
    render() {
        const { showPickyDateTime, time, date } = this.state
        return (
            <div id="clock" className="widget">
                <div className="delete-widget" onClick={this.hideWidget}><Close /></div>
                <PickyDateTime
                size="xs"
                mode={2}
                show={showPickyDateTime}
                locale="en-us"
                onClose={() => this.setState({ showPickyDateTime: false })}
                onResetTime={res => this.onResetTime(res)}
                />
                <div className="time">
                    {time}
                </div>
                <div className="date">
                    {date}
                </div>
            </div>
        )
    }
}

Clock.propTypes = {
    setWidgets: PropTypes.func.isRequired,
    activeWidgets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    activeWidgets: state.siteData.activeWidgets
});

export default connect(mapStateToProps, { setWidgets })(Clock);