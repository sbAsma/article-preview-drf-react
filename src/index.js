import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import Admin from './Admin'
import Header from './components/admin/header'
import ManageArticles from './components/admin/manageArticles'
import AdminProfile from './components/admin/adminProfile'
import ChangePassword from './components/auth/changePassword'
import DeleteProfile from './components/auth/deleteProfile'
import PasswordReset from './components/auth/passwordReset';
import PasswordResetConfirmation from './components/auth/passwordResetConfirmation';
import NotFound from './components/notFound'
import reportWebVitals from './reportWebVitals';
import {AdminProvider} from './components/context/AdminContexProvider'

import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const font =  "'Manrope', sans-serif";

const customTheme = createTheme({
	typography: {
		fontFamily: font,
	},
})

const routing = (
	<Router>
		<Switch>
			<ThemeProvider theme={customTheme}>
				<AdminProvider>
					<Header/>
					<Route exact path="/" component={App} />
					<Route exact path="/user" component={Admin}/>
					<Route exact path="/user/articles" component={ManageArticles}/>
					<Route exact path ="/user/profile" component={AdminProfile} />
					<Route exact path ="/user/change_password" component={ChangePassword} />
					<Route exact path ="/user/delete_account" component={DeleteProfile} />
					<Route exact path ="/user/password_reset" component={PasswordReset} />
					<Route path ="/password_reset/token=:token" component={PasswordResetConfirmation} />
				</AdminProvider>
			</ThemeProvider>
			<Route component={NotFound} />
		</Switch>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
