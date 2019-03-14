import React, { Component } from 'react';

import Fade from '@material-ui/core/Fade';

// SCSS
import '../../scss/Widgets.scss';

// Widgets
import Tasks from './widgets/Tasks';
import Calendar from './widgets/Calendar';
import Bookmarks from './widgets/Bookmarks';
// import PieChart from './widgets/PieChart';
import LineChart from './widgets/LineChart';
import Clock from './widgets/Clock';

export default class Main extends Component {
    componentWillUnmount() {
        this.props.startLoading();
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.stopLoading();
        }, 1000)
    }
    render() {
        return (
            <Fade in={true}>
                <div id="widget-grid">
                    <Tasks />
                    <Clock />
                    <LineChart />
                    <Calendar />
                    <Bookmarks />
                </div>
            </Fade>
        )
    }
}