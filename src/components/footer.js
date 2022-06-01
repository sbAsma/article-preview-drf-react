import React from 'react';
import {
	Container,
	Typography,
	Link,
	Box,
	makeStyles 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	root: {
		marginTop: theme.spacing(6), // theme.spacing(16),
		backgroundColor: 'hsl(210, 46%, 95%)', //45%
		minHeight: '157px', // new
		display: "flex", // new
		justify: "center", // new
	},
	footer: {
		margin: 'auto', // took off old styling
		// borderTop: `1px solid ${theme.palette.divider}`,
		// marginTop: theme.spacing(8),
		// paddingTop: theme.spacing(3),
		// paddingBottom: theme.spacing(3),
		// [theme.breakpoints.up('sm')]: {
		// 	paddingTop: theme.spacing(6),
		// 	paddingBottom: theme.spacing(6),
		// },
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
				Articles Preview Page Website
			{' '}
			{new Date().getFullYear()}
			{'.'}
			<br/>
			<Link color="inherit" href="https://github.com/sbAsma/article-preview-drf-react">
				Source Code
			</Link>
			<br/>
			<Link color="inherit" href="https://www.frontendmentor.io/challenges/article-preview-component-dYBN_pYFT">
				Frontend Mentor Inspired Design
			</Link>
		</Typography>
	);
}

// const footers = [
// 	{
// 		title: 'Company',
// 		description: ['Team', 'History', 'Contact us', 'Locations'],
// 	},
// 	{
// 		title: 'Features',
// 		description: [
// 			'Cool stuff',
// 			'Random feature',
// 			'Team feature',
// 			'Developer stuff',
// 			'Another one',
// 		],
// 	},
// 	{
// 		title: 'Resources',
// 		description: [
// 			'Resource',
// 			'Resource name',
// 			'Another resource',
// 			'Final resource',
// 		],
// 	},
// 	{
// 		title: 'Legal',
// 		description: ['Privacy policy', 'Terms of use'],
// 	},
// ];

function Footer() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<footer className={classes.root}>
			<Container maxWidth="md" component="footer" className={classes.footer}>
				{/* <Grid container spacing={4} justify="space-evenly">
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="h6" color="textPrimary" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (
									<li key={item}>
										<Link href="#" variant="subtitle1" color="textSecondary">
											{item}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid> */}
				<Box
					// mt={5}
				>
					<Copyright />
				</Box>
			</Container>
			</footer>
		</React.Fragment>
	);
}

export default Footer;
