import React, { useEffect, useState }  from 'react';

import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		// borderBottom: `1px solid ${theme.palette.divider}`,
		backgroundColor: 'hsl(212, 23%, 69%)',
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		marginLeft: '10px',
		flexGrow: 1,
	}
}));

// const Log = (props) => {
// 	// 	console.log(props)
// 	// return <div>hello</div>
// 	
// 	// const [appState, setAppState] = useState(props)
// 	// const [loginState, setLoginState] = useState({
// 	// 	isLoggedIn: false,
// 	// 	user: null,
// 	// })
// 	// useEffect(() => {
// 	// 	console.log("userEffect has been called through Log")
// 	// 	setLoginState({
// 	// 		isLoggedIn: props.isLoggedIn,
// 	// 		user: props.user,
// 	// 	})
// 	// }, [setLoginState])
// 	// console.log("login state", loginState.isLoggedIn)
// 	const classes = useStyles();
// 
// 	if(props.isLoggedIn == true) return (
// 		<React.Fragment>
// 			<Typography >{loginState.user.user_name}</Typography>
// 			<Button
// 				href="#"
// 				color="primary"
// 				variant="outlined"
// 				className={classes.link}
// 				component={NavLink}
// 				to="/logout"
// 			>
// 				Logout
// 			</Button>
// 		</React.Fragment>
// 	)
// 	else return(
// 		<React.Fragment>
// 			<nav>
// 				<Link
// 					color="textPrimary"
// 					href="#"
// 					className={classes.link}
// 					component={NavLink}
// 					to="/signup"
// 				>
// 					Sign up
// 				</Link>
// 			</nav>
// 			<Button
// 				href="#"
// 				color="primary"
// 				variant="outlined"
// 				className={classes.link}
// 				component={NavLink}
// 				to="/login"
// 			>
// 				Login
// 			</Button>
// 		</React.Fragment>
// 	)
// }

function Header(props) {
	// console.log("header props", props)
	// const [appState, setAppState] = useState({
	// 	isLoggedIn: props.isLoggedIn,
	// 	user: props.user,
	// })
	// useEffect(()=>{
	// 	// console.log("useEffect has been called from Header")
	// 	// setAppState(props)
	// }, [setAppState])
	const classes = useStyles();
	if(props.isLoggedIn == true) return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="white"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar>
					<Typography 
						variant="h6" 
						color="inherit" 
						noWrap 
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
						Articles Preview
						</Link>
					</Typography>
				<Typography >{props.username}</Typography>
				<Button
					href="#"
					color="primary"
					variant="outlined"
					className={classes.link}
					onClick = {() => props.handleLogout() }
					// component={NavLink}
					// to="/logout"
				>
					Logout
				</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
	else return(
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="white"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar>
					<Typography 
						variant="h6" 
						color="inherit" 
						noWrap 
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
						Articles Preview Page
						</Link>
					</Typography>
			<nav>
				<Button
					color="textPrimary"
					// href="#"
					className={classes.link}
					onClick = {() => props.redirectSignUp()}
					style={{
						display: props.isSigningUp && 'none',
					}}
					// component={NavLink}
					// to="/signup"
				>
					Sign up
				</Button>
			</nav>
			<Button
				// href="#"
				color="primary"
				variant="outlined"
				className={classes.link}
				onClick={() => props.redirectLogin()}
				style={{
					display: props.isLoggingIn && 'none',
				}}
				// component={NavLink}
				// to="/login"
			>
				Login
			</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
	// return (
	// 	<React.Fragment>
	// 		<CssBaseline />
	// 		<AppBar
	// 			position="static"
	// 			color="white"
	// 			elevation={0}
	// 			className={classes.appBar}
	// 		>
	// 			<Toolbar>
	// 				<Typography 
	// 					variant="h6" 
	// 					color="inherit" 
	// 					noWrap 
	// 					className={classes.toolbarTitle}
	// 				>
	// 					<Link
	// 						component={NavLink}
	// 						to="/"
	// 						underline="none"
	// 						color="textPrimary"
	// 					>
	// 					Articles Preview
	// 					</Link>
	// 				</Typography>
	// 				<Log isLoggedIn={appState.isLoggedIn} user={appState.user}/>
	// 			</Toolbar>
	// 		</AppBar>
	// 	</React.Fragment>
	// );
}

export default Header;
