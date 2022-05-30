import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Link,
	CssBaseline,
	makeStyles 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	appBar: {
		// borderBottom: `1px solid ${theme.palette.divider}`,
		backgroundColor: 'hsl(212, 23%, 69%)',
	},
	toolbarTitle: {
		marginLeft: '10px',
		flexGrow: 1,
	}
}));


function Header() {

	const classes = useStyles();
	return (
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
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
