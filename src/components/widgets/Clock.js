import React, { Component } from 'react';

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
    async startTime() {
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
        const { setWidgets } = this.props;
		const { bookmarks, calendar, crypto, uploader, weather, tasks } = this.props.activeWidgets;
        // Hide tasks widget
        var obj = {
            bookmarks,
            calendar,
            crypto,
            clock: false,
            tasks,
			weather,
			uploader,
        }
        setWidgets(obj);
    }
    componentDidMount() {
		this.mounted = true;
		if (this.mounted) {
			this.getDate();
			this.startTime();
		}
    }
    UNSAFE_componentWillMount() {
        this.setState({ showPickyDateTime: true })
	}
	componentWillUnmount() {
		this.mounted = false;
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

export default Clock;