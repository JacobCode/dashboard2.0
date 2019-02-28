import React, { Component } from 'react';

// SCSS
import '../../scss/Notifications.scss';

export default class DashboardView extends Component {
    render() {
        return (
            <div id="notifications">
                <h1>Notifications</h1>
                <div className="notifications-content">
                    <div id="work" className="section">
                        WORK
                    </div>
                    <div id="school" className="section">
                        SCHOOL
                    </div>
                    <div id="personal" className="section">
                        PERSONAL
                    </div>
                </div>
            </div>
        )
    }
}