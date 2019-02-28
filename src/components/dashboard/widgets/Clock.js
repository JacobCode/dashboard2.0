import React, { Component } from 'react';
import PickyDateTime from 'react-picky-date-time';

class Clock extends Component {
    constructor() {
        super();
        this.state = {
            showPickyDateTime: true
        }
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
            </div>
        )
    }
}

export default Clock;