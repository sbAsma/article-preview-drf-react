import React, { useEffect, useState } from 'react';
import {
		Container,
		Grid,
		Box,
		Button,
		makeStyles
} from '@material-ui/core'
import Articles from './articles';
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import ArticleLoadingComponent from '../articles/articleLoading';
import axiosInstance from '../../axios';
import {useAdminContext} from '../context/AdminContexProvider'

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '100px',
	},
	addButton: {
		[theme.breakpoints.down('xs')]: {
			width: "90%",
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: "500px",
		},
		[theme.breakpoints.up('md')]: {
			width: "700px",
		},
	},
}))
export default function ManageArticles(props) {
	const classes = useStyles()
	const ArticleLoading = ArticleLoadingComponent(Articles);
	const {adminState: {
			isLoggedIn,
			user}} = useAdminContext()
    const initialState = Object.freeze({
		article: {},
        isAdd: false,
        isEdit: false,
        isDelete: false,
    })
	const [articlesState, setArticlesState] = useState({
		loading: true,
        articles: [],
	})
    const [appState, setAppState] = useState(initialState)
	var locStr = localStorage.getItem('current_user')
	useEffect(() =>{
		axiosInstance.get('articles/')
		.then((res) => {
			const allArticles = res.data;
			setArticlesState({ 
				loading: false, 
				articles: allArticles,
			});
		})
	}, [user])
	
	const onOperationClick = (id, operation) =>{
		if (id !== null){
			const article_ = articlesState.articles.find(article => article.id === id)
			setAppState({...appState, [operation]: true, article: article_})
		}
		else{
			setAppState({...appState, [operation]: true})
		}
	}
	const handleOperation = (id, operation, formData) =>{
		if(operation === "isAdd"){
			axiosInstance.post('admin/create/', formData)
			.then((res) => {
				console.log("response", res)
				const newArticle = res.data
				setArticlesState({
					...articlesState,
					articles: [...articlesState.articles, newArticle],
				})
				setAppState({
					...appState, 
					isAdd: false,
				})
			})
			.catch((err)=>{
				console.log(err.response)
			})
		}
		else if(operation === "isEdit"){
			axiosInstance.patch(`admin/article/` + id + "/", formData)
			.then((res) => {
				console.log(res)
				const updateArticles = articlesState.articles.map((article) =>{
					if(article.id !== id) return article
					else return res.data
				})
				setArticlesState({
					...articlesState,
					articles: updateArticles
				})
				setAppState({
					...appState, 
					[operation]: false, 
					article: {},
				})
			})
		}
		else if(operation === "isDelete"){
			console.log("delete article N° ", id)
			axiosInstance
				.delete('admin/article/' + id +'/')
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					}
				})
				.then(() => {
					const newArticles = articlesState.articles.filter((article) =>{
						return article.id !== id
					})
					setArticlesState({
						...articlesState,
						articles: newArticles,
					})
					setAppState({
						...appState, 
						[operation]: false, 
						article: {}, 
					})
				});
			
		}
		else console.log("operation not configured yet")
	}
	const onCancelOperation = (operation) =>{
		setAppState({...appState, [operation]: false, article: {}})
	}
	if(isLoggedIn === false && articlesState.loading === false && locStr === null) {
		return (
			<React.Fragment>
				<div className={classes.root}>
					<Container 
						maxWidth="md" 
						component="main"
					>
						 403 You don't have permission to access this page

					</Container>
				</div>
			</React.Fragment>
		)
	}else if (user === undefined) return <div>loading</div>
	else return(
		<React.Fragment>
            <div className={classes.root} >
				<Container 
					maxWidth="md" 
					component="main"
					
				>
					<Grid
						item
						direction="column"
						container
						// alignItems="center"
						justifyContent="center"
						
					>
						<Box
							m={2}
							display="flex"
							alignItems="center"
							variant = "container"
							flexDirection="column"
						>
							<Button
								variant="contained"
								color="secondary"
								className={classes.addButton}
								style={{display: articlesState.loading && 'none'}}
								onClick={() => onOperationClick(null, "isAdd")}
							>
								New Article
							</Button>
						</Box>
						<ArticleLoading 
							isLoading={articlesState.loading} 
							articles={articlesState.articles} 
							userId = {user.id}
							onOperationClick={onOperationClick}
						/>
					</Grid>
				</Container>
            </div>
			<Create
				userId={user.id}
				isAdd={appState.isAdd}
				onCancleAdd={onCancelOperation}
				handleOperation={handleOperation}
				onCancelOperation={onCancelOperation}
			/>
			<Edit
				userId={user.id}
				isEdit={appState.isEdit}
				article={appState.article}
				onCancleEdit={onCancelOperation}
				handleOperation={handleOperation}
			/>
			<Delete
				isDelete={appState.isDelete}
				article={appState.article}
				onDeleteConfirm={handleOperation}
				onDeleteCancel={onCancelOperation}
			/>
        </React.Fragment>
	)
}