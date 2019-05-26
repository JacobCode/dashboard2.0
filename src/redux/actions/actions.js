import {
	LOGIN_USER,
    SET_FORECAST,
    SET_CURRENT_WEATHER,
    SET_WIDGETS
} from './types';

// Login User
export const loginUser = (user) => dispatch => {
	dispatch({
		type: LOGIN_USER,
		payload: user
	})
}

// Weather (Current Day)
export const getWeather = weather => dispatch => {
    dispatch({
        type: SET_CURRENT_WEATHER,
        payload: weather
    })
}

// Weather (Forecast)
export const getForecast = forecast => dispatch => {
    dispatch({
        type: SET_FORECAST,
        payload: forecast
    })
}

// Set Widgets
export const setWidgets = widgets => dispatch => {
    dispatch({
        type: SET_WIDGETS,
        payload: widgets
    })
}