import React, { useEffect, useState } from 'react';
import './App.css';
import Articles from './components/articles/articles';
import ArticleLoadingComponent from './components/articles/articleLoading';
import Header from './components/header'
import Footer from './components/footer'
import axiosInstance from './axios';

function App() {
    const ArticleLoading = ArticleLoadingComponent(Articles);
    const [appState, setAppState] = useState({
        loading: true,
        articles: null,
    });

    useEffect(() => {
        axiosInstance.get('articles/').then((res) => {
            const allArticles = res.data;
            console.log(res.data);
            setAppState({ loading: false, articles: allArticles });
            console.log(res.data);
        });
    }, [setAppState]);
    return (
        <React.Fragment>
            <Header />
                <div className="App">
                    <h1>Latest Articles</h1>
                    <ArticleLoading isLoading={appState.loading} articles={appState.articles} />
                </div>
            <Footer />
        </React.Fragment>
    );
}
export default App;
