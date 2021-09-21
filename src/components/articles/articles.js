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
		// direction: "column",
		// display: "flex",
		// alignItems: "center",
		// flexDirection: "column",
	},
	card: {
		// display: 'flex',
		// width: '600px',
		// height: '250px',
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
		display: 'flex',
		flexDirection: "column",
		justifyContent: 'space-between',
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
		height: 'auto',
	},
	articleAuthor:{
		height: '50px',
		width: '100%',
	},
	[theme.breakpoints.down('xs')]: {
		root: {
			display: "flex",
			flexDirection: "column",
		},
		card: {
			display: 'flex',
			flexDirection: "column",
			width: '90%',
			height: 'auto',
			margin: 'auto',
			// backgroundColor: 'red',
		},
		cardMedia: {
			// paddingTop: '56.25%', // 16:9
			width: '100%',
			height: '300px',
		},
		articleAuthor:{
			backgroundColor: 'blue',
		},		
	},
	[theme.breakpoints.up('sm')]: {
		root: {
			display: "flex",
			flexDirection: "column",
		},
		card: {
			display: 'flex',
			flexDirection: "row",
			width: '90%',
			height: 'auto',
			margin: 'auto',
			// backgroundColor: 'red',
		},
		cardMedia: {
			// paddingTop: '56.25%', // 16:9
			width: '40%',
			height: 'auto',
		},
		cardContent: {
			width: '60%',
		},
		articleAuthor:{
			backgroundColor: 'red',
		},
	},
	[theme.breakpoints.up('md')]: {
		root: {
			display: "flex",
			flexDirection: "row",
		},
		card: {
			display: 'flex',
			flexDirection: "column",
			width: '90%',
			height: '550px',
			margin: 'auto',
			// backgroundColor: 'red',
		},
		cardMedia: {
			// paddingTop: '56.25%', // 16:9
			width: '100%',
			height: '55%',
		},
		cardContent: {
			height: '45%',
			width: '100%',
		},
		articleAuthor:{
			backgroundColor: 'yellow',
		},
	},
	[theme.breakpoints.up('lg')]: {
		root: {
			display: "flex",
			flexDirection: "row",
		},
		card: {
			display: 'flex',
			flexDirection: "row",
			width: '90%',
			height: '270px',
			margin: 'auto',
			// backgroundColor: 'red',
		},
		cardMedia: {
			// paddingTop: '56.25%', // 16:9
			width: '40%',
			height: 'auto',
		},
		cardContent: {
			width: '60%',
			height: '100%',
		},
		articleAuthor:{
			backgroundColor: 'green',
		},
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
					container 
					spacing={3} 
					className={classes.root}
					// alignItems="center"
					>
					{articles.map((article) => {
						var articleTitle = article.title.substr(0, 106) + '...'
						if(article.title.length < 107){
							articleTitle = article.title
						}
						var contentLength
						if (article.title.length <= 35){
							contentLength = 392
						}else if(article.title.length <= 67){
							contentLength = 287
						}else {
							contentLength = 240
						}
						var articleText = article.content.substr(0, contentLength) + '...'
						if(article.content.length < contentLength){
							articleText = article.content
						}
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={article.id} xs={12} sm={12} md={6} lg={6}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={article.picture}
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<div className={classes.articleContent}>
											<Typography
												gutterBottom
												variant="h6"
												component="h2"
												className={classes.articleTitle}
											>
												{articleTitle}
											</Typography>
											<Typography 
												variant="p" 
												color="textSecondary"
												className={classes.articleText}
											>
												{articleText}
											</Typography>
										</div>
										<div className={classes.articleAuthor}>
											author section
										</div>
									</CardContent>
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
