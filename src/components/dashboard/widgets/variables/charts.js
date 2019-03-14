var Chartist = require("chartist");

// Animation Delays
var delays = 80,
    durations = 500;

const circleChart = {
    data: {
        // labels: []
        series: [30, 30, 40]
    },
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 100,
    }
}

const dailySalesChart = {
    data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        series: [
            [10, 15, 25, 30, 25, 15, 10]
        ]
    },
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    // for animation
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
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

const lineChart = {
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        series: [
            [5, 7, 5, 8, 13, 9, 15]
        ]
    },
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
    // for animation
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
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

module.exports = {
    circleChart,
    dailySalesChart,
    lineChart
};