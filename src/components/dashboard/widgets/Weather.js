import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Close from '@material-ui/icons/Close';

import { getWeather, getForecast, setWidgets } from '../../../redux/actions/actions';

import Button from '@material-ui/core/Button';

import '../../../scss/Weather.scss';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            forecastUrl: 'https://api.weatherbit.io/v2.0/forecast/daily',
            currentUrl: 'https://api.weatherbit.io/v2.0/current/',
            iconUrl: 'https://www.weatherbit.io/static/img/icons/',
            lat: '',
            lon: '',
            units: 'i',
            api_key: '84943a6dbebd4dfdb01b18356ee4024f',
            showWeather: false,
            forecast: []
        }
        this.getLocation = this.getLocation.bind(this);
        this.hideWidget = this.hideWidget.bind(this);
    }
    componentWillReceiveProps(props) {
        if (props.forecast[0] !== undefined) {
            var d = new Date();
            var day = d.getDay();
            var week = props.forecast;
            var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            var forecast = [];
            week.forEach((dt) => {
                if (day + week.indexOf(dt) <= 6) {
                    forecast.push(days[day + week.indexOf(dt)]);
                } else {
                    forecast.push(days[(day + week.indexOf(dt) - 7)]);
                }
            });
            if (forecast.length > 1) {
                this.setState({ showWeather: true, forecast: forecast });
            }
        }
    }
    getLocation() {
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
        })
    }
    hideWidget() {
        // Hide weather widget
        var obj = {
            bookmarks: this.props.activeWidgets.bookmarks,
            calendar: this.props.activeWidgets.calendar,
            chart: this.props.activeWidgets.chart,
            clock: this.props.activeWidgets.clock,
            tasks: this.props.activeWidgets.tasks,
            weather: false
        }
        this.props.setWidgets(obj);
    }
    componentDidMount() {
        // this.getLocation();
    }
    render() {
        return (
            <div style={{maxHeight: `${this.props.forecast[0] === undefined ? '125px' : '275px'}`}} id="weather" className="widget">
                <div className="delete-widget" onClick={this.hideWidget}><Close /></div>
                {this.state.showWeather === true && this.props.forecast[0] !== undefined ? 
                    <div className="results">
                        <div className="temp">
                            <div className="temp-current">
                                {this.props.weather.temp} {this.state.unit === 'i' ? <span>&#8451;</span> : <span>&#8457;</span>}
                            </div>
                            <div className="temp-other">
                                <p>HI: <span>{this.props.forecast[0].max_temp.toString().split('.')[0]}</span></p>
                                <p>LO: <span>{this.props.forecast[0].min_temp.toString().split('.')[0]}</span></p>
                            </div>
                        </div>
                        <p className="location">
                            {/* <span>{this.state.forecast[6]}</span> */}
                            <span>{this.props.weather.city_name}, {this.props.weather.state_code}</span>
                        </p>
                        <Divider />
                        <div className="week">
                            {this.props.forecast.filter((d => this.props.forecast.indexOf(d) > 0)).map((day, i) => {
                                return (
                                    <div key={i} className="day">
                                        <span>{this.state.forecast[this.props.forecast.indexOf(day) -1]}</span>
                                        <img src={`${this.state.iconUrl}${this.props.forecast[i].weather.icon}.png`} alt={this.props.forecast[i].weather.description} />
                                        <span>{this.props.forecast[i].app_max_temp.toString().split('.')[0]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                : 
                <div>
                    <h1>Weather</h1>
                    <Button onClick={this.getLocation} variant="contained" color="primary">
                        Allow Location Services
                    </Button>
                </div>}
            </div>
        )
    }
}

Weather.propTypes = {
    weather: PropTypes.object.isRequired,
    forecast: PropTypes.array.isRequired,
    getWeather: PropTypes.func.isRequired,
    getForecast: PropTypes.func.isRequired,
    setWidgets: PropTypes.func.isRequired,
    activeWidgets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    forecast: state.siteData.forecast,
    weather: state.siteData.weather,
    activeWidgets: state.siteData.activeWidgets
});

export default connect(mapStateToProps, { getWeather, getForecast, setWidgets })(Weather);