import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	  root: {
	    display: 'flex',
	    width: '600px',
	    height: '250px',
	  },
	  details: {
	    display: 'flex',
	    flexDirection: 'column',
	  },
	cardMedia: {
		// paddingTop: '56.25%', // 16:9
		width: '250px',
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	cardContent: {
		width: '350px',
	},
	articleTitle: {
		fontSize: '16px',
		textAlign: 'left',
		fontWeight: 'bold',
	},
	articleText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Articles = (props) => {
	const { articles } = props;
	const classes = useStyles();
	console.log("props in articles", props)
	if (!articles || articles.length === 0) return <p>Can not find any articles, sorry</p>;
	return (
		<React.Fragment>
			<Container  component="main" display='flex'>
				<Grid 
					container spacing={3} 
					// alignItems="center"
					>
					{articles.map((article) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={article.id} xs={12} md={6}>
								<Card className={classes.root}>
									<CardMedia
										className={classes.cardMedia}
										image={article.picture}
										title="Image title"
									/>
									<div className={classes.details}>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.articleTitle}
										>
											{article.title}
										</Typography>
										<div className={classes.articleText}>
											<Typography
												component="p"
												color="textPrimary"
											></Typography>
											<Typography variant="p" color="textSecondary">
												{article.content}
											</Typography>
										</div>
									</CardContent>
									</div>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Articles;
