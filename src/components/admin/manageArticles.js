import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import '../../App.css';
import Header from './header'
import Articles from './articles';
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
        articles: null,
        isAdd: false,
        isEdit: false,
        isDelete: false,
    })
    // const manageArticlesState
    const [appState, setAppState] = useState(initialState)
	useEffect(() =>{
		const username = localStorage.getItem('current_user')
		if(username != null){
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
			console.log("something is going wrong")
		}

	}, [])
	const onAdd = () => {
		setAppState({ 
			...appState,
			isAdd: true,
	        isEdit: false,
	        isDelete: false,
		})
	}
	const handleAdd = (articleFormData) => {
		axiosInstance.post('admin/create/', articleFormData)
		.then((res) => {
			console.log("re", res)
			const newArticle = res.data
			setAppState({
				...appState, 
				articles: [...appState.articles, newArticle],
				isAdd: false,
			})
		})
	}
	const onCancleAdd = () => {
		setAppState({ 
			...appState,
			isAdd: false,
	        isEdit: false,
	        isDelete: false,
		})
	}
	const onEdit = () =>{

	}
	const handleEdit = () =>{

	}
	const onDelete = () =>{

	}
	const handleDelete = () =>{

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
                	isAdd={appState.isAdd}
					isEdit={appState.isEdit}
					isDelete={appState.isDelete}
                	onAdd={onAdd}
					handleAdd={handleAdd}
					onCancleAdd={onCancleAdd}
                	onEdit={onEdit}
                	handleEdit={handleEdit}
                	onDelete={onDelete}
                	handleDelete={handleDelete}
                />
            </div>
        </React.Fragment>
	)
}