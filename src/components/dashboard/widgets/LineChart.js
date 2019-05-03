import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setWidgets } from '../../../redux/actions/actions';

import ChartistGraph from "react-chartist";
import Close from '@material-ui/icons/Close';

// SCSS
import '../../../scss/Graph.scss';

const lineChart = {
    // Data
    data: {
        // Horizontal numbers
        labels: [1, 2, 3, 4, 5, 6, 7],
        series: [
            [5, 7, 5, 8, 13, 9, 15]
        ]
    },
    // Options
    options: {
        low: 0,
        high: 20,
        showArea: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }
};

class LineChart extends Component {
    constructor() {
        super();
        this.hideWidget = this.hideWidget.bind(this);
    }
    hideWidget() {
        // Hide chart widget
        var obj = {
            bookmarks: this.props.activeWidgets.bookmarks,
            calendar: this.props.activeWidgets.calendar,
            chart: false,
            clock: this.props.activeWidgets.clock,
            tasks: this.props.activeWidgets.tasks,
            weather: this.props.activeWidgets.weather
        }
        this.props.setWidgets(obj);
    }
    render() {
        return (
            <div id="line-chart" className="widget">
                <div className="delete-widget" onClick={this.hideWidget}><Close /></div>
                <div className="chart-container">
                    <ChartistGraph
                    className="ct-chart"
                    data={lineChart.data}
                    type="Line"
                    options={lineChart.options}
                    listener={lineChart.animation}
                    />
                </div>
            </div>
        )
    }
}

LineChart.propTypes = {
    setWidgets: PropTypes.func.isRequired,
    activeWidgets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    activeWidgets: state.siteData.activeWidgets
});

export default connect(mapStateToProps, { setWidgets })(LineChart);