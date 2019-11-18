import {
	LOGIN_USER,
	LOGOUT_USER,
	UPDATE_TASKS,
	UPDATE_BOOKMARKS,
	UPDATE_NOTIFICATIONS,
	SET_FORECAST,
	SET_CURRENT_WEATHER,
	SET_WIDGETS,
	GET_USER_FILES,
	UPLOAD_FILE,
	DELETE_FILE
} from '../actions/types';

// Initial State
const initialState = {
	// User Info
	user: {},
	// Weather (Current Day)
	weather: {},
	// Weather (Forecast)
	forecast: [],
	// Active widgets on dashboard
	activeWidgets: { 
		tasks: true,
		clock: true,
		calendar: true,
		bookmarks: true,
		weather: true,
		crypto: false,
		uploader: true
	}
};

export default ((state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user: action.payload
			};
		case LOGOUT_USER:
			return {
				...state,
				user: action.payload
			}
		case UPDATE_TASKS:
			return {
				...state,
				user: action.payload
			}
		case UPDATE_BOOKMARKS:
			return {
				...state,
				user: action.payload
			}
		case UPDATE_NOTIFICATIONS:
			return {
				...state,
				user: action.payload
			}
		case SET_CURRENT_WEATHER:
			return {
				...state,
				weather: action.payload
			}
		case SET_FORECAST:
			return {
				...state,
				forecast: action.payload
			}
		case SET_WIDGETS:
			return {
				...state,
				activeWidgets: action.payload
			}
		case GET_USER_FILES:
			return {
				...state,
				user: action.payload
			}
		case UPLOAD_FILE:
			return {
				...state,
				user: action.payload
			}
		case DELETE_FILE:
			return {
				...state,
				user: action.payload
			}
		default: return state;
	}
})