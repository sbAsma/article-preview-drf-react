import React, { useState } from 'react';
import {useHistory, NavLink} from "react-router-dom"
import {
	AppBar,
	Toolbar,
	Link,
	Avatar,
	Menu,
	MenuItem,
	Button,
	Typography,
	CssBaseline,
	makeStyles
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BallotIcon from '@material-ui/icons/Ballot';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useUserContext } from "./context/UserContexProvider";
import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: 'hsl(212, 23%, 69%)',
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		marginLeft: '10px',
		flexGrow: 1,
	},
	profileButton: {
		display: 'flex',
		flexDirection: 'row',
		width: '80px',
		padding: '5px',
		color: 'white',
	},
	profileMenu: {
		marginTop: '40px',
		width: '120px',
	},
	menuPaper: {},
	menuItem: {
		fontWeight: 'bold',
	},
	menuItemIcon: {
		marginRight: '10px',
	},
	[theme.breakpoints.down('xs')]: {
		toolbarTitle:{
			fontSize: "medium",
		}
	},
	['@media (max-width:300px)']:{
		toolbarTitle:{
			fontSize: "small",
		}
	},
}));

const LogInOutButtons = (props) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () =>{
		setAnchorEl(null);
	}
	const handleLogout = () => {
		props.handleLogout()
		setAnchorEl(null);
	}
	if(props.isLoggedIn === true && props.user !== undefined){
		return (
            <div>
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
					className={props.classes.profileButton}
                    onClick={handleClick}
                >
                    <Avatar src={props.user.avatar}/>
					<ArrowDropDownIcon/>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
					classes={{ paper: props.classes.profileMenu }}
					className={props.classes.menuPaper}
                >
					{
						window.location.pathname === "/" && 
						<MenuItem onClick={handleClose} className={props.classes.menuItem}>
							<BallotIcon className={props.classes.menuItemIcon}/>
							<Link
								component={NavLink}
								to="user/articles"
								underline="none"
								color="textPrimary"
								onClick={() => setAnchorEl(null)}
							>
								Articles
							</Link>
						</MenuItem>
					}
                    <MenuItem onClick={handleClose} className={props.classes.menuItem}>
						<PersonIcon className={props.classes.menuItemIcon}/>
						<Link
							component={NavLink}
							to={window.location.pathname === "/"? "user/profile" : "profile"}
							underline="none"
							color="textPrimary"
							onClick={() => setAnchorEl(null)}
						>
							Profile
						</Link>
					</MenuItem>
                    <MenuItem onClick={handleLogout} className={props.classes.menuItem}>
						<ExitToAppIcon className={props.classes.menuItemIcon}/>
						Logout
					</MenuItem>
                </Menu>
            </div>
        );
	}
	else if(props.isLoggingIn){
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
	else { // if(props.isSigningUp)
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
	// else{
	// 	return <div></div>
	// }
}

export default function Header(props) {
	const history = useHistory()
	const {userState: {
		isLoggedIn,
		isSigningUp,
		isLoggingIn,
		username,
		user}, setUserState} = useUserContext()
	const redirectLogin = () =>{
        setUserState({isSigningUp: false, isLoggedIn: false,isLoggingIn: true,})
		history.push('/user')
    }
    const redirectSignUp = () =>{
        setUserState({isSigningUp: true, })
    }
	const handleLogout = () => {
        axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token')
        }).then((res) => {
			setUserState({
                isLoggedIn: false,
                isSigningUp: false,
				isLoggingIn: true,
                username: '',
                user: {},
            })
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('current_user')
            axiosInstance.defaults.headers['Authorization'] = null
            history.push('/user')
        }).catch((err) => {
            console.log(err)
        })
    }
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="fixed"
				// color="white"
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
					<LogInOutButtons
						isSigningUp={isSigningUp}
						isLoggingIn={isLoggingIn}
						isLoggedIn={isLoggedIn}
						user={user}
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