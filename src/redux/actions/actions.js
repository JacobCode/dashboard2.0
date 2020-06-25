import {
	LOGIN_USER,
	UPDATE_TASKS,
	UPDATE_BOOKMARKS,
	UPDATE_NOTIFICATIONS,
	SET_FORECAST,
	SET_CURRENT_WEATHER,
	SET_WIDGETS,
	GET_USER_FILES,
	LOGOUT_USER,
	UPLOAD_FILE,
	DELETE_FILE,
	VIEW_FILE
} from './types';

import axios from 'axios';

const API_URL = 'https://modern-dashboard.herokuapp.com';

// Login User
export const loginUser = (user) => dispatch => {
	dispatch({
		type: LOGIN_USER,
		payload: user
	});
}

// Logout User
export const logoutUser = () => dispatch => {
	const user = {};
	dispatch({
		type: LOGOUT_USER,
		payload: user
	});
}

// Add Task
export const updateTasks = (tasks, user, type) => dispatch => {
	user[type] = tasks;
	axios.post(`${API_URL}/user/${user._id}/${type === 'bugsData' ? 'bugs' : type === 'websiteData' ? 'website' : type === 'serverData' ? 'server' : null}`, { tasks })
		.then((res) => {
			dispatch({
				type: UPDATE_TASKS,
				payload: user
			});
		})
		.catch((err) => console.log(err.response));
}

// Update Bookmarks
export const updateBookmarks = (bookmarks, user) => dispatch => {
	user.bookmarks = bookmarks;
	axios.post(`${API_URL}/user/${user._id}/bookmarks`, { bookmarks })
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
    });
}

// Weather (Forecast)
export const getForecast = forecast => dispatch => {
    dispatch({
        type: SET_FORECAST,
        payload: forecast
    });
}

// Set Widgets
export const setWidgets = widgets => dispatch => {
    dispatch({
        type: SET_WIDGETS,
        payload: widgets
    });
}

// Get All User Files
export const getUserFiles = (user) => dispatch => {
	axios.get(`${API_URL}/user/files/${user._id}`)
		.then((res) => {
			user.files = res.data
			dispatch({
				type: GET_USER_FILES,
				payload: user
			});
		})
		.catch((err) => console.log(err));
}

// Upload File
export const uploadFile = (user, files) => dispatch => {
	user.files = files;
	dispatch({
		type: UPLOAD_FILE,
		payload: user
	});
}

// Delete File
export const deleteFile = (user, file) => dispatch => {
	user.files = user.files.filter((f) => f._id !== file._id);
	axios.delete(`${API_URL}/user/files/delete/${file._id}/${user._id}`)
		.then((res) => {
			dispatch({
				type: DELETE_FILE,
				payload: user
			});
		});
}

// Preview File
export const viewFile = file => dispatch => {
	dispatch({
		type: VIEW_FILE,
		payload: file
	});
}