import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div id="error-page">
                <h1>Page Not Found. <a href="/main">Return Home</a></h1>
            </div>
        )
    }
}

export default Error;