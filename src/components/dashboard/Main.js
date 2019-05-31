import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import '../../scss/Widgets.scss';

// Widgets
import Tasks from './widgets/Tasks';
import Calendar from './widgets/Calendar';
import Bookmarks from './widgets/Bookmarks';
import Weather from './widgets/Weather';
import LineChart from './widgets/LineChart';
import Clock from './widgets/Clock';
import Crypto from './widgets/Crypto';

class Main extends Component {
    render() {
        return (
            <div id="widget-grid">
                {Boolean(this.props.activeWidgets.tasks) === true ? <Tasks /> : null}
                {Boolean(this.props.activeWidgets.calendar) === true ? <Calendar /> : null}
                {Boolean(this.props.activeWidgets.clock) === true ? <Clock /> : null}
                {Boolean(this.props.activeWidgets.weather) === true ? <Weather /> : null}
                {Boolean(this.props.activeWidgets.bookmarks) === true ? <Bookmarks /> : null}
                {Boolean(this.props.activeWidgets.chart) === true ? <LineChart /> : null}
				{Boolean(this.props.activeWidgets.crypto) === true ? <Crypto /> : null}
            </div>
        )
    }
}

Main.propTypes = {
    activeWidgets: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    activeWidgets: state.siteData.activeWidgets,
});

export default connect(mapStateToProps)(Main);