import React from 'react';
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	  root: {
	    display: 'flex',
	    width: '600px',
	    height: '200px',

	  },
	  details: {
	    display: 'flex',
	    flexDirection: 'column',
	  },
	cardMedia: {
		// paddingTop: '56.25%', // 16:9
		width: 200,
		// height: '400px',
	},
	cardActions: {
		display: 'flex',
	},
	icon: {
		margin: 'auto',
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
		width: '300px',
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

	// console.log("Article props", props)
	const { articles } = props;
	const classes = useStyles();
	// console.log("!articles", !articles)
	if (!articles || articles.length === 0) {
		console.log("no article to show")
		return (
			<React.Fragment>
				<Container maxWidth="md" component="main">
					<Grid item 
						// md={6} 
						// xs={12} 
						direction="column"
						  alignItems="center"
						  justify="center"
					>
						<Box m={1} display="flex" alignItems="center" 
							flexDirection="column"
							// xs={12} md={4}
							>
							<Button
									// href={'/admin/create'}
									variant="contained"
									color="secondary"
									style={{
										width: '600px',
										}}
									onClick={() => props.onAdd()}
								>
								{/* <AddCircleIcon/> */}
									New Article
								</Button>
							</Box>
					</Grid>
				</Container>
			</React.Fragment>
			);}
	else if(props.isAdd) return (
			<Create
				userId={props.userId}
				handleAdd={(postFormData) => props.handleAdd(postFormData)}
				onCancleAdd={() => props.onCancleAdd()}
			/>
		)
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid item 
					// md={6} 
					// xs={12} 
					direction="column"
					  alignItems="center"
					  justify="center"
					>
					<Box m={1} display="flex" alignItems="center" 
						flexDirection="column"
								// xs={12} md={4}
								>
									<Button
										// href={'/admin/create'}
										variant="contained"
										color="secondary"
										style={{
											width: '600px',
										}}
										onClick={()=>props.onAdd()}
									>
									{/* <AddCircleIcon/> */}
										New Article
									</Button>
								</Box>
					{articles.map((article) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Box m={1} key={article.id} display="flex" alignItems="center" flexDirection="column"
								// xs={12} md={4}
								>
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
									<CardActions >
										<div className={classes.CardActions}>
											<IconButton >
												<Link href={'/admin/edit/' + article.id}>
													<EditIcon/>
												</Link>
											</IconButton>
											<IconButton  >
												<Link href={'/admin/delete/' + article.id}>
													<DeleteIcon/>
												</Link>
											</IconButton>
										</div>
							      </CardActions>
								</Card>
							</Box>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Articles;
