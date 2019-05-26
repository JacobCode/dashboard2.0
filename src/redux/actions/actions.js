import {
	LOGIN_USER,
	UPDATE_TASKS,
	UPDATE_BOOKMARKS,
	UPDATE_NOTIFICATIONS,
    SET_FORECAST,
    SET_CURRENT_WEATHER,
    SET_WIDGETS
} from './types';

import axios from 'axios';

const API_URL = '';

// Login User
export const loginUser = (user) => dispatch => {
	dispatch({
		type: LOGIN_USER,
		payload: user
	})
}

// ---------------------------------------------------

// ADD TASKS ✅
export const addTask = (tasks, userId, user, type) => dispatch => {
	user[type] = tasks;
	axios.post(`${API_URL}/user/${userId}/${type === 'bugsData' ? 'bugs' : type === 'websiteData' ? 'website' : type === 'serverData' ? 'server' : null}`, { tasks })
		.then((res) => {
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: UPDATE_TASKS,
				payload: user
			});
		})
		.catch((err) => console.log(err.response));
}

// DELETE TASKS ✅
export const deleteTask = (userId, tasks, user, type) => dispatch => {
	user[type] = tasks;
	axios.post(`${API_URL}/user/${userId}/${type === 'bugsData' ? 'bugs' : type === 'websiteData' ? 'website' : type === 'serverData' ? 'server' : null}`, {
		tasks
	})
		.then((res) => {
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: UPDATE_TASKS,
				payload: user
			});
		})
		.catch((err) => console.log(err.response));

}

// ---------------------------------------------------


// Update Bookmarks ✅
export const addBookmark = (bookmarks, userId, user) => dispatch => {
	user.bookmarks = bookmarks;
	axios.post(`${API_URL}/user/${userId}/bookmarks`, { bookmarks })
		.then((res) => {
			console.log(res);
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: UPDATE_BOOKMARKS,
				payload: user
			});
		})

}

// Update Notifications
export const updateNotifications = (notifications, userId, user) => dispatch => {
	console.log(notifications);
	user.notifications = notifications;
	axios.post(`${API_URL}/user/${userId}/notifications`, { notifications })
		.then((res) => {
			console.log(res);
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: UPDATE_NOTIFICATIONS,
				payload: user
			});
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