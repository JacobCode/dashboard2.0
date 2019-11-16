import React, { Component } from 'react';

// SCSS
import '../../../scss/Footer.scss';

export default class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <div className="links">
                    <a href="https://github.com/JacobCode"><i className="fab fa-github" /></a>
                    <a href="https://github.com/JacobCode/dashboard2.0"><i className="fas fa-code-branch" /></a>
                </div>
                <div className="copyright">
					<a href="https://jacobcarver.net">
						&copy; 2019
						Jacob
					</a>
                </div>
            </div>
        )
    }
}