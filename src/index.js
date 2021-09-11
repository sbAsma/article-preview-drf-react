import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Redirect, BrowserRouter as Router, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import Admin from './Admin'
import Header from './components/admin/header'
import ManageArticles from './components/admin/manageArticles'
// import Create from './components/admin/create'
// import Edit from './components/admin/edit'
// import Delete from './components/admin/delete'
// import Login from './components/auth/login'
import Logout from './components/auth/logout'
// import Signup from './components/auth/signup'
import reportWebVitals from './reportWebVitals';
import {AdminProvider} from './components/context/AdminContexProvider'

const isNotLoggedIn = localStorage.getItem('current_user') == null

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
		    	<Route exact path="/" component={App} />
				<AdminProvider>
					<Header/>
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/admin/articles">
						{isNotLoggedIn ? <Redirect to="/admin" /> : <ManageArticles />}
					</Route>
				</AdminProvider>
		    	<Route path="/logout" component={Logout} />
		    </Switch>
		</React.StrictMode>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
