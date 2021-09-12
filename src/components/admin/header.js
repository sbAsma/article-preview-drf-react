import React from 'react';
import {useHistory} from "react-router-dom"
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAdminContext } from "../context/AdminContexProvider";
import axiosInstance from '../../axios';

const useStyles = makeStyles((theme) => ({
	appBar: {
		// borderBottom: `1px solid ${theme.palette.divider}`,
		zIndex: theme.zIndex.drawer + 1,
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

const LogInOutButtons = (props) => {
	if(props.isLoggedIn == true){
		return (
			<React.Fragment>
				<Typography >{props.username}</Typography>
				<Button
					color="primary"
					variant="outlined"
					className={props.classes.link}
					onClick = {() => props.handleLogout() }
				>
					Logout
				</Button>
			</React.Fragment>
		)
	}
	else if(props.isSigningUp){
		return(
			<Button
				color="primary"
				variant="outlined"
				className={props.classes.link}
				onClick={() => props.redirectLogin()}
			>
				Login
			</Button>
		)
	}
	else{
		return(
			<Button
				color="textPrimary"
				className={props.classes.link}
				onClick = {() => props.redirectSignUp()}
			>
				Sign up
			</Button>
		)
	}
}

export default function Header(props) {
	const history = useHistory()
	// to be optimized with another function component fo loging buttons
	const {adminState: {
		isLoggedIn,
		isSigningUp,
		isLoggingIn,
		username,
		user}, setAdminState} = useAdminContext()
    
	const redirectLogin = () =>{
        setAdminState({isSigningUp: false, isLoggedIn: false,isLoggingIn: true,})
    }
    const redirectSignUp = () =>{
        setAdminState({isSigningUp: true, })
    }
	const handleLogout = () => {
        const response = axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token')
        }).then((res) => {
            // test the response !!!
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('current_user')
            axiosInstance.defaults.headers['Authorization'] = null
            setAdminState({
                isLoggedIn: false,
                isSigningUp: false,
                username: '',
                user: {},
            })
            history.push('/admin')
        })
    }
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="fixed"
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
					<LogInOutButtons
						isSigningUp={isSigningUp}
						isLoggingIn={isLoggingIn}
						isLoggedIn={isLoggedIn}
						username={username}
						redirectLogin={redirectLogin}
						redirectSignUp={redirectSignUp}
						handleLogout={handleLogout}
						classes={classes}
					/>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
}