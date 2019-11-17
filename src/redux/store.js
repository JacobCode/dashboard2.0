import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const saveToLocalStorage = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch(e) {
		console.log(e);
	}
}

const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) return undefined
		return JSON.parse(serializedState);
	} catch(e) {
		return {}
	}
}

const initialState = loadFromLocalStorage();

// Array of middleware
const middleware = [thunk];
// Store
const store = createStore(
	rootReducer,
	initialState,
	compose(
		// Add middleware
		applyMiddleware(...middleware)
	)
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;