import React, { Component } from 'react';
import PickyDateTime from 'react-picky-date-time';

class Clock extends Component {
    constructor() {
        super();
        this.state = {
            showPickyDateTime: true,
            time: '',
            date: '',
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.startTime = this.startTime.bind(this);
        this.getDate = this.getDate.bind(this);
    }
    getDate() {
        var d = new Date();
        var weekDay = this.state.days[d.getDay() - 1];
        var month = this.state.months[d.getMonth()];
        var dayNum = d.getDate();
        this.setState({ date: `${weekDay}, ${month} ${dayNum}` })
    }
    startTime() {
        var d = new Date();
        var hour = d.getHours();
        var minute = d.getMinutes();
        minute = this.checkTime(minute);
        this.setState({ time: `${hour}:${minute}` })
        var t = setTimeout(this.startTime, 500);
    }
    checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
    componentDidMount() {
        this.startTime();
        this.getDate();
    }
    render() {
        const { showPickyDateTime } = this.state
        return (
            <div id="clock" className="widget">
                <PickyDateTime
                size="xs"
                mode={2}
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
                <div className="time">
                    {this.state.time}
                </div>
                <div className="date">
                    {this.state.date}
                </div>
            </div>
        )
    }
}

export default Clock;