import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';
import store from './redux/store';

// SCSS
import './scss/main.scss';

// Container
import Dashboard from './containers/Dashboard';

// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

deepPurple.main = '#fe9a04';
deepPurple.contrastText = 'rgba(255, 255, 255, 0.87)';
deepPurple["A700"] = '#e38b07';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: deepPurple,
	},
	typography: {
		useNextVariants: true,
	}
});

class App extends Component {
	render() {
		return (
		<Provider store={store}>
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<Dashboard />
					<Link className="hidden-btn" to="/"></Link>
				</MuiThemeProvider>
			</BrowserRouter>
		</Provider>
		);
	}
}

export default App;
