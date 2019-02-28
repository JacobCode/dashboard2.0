import React, { Component } from 'react';
import ChartistGraph from "react-chartist";

// Charts
import { circleChart } from './variables/charts';

// SCSS
import '../../../scss/Graph.scss';

class PieChart extends Component {
    render() {
        return (
            <div id="pie-chart" className="widget">
                <div className="chart-container">
                    <ChartistGraph
                    className="ct-chart ct-golden-section ct-negative-labels"
                    data={circleChart.data}
                    options={circleChart.options}
                    type="Pie"
                    />
                </div>
            </div>
        )
    }
}

export default PieChart;