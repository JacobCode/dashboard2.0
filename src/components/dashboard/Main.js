import React, { Component } from 'react';

// SCSS
import '../../scss/Widgets.scss';

// Widgets
import Tasks from './widgets/Tasks';
import Calendar from './widgets/Calendar';
import Bookmarks from './widgets/Bookmarks';
import PieChart from './widgets/PieChart';
import LineChart from './widgets/LineChart';
import Clock from './widgets/Clock';

export default class Main extends Component {
    render() {
        return (
            <div id="widget-grid">
                <Tasks />
                <Clock />
                <PieChart />
                <LineChart />
                <Calendar />
                <Bookmarks />
            </div>
        )
    }
}