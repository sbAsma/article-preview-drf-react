import React from 'react';
import {useHistory} from "react-router-dom"
import { NavLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
	AppBar,
	Toolbar,
	Link,
	Avatar,
	Menu,
	MenuItem,
	Button,
	Typography,
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
                    <MenuItem onClick={handleClose} className={props.classes.menuItem}>
						<PersonIcon className={props.classes.menuItemIcon}/>
						<Link
							component={NavLink}
							to="profile"
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
	else{
		return <div></div>
	}
}

export default function Header(props) {
	const history = useHistory()
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
        axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token')
        }).then((res) => {
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