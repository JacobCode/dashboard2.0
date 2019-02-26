import React, { Component } from 'react';

// SCSS
import '../../../scss/Footer.scss';

export default class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <div className="links">
                    <span>Link</span>
                    <span>Link</span>
                    <span>Link</span>
                </div>
                <div className="copyright">
                    &copy; 2019 Jacob Carver
                </div>
            </div>
        )
    }
}