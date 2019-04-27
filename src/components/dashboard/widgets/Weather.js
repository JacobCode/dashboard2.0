import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { getWeather, getForecast } from '../../../redux/actions/actions';

import Button from '@material-ui/core/Button';

import '../../../scss/Weather.scss';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            forecastUrl: 'https://api.weatherbit.io/v2.0/forecast/daily',
            currentUrl: 'https://api.weatherbit.io/v2.0/current/',
            lat: '',
            lon: '',
            units: 'i',
            api_key: window.location.hostname === 'localhost' ? '84943a6dbebd4dfdb01b18356ee4024f' : process.env.API_KEY,
            showWeather: false
        }
        this.changeUnits = this.changeUnits.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }
    changeUnits() {
        this.setState({ units: 'm' })
    }
    componentWillReceiveProps(props) {
        if (props.forecast[0] !== undefined) {
            this.setState({ showWeather: true })
        }
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({ lat: pos.coords.latitude, lon: pos.coords.longitude, showWeather: true });
                if (this.state.showWeather) {
                    // Get current day
                    axios.get(`${this.state.currentUrl}?lat=${this.state.lat}&lon=${this.state.lon}&key=${this.state.api_key}&units=${this.state.units}`)
                        .then((res) => res.data.data[0])
                        .then(weather => {
                            this.props.getWeather(weather);
                        })
                    // Get forecast
                    axios.get(`${this.state.forecastUrl}?lat=${this.state.lat}&lon=${this.state.lon}&key=${this.state.api_key}&units=${this.state.units}`)
                        .then((res) => res.data.data)
                        .then((forecast) => {
                            this.props.getForecast(forecast.filter((day) => forecast.indexOf(day) <= 6));
                        })
                }
            }, (err) => { console.log(err) }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
        }  else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    render() {
        return (
            <div id="weather" className="widget">
                {this.state.showWeather === true && this.props.forecast[0] !== undefined ? 
                    <div className="results">
                        <div className="temp">
                            <div className="temp-current">
                                {this.props.weather.temp} {this.state.unit === 'i' ? <span>&#8451;</span> : <span>&#8457;</span>}
                            </div>
                            <div className="temp-other">
                                <span>HI: {this.props.forecast[0].max_temp}</span>
                                <span>LO: {this.props.forecast[0].min_temp}</span>
                            </div>
                        </div>
                        <p className="location">
                            {this.props.weather.city_name}, {this.props.weather.state_code}
                        </p>
                    </div>
                : 
                <Button onClick={this.getLocation} variant="contained" color="primary">
                    Allow Location Services
                </Button>}
            </div>
        )
    }
}

Weather.propTypes = {
    weather: PropTypes.object.isRequired,
    forecast: PropTypes.array.isRequired,
    getWeather: PropTypes.func.isRequired,
    getForecast: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    forecast: state.siteData.forecast,
    weather: state.siteData.weather,
});

export default connect(mapStateToProps, { getWeather, getForecast })(Weather);