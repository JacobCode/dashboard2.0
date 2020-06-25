import React from 'react';
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
import orange from '@material-ui/core/colors/orange';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

orange.main = '#fe9a04';
orange.contrastText = 'rgba(255, 255, 255, 0.87)';
orange["A700"] = '#e38b07';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: orange,
	},
	typography: {
		useNextVariants: true,
	}
});

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<Dashboard />
					<Link className="hidden-btn" to="/">null</Link>
				</MuiThemeProvider>
			</BrowserRouter>
		</Provider>
	)
}

export default App;
