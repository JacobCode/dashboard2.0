import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import '../../scss/ManageWidgets.scss';

import { setWidgets } from '../../redux/actions/actions';

const widgets = ['tasks', 'clock', 'chart', 'calendar', 'bookmarks', 'weather'];

class ManageWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.activeWidgets.tasks,
            clock: props.activeWidgets.clock,
            chart: props.activeWidgets.chart,
            calendar: props.activeWidgets.calendar,
            bookmarks: props.activeWidgets.bookmarks,
            weather: props.activeWidgets.weather
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.updateWidgets = this.updateWidgets.bind(this);
    }
    handleToggle(e, widget) {
        switch (widget) {
            case 'tasks':
                this.setState({ tasks: !this.state.tasks });
                break;
            case 'clock':
                this.setState({ clock: !this.state.clock });
                break;
            case 'chart':
                this.setState({ chart: !this.state.chart });
                break;
            case 'calendar':
                this.setState({ calendar: !this.state.calendar });
                break;
            case 'bookmarks':
                this.setState({ bookmarks: !this.state.bookmarks });
                break;
            case 'weather':
                this.setState({ weather: !this.state.weather });
                break;
            default: 
                break;
        }
    }
    updateWidgets() {
        var activeWidgets = {
            tasks: this.state.tasks,
            clock: this.state.clock,
            chart: this.state.chart,
            calendar: this.state.calendar,
            bookmarks: this.state.bookmarks,
            weather: this.state.weather,
        }
        this.props.setWidgets(activeWidgets);
    }
    render() {
        const { tasks, clock, chart, calendar, bookmarks, weather } = this.state;
        return (
            <div id="manage-widgets">
                <h1 className="title">Manage Widgets</h1>
                <div className="content">
                    <div className="widgets">
                        {widgets.map((widget) => {
                            return (
                                <div key={widget} className={`widget ${widget}`}>
                                    <h1>{widget}</h1>
                                    <Switch
                                    checked={
                                        widget === 'tasks' ? tasks : 
                                        widget === 'clock' ? clock : 
                                        widget === 'chart' ? chart : 
                                        widget === 'calendar' ? calendar : 
                                        widget === 'bookmarks' ? bookmarks : 
                                        widget === 'weather' ? weather : null
                                    }
                                    onChange={e => this.handleToggle(e, widget)}
                                    color="primary"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <Button onClick={this.updateWidgets} variant="contained" color="primary">
                        Update Widgets
                    </Button>
                </div>
            </div>
        )
    }
}

ManageWidgets.propTypes = {
    activeWidgets: PropTypes.object.isRequired,
    setWidgets: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    activeWidgets: state.siteData.activeWidgets,
});

export default connect(mapStateToProps, { setWidgets })(ManageWidgets);