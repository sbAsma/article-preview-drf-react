import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Container,
	Box,
	Avatar,
} from '@material-ui/core';
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		width: '250px',
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
		display: 'flex',
		flexDirection: 'row',
	},
	authorInfo: {
		alignItems: 'baseline',
		textAlign: 'left',
		marginLeft: theme.spacing(1),
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
		},
		cardMedia: {
			width: '100%',
			height: '300px',
		},
		articleAuthor:{
			height: 'auto',
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
		},
		cardMedia: {
			width: '40%',
			height: 'auto',
		},
		cardContent: {
			width: '60%',
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
		},
		cardMedia: {
			width: '100%',
			height: '55%',
		},
		cardContent: {
			height: '45%',
			width: '100%',
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
		},
		cardMedia: {
			width: '40%',
			height: 'auto',
		},
		cardContent: {
			width: '60%',
			height: '100%',
		},
	},
}));

const Articles = (props) => {
	const classes = useStyles();
	const { articles, authors } = props;
	const formatCreated = (date) =>{
		var articleCreated = new Date(date);
		return format(articleCreated, "dd MMM yyyy");
	}
	if (!articles || articles.length === 0) return <p>Can not find any articles, sorry</p>;
	return (
		<React.Fragment>
			<Container  component="main" display='flex'>
				<Grid 
					container 
					spacing={3} 
					className={classes.root}
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
						const author = authors.find((author) => author.id === article.author)
						console.log(author)
						return (
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
											<Avatar
												src={author.avatar}
											/>
											<div className={classes.authorInfo}>
												<Typography>
													<Box fontWeight="bold">
														{author.first_name} {author.last_name}
													</Box>
												</Typography>
												<Typography
													variant="p" 
													color="textSecondary"
												>
													{formatCreated(article.created)}
												</Typography>
											</div>
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
