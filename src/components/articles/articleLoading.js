import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	CircularProgress,
	Box
} 
from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(7),
    },
  },
}));

function ArticleLoading(Component) {
	const classes = useStyles();
	return function articleLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<div className={classes.root}>
				<Box
					m={2}
					display="flex"
					alignItems="center"
					flexDirection="column"
				>
					<CircularProgress size={80}/>
				</Box>
			</div>
		);
	};
}
export default ArticleLoading;
