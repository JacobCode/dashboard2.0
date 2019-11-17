import {
	LOGIN_USER,
	UPDATE_TASKS,
	UPDATE_BOOKMARKS,
	UPDATE_NOTIFICATIONS,
    SET_FORECAST,
    SET_CURRENT_WEATHER,
	SET_WIDGETS,
	GET_USER_FILES
} from './types';

import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Login User
export const loginUser = (user) => dispatch => {
	dispatch({
		type: LOGIN_USER,
		payload: user
	})
}

// Add Task
export const addTask = (tasks, userId, user, type) => dispatch => {
	user[type] = tasks;
	axios.post(`${API_URL}/user/${userId}/${type === 'bugsData' ? 'bugs' : type === 'websiteData' ? 'website' : type === 'serverData' ? 'server' : null}`, { tasks })
		.then((res) => {
			dispatch({
				type: UPDATE_TASKS,
				payload: user
			});
		})
		.catch((err) => console.log(err.response));
}

// Delete Task
export const deleteTask = (userId, tasks, user, type) => dispatch => {
	user[type] = tasks;
	axios.post(`${API_URL}/user/${userId}/${type === 'bugsData' ? 'bugs' : type === 'websiteData' ? 'website' : type === 'serverData' ? 'server' : null}`, {
		tasks
	})
		.then((res) => {
			dispatch({
				type: UPDATE_TASKS,
				payload: user
			});
		})
		.catch((err) => console.log(err.response));

}

// Add Bookmark ✅
export const addBookmark = (bookmarks, userId, user) => dispatch => {
	user.bookmarks = bookmarks;
	axios.post(`${API_URL}/user/${userId}/bookmarks`, { bookmarks })
		.then((res) => {
			dispatch({
				type: UPDATE_BOOKMARKS,
				payload: user
			});
		})

}

// Update Notifications (add & delete)
export const updateNotifications = (notifications, userId, user) => dispatch => {
	user.notifications = notifications;
	axios.post(`${API_URL}/user/${userId}/notifications`, { notifications })
		.then((res) => {
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

// Get All User Files
export const getUserFiles = (user, user_id) => dispatch => {
	axios.get(`${API_URL}/user/files/${user_id}`)
		.then((res) => {
			user.files = res.data
			dispatch({
				type: GET_USER_FILES,
				payload: user
			})
		})
		.catch((err) => console.log(err));
}