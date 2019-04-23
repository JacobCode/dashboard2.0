import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import '../../scss/Notifications.scss';

class Notifications extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { notifications } = this.props;
        return (
            <div id="notifications">
                <h1 className="noti-title">Notifications</h1>
                <div className="notifications-content">
                    <div id="work" className="section">
                        <h1>Work - 
                            <span className="work-value">{notifications.filter(type => type.type === 'work').length}</span>
                        </h1>
                        {notifications.map((noti, i) => {
                            if (noti.type === 'work') {
                                return (
                                    <div key={i} className="noti">
                                        <p className="noti-info">&bull; {noti.name}</p>
                                        <span className="noti-date">{noti.date}</span>
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <div id="school" className="section">
                        <h1>School - 
                            <span className="school-value">{notifications.filter(type => type.type === 'school').length}</span>
                        </h1>
                        {notifications.map((noti, i) => {
                            if (noti.type === 'school') {
                                return (
                                    <div key={i} className="noti">
                                        <p className="noti-info">&bull; {noti.name}</p>
                                        <span className="noti-date">{noti.date}</span>
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>
                    <div id="personal" className="section">
                        <h1>Personal - 
                            <span className="personal-value">{notifications.filter(type => type.type === 'personal').length}</span>
                        </h1>
                        {notifications.map((noti, i) => {
                            if (noti.type === 'personal') {
                                return (
                                    <div key={i} className="noti">
                                        <p className="noti-info">&bull; {noti.name}</p>
                                        <span className="noti-date">{noti.date}</span>
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

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    notifications: state.siteData.notifications
});

export default connect(mapStateToProps)(Notifications);