import React, { Component } from 'react';
import ChartistGraph from "react-chartist";

// Charts
import { dailySalesChart, lineChart } from './variables/charts';

// SCSS
import '../../../scss/Graph.scss';

class LineChart extends Component {
    render() {
        return (
            <div id="line-chart" className="widget">
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

export default LineChart;