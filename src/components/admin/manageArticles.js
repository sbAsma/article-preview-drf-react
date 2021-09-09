import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import '../../App.css';
import Header from './header'
import Articles from './articles';
import Create from './create'
import Delete from './delete'
import ArticleLoadingComponent from '../articles/articleLoading';
import axios from 'axios'
import axiosInstance from '../../axios';

export default function ManageArticles(props) {
	// const history = useHistory()
	const ArticleLoading = ArticleLoadingComponent(Articles);
    const initialState = Object.freeze({
    	isLoggedIn: false,
        loading: false,
        user: null,
        username: '',
        articles: [],
		article: {},
        isAdd: false,
        isEdit: false,
        isDelete: false,
    })
    // const manageArticlesState
    const [appState, setAppState] = useState(initialState)
	useEffect(() =>{
		const username = localStorage.getItem('current_user')
		if(username != null && appState.isLoggedIn != true){
			setAppState({ ...appState, loading:true, })
			const axiosReqUser = axiosInstance.get('user/user/'+ username +'/')
			const axiosReqArticles = axiosInstance.get('articles/')
			axios.all([axiosReqUser, axiosReqArticles]).then(axios.spread((...res) => {
			    // console.log(res.data);
			    const user = res[0].data;
			    const allArticles = res[1].data;
			    setAppState({ 
			        isLoggedIn: true,
			        loading: false, 
			        user: user,
			        userId: user.id,
			        username: user.user_name,
			        articles: allArticles,
			    });

			}))
		}
		else{
			console.log("current user isn't here yet")
		}

	}, [])
	
	const onOperationClick = (id, operation) =>{
		if (id != null){
			const article_ = appState.articles.find(article => article.id === id)
			setAppState({...appState, [operation]: true, article: article_})
		}
		else{
			// console.log(operation)
			setAppState({...appState, [operation]: true})
		}
	}
	const handleOperation = (id, operation, formData) =>{
		// console.log("operation ", operation)
		if(operation === "isAdd"){
			axiosInstance.post('admin/create/', formData)
			.then((res) => {
				// console.log("base url", res.config.baseURL)
				console.log("response", res)
				const newArticle = res.data
				setAppState({
					...appState, 
					articles: [...appState.articles, newArticle],
					isAdd: false,
				})
			})
			.catch((err)=>{
				console.log(err.response)
			})
		}
		else if(operation === "isEdit"){}
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
					// var articles = appState.articles
					const newArticles = appState.articles.filter((article) =>{
						if(article.id != id) return article
					})
					setAppState({
						...appState, 
						[operation]: false, 
						article: {}, 
						articles: 
						newArticles
					})
				});
			
		}
		else console.log("operation not configured yet")
	}
	const onCancelOperation = (operation) =>{
		setAppState({...appState, [operation]: false, article: {}})
	}
	return(
		<React.Fragment>
            <Header 
                isLoggedIn={appState.isLoggedIn} 
                username={appState.username} 
                handleLogout={props.handleLogout}
            />
            <div className="App">
                <h1>Latest Articles</h1>
                <ArticleLoading 
                	isLoading={appState.loading} 
                	articles={appState.articles} 
                	userId = {appState.userId}
                	// isAdd={appState.isAdd}
					// isEdit={appState.isEdit}
					// isDelete={appState.isDelete}
					onOperationClick={onOperationClick}
					// handleOperation={handleOperation}
					// onCancelOperation={onCancelOperation}
                />
            </div>
			<Create
				userId={appState.userId}
				isAdd={appState.isAdd}
				onCancleAdd={onCancelOperation}
				handleOperation={handleOperation}
				onCancelOperation={onCancelOperation}
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

// const onAdd = () => {
	// 	setAppState({ 
	// 		...appState,
	// 		isAdd: true,
	//         isEdit: false,
	//         isDelete: false,
	// 	})
	// }
	// const handleAdd = (articleFormData) => {
	
	// }
	// const onCancleAdd = () => {
	// 	setAppState({ 
	// 		...appState,
	// 		isAdd: false,
	//         isEdit: false,
	//         isDelete: false,
	// 	})
	// }
	// const onEdit = () =>{

	// }
	// const handleEdit = () =>{

	// }
	// const onDeleteClick = () =>{
	// 	setAppState({ 
	// 		...appState,
	// 		isAdd: false,
	//         isEdit: false,
	//         isDelete: true,
	// 	})
	// }
	// const handleDelete = (deleteId) =>{}
	// const onDeleteCancel = () =>{
	// 	setAppState({ 
	// 		...appState,
	// 		isAdd: false,
	//         isEdit: false,
	//         isDelete: false,
	// 	})
	// }