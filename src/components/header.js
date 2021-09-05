import React from 'react';

import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

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
