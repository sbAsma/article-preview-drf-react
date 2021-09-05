import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Redirect, BrowserRouter as Router, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import Admin from './Admin'
import ManageArticles from './components/admin/manageArticles'
// import Create from './components/admin/create'
// import Edit from './components/admin/edit'
// import Delete from './components/admin/delete'
// import Login from './components/auth/login'
import Logout from './components/auth/logout'
// import Signup from './components/auth/signup'
import reportWebVitals from './reportWebVitals';

const isNotLoggedIn = localStorage.getItem('current_user') == null

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
		    	<Route exact path="/" component={App} />
		    	<Route exact path="/admin" component={Admin} />
		    	{/* <Route exact path= component={} /> */}
		  {/*   	<Route exact path="/admin/manage"> */}
				{/*   {isNotLoggedIn ? <Redirect to="/admin" /> : <ManageArticles />} */}
				{/* </Route> */}
		    	{/* <Route exact path="/admin/create" component={Create} /> */}
		    	{/* <Route exact path="/admin/edit/:id" component={Edit} /> */}
		    	{/* <Route exact path="/admin/delete/:id" component={Delete} /> */}
		    	{/* <Route path="/login" component={Login} /> */}
		    	<Route path="/logout" component={Logout} />
		    	{/* <Route path="/signup" component={Signup} /> */}
		    </Switch>
		</React.StrictMode>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
