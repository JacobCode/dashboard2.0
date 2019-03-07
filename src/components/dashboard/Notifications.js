import React, { Component } from 'react';

import { notificationsData } from './widgets/variables/notifications';

// SCSS
import '../../scss/Notifications.scss';

export default class DashboardView extends Component {
    render() {
        return (
            <div id="notifications">
                <h1>Notifications</h1>
                <div className="notifications-content">
                    <div id="work" className="section">
                        <h1>Work</h1>
                        {notificationsData.map((noti, i) => {
                            if (noti.type === 'work') {
                                return (
                                    <div key={i} className="noti">
                                        &bull; {noti.name}
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <div id="school" className="section">
                        <h1>School</h1>
                        {notificationsData.map((noti, i) => {
                            if (noti.type === 'school') {
                                return (
                                    <div key={i} className="noti">
                                        &bull; {noti.name}
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <div id="personal" className="section">
                        <h1>Personal</h1>
                        {notificationsData.map((noti, i) => {
                            if (noti.type === 'personal') {
                                return (
                                    <div key={i} className="noti">
                                        &bull; {noti.name}
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}