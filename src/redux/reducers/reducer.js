import {
	LOGIN_USER,
	SET_FORECAST,
	SET_CURRENT_WEATHER,
	SET_WIDGETS
} from '../actions/types';

// Initial State
const initialState = {
	// User Info
	user: localStorage.user !== undefined ? JSON.parse(localStorage.user) : {
		first_name: 'Guest',
		last_name: 'User',
		email: 'example@domain.com',
		username: 'guestuser1',
		notifications: [],
		bookmarks: [],
		bugsData: [],
		websiteData: [],
		serverData: [],
	},
	// Weather (Current Day)
	weather: {},
	// Weather (Forecast)
	forecast: [],
	// Active widgets on dashboard
	activeWidgets: { 
	tasks: true,
	clock: true,
	chart: false,
	calendar: true,
	bookmarks: true,
	weather: true
	}
};

export default ((state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user: action.payload
			};
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
		default: return state;
	}
})