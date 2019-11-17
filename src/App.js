import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

// Container
import Dashboard from './containers/Dashboard';

// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

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
				</MuiThemeProvider>
			</BrowserRouter>
		</Provider>
		);
	}
}

export default App;
