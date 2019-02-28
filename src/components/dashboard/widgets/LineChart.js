import React, { Component } from 'react';
import ChartistGraph from "react-chartist";

// Charts
import { dailySalesChart } from './variables/charts';

// SCSS
import '../../../scss/Graph.scss';

class LineChart extends Component {
    render() {
        return (
            <div id="line-chart" className="widget">
                <div className="chart-container">
                    <ChartistGraph
                    className="ct-chart"
                    data={dailySalesChart.data}
                    type="Line"
                    options={dailySalesChart.options}
                    listener={dailySalesChart.animation}
                    />
                </div>
            </div>
        )
    }
}

export default LineChart;