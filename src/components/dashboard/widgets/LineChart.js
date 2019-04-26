import React, { Component } from 'react';
import ChartistGraph from "react-chartist";
import Chartist from 'chartist';

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
    },
    // Animations
    animation: {
        draw: function (data) {
            if (data.type === "line" || data.type === "area") {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                            .clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === "point") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * 80,
                        dur: 500,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

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