import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { notificationsData } from './widgets/variables/notifications';

import Fade from '@material-ui/core/Fade';

// SCSS
import '../../scss/Notifications.scss';

class Notifications extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { notifications } = this.props;
        return (
            <Fade in={true}>
                <div id="notifications">
                    <h1>Notifications</h1>
                    <div className="notifications-content">
                        <div id="work" className="section">
                            <h1>Work</h1>
                            {notifications.map((noti, i) => {
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
                            {notifications.map((noti, i) => {
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
                            {notifications.map((noti, i) => {
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
            </Fade>
        )
    }
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    notifications: state.siteData.notifications
});

export default connect(mapStateToProps)(Notifications);