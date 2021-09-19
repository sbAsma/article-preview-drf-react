import React, { useEffect, useState } from 'react';
import '../../App.css';
import Articles from './articles';
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import ArticleLoadingComponent from '../articles/articleLoading';
import axiosInstance from '../../axios';
import {useAdminContext} from '../context/AdminContexProvider'
import userEvent from '@testing-library/user-event';

export default function ManageArticles(props) {
	const ArticleLoading = ArticleLoadingComponent(Articles);
	const {adminState: {
			userId,
			user}} = useAdminContext()
    const initialState = Object.freeze({
        loading: false,
        // user: props.user,
        // username: props.username,
        articles: [],
		article: {},
        isAdd: false,
        isEdit: false,
        isDelete: false,
    })
    const [appState, setAppState] = useState(initialState)
	useEffect(() =>{
			setAppState({ ...appState, loading:true, })
			axiosInstance.get('articles/')
			.then((res) => {
			    const allArticles = res.data;
				const userArticles = allArticles.filter((article)=>{
					if (article.author==userId) return article
				})
			    setAppState({ 
					...appState,
			        loading: false, 
			        articles: userArticles,
			    });

			})
	}, [user])
	
	const onOperationClick = (id, operation) =>{
		if (id != null){
			const article_ = appState.articles.find(article => article.id === id)
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
		else if(operation === "isEdit"){
			axiosInstance.patch(`admin/article/` + id + "/", formData)
			.then((res) => {
				console.log(res)
				const updateArticles = appState.articles.map((article) =>{
					if(article.id != id) return article
					else return res.data
				})
				setAppState({
					...appState, 
					[operation]: false, 
					article: {}, 
					articles: updateArticles
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
					const newArticles = appState.articles.filter((article) =>{
						if(article.id != id) return article
					})
					setAppState({
						...appState, 
						[operation]: false, 
						article: {}, 
						articles: newArticles,
					})
				});
			
		}
		else console.log("operation not configured yet")
	}
	const onCancelOperation = (operation) =>{
		setAppState({...appState, [operation]: false, article: {}})
	}
	if(user == undefined) return <div>loading</div>
	else return(
		<React.Fragment>
            <div className="App">
                <h1>Latest Articles</h1>
                <ArticleLoading 
                	isLoading={appState.loading} 
                	articles={appState.articles} 
                	userId = {user.id}
					onOperationClick={onOperationClick}
                />
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
				onCancleEdit={onCancelOperation}
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

// useEffect(() =>{
// 	const username = localStorage.getItem('current_user')
// 	if(username != null && appState.isLoggedIn != true){
// 		setAppState({ ...appState, loading:true, })
// 		const axiosReqUser = axiosInstance.get('user/user/'+ username +'/')
// 		const axiosReqArticles = axiosInstance.get('articles/')
// 		axios.all([axiosReqUser, axiosReqArticles]).then(axios.spread((...res) => {
// 			const user = res[0].data;
// 			const allArticles = res[1].data;
// 			setAppState({ 
// 				isLoggedIn: true,
// 				loading: false, 
// 				user: user,
// 				userId: user.id,
// 				username: user.user_name,
// 				articles: allArticles,
// 			});

// 		}))
// 	}
// 	else{
// 		console.log("current user isn't here yet")
// 	}
// }, [])