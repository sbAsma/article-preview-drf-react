import React, { useEffect, useState } from 'react';
import './App.css';
import Articles from './components/articles/articles';
import ArticleLoadingComponent from './components/articles/articleLoading';
import Header from './components/header'
import Footer from './components/footer'
import axiosInstance from './axios';
import axios from 'axios'

function App() {
    const ArticleLoading = ArticleLoadingComponent(Articles);
    const [appState, setAppState] = useState({
        loading: true,
        articles: null,
        users: null,
    });

    useEffect(() => {
        const usersReq = axios.get('http://127.0.0.1:8000/user/user/')
        const articlesReq = axios.get('http://127.0.0.1:8000/articles/')
        axios.all([usersReq, articlesReq]).then(axios.spread((...responses) => {
            const usersRes = responses[0].data
            const articlesRes = responses[1].data
            setAppState({ 
                loading: false, 
                articles: articlesRes,
                users: usersRes,
            });
        }))
    }, [setAppState]);
    return (
        <React.Fragment>
            <Header />
                <div className="App">
                    <h1>Latest Articles</h1>
                    <ArticleLoading 
                        isLoading={appState.loading} 
                        articles={appState.articles} 
                        authors={appState.users}
                    />
                </div>
            <Footer />
        </React.Fragment>
    );
}
export default App;
