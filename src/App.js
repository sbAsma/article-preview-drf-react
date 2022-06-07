import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';
import Articles from './components/articles/articles';
import ArticleLoadingComponent from './components/articles/articleLoading';
import { useUserContext } from "./components/context/UserContexProvider";

// import Header from './components/header'
import Footer from './components/footer'
import axios from 'axios'

if (window.location.origin === "http://localhost:3000") {
    axios.defaults.baseURL = "http://127.0.0.1:8000"; // development address
} else {
    axios.defaults.baseURL = window.location.origin; // production address
}

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: "90px",
        textAlign: "center",
        minHeight: "calc(100vh - 221px)",
    },
}))

function App() {
    const {userState: {
        isLoggedIn,
    }, setUserState} = useUserContext()
    const ArticleLoading = ArticleLoadingComponent(Articles);
    const [appState, setAppState] = useState({
        loading: true,
        articles: null,
        users: null,
    });

    useEffect(() => {
        const usersReq = axios.get('user/user/')
        const articlesReq = axios.get('articles/')
        axios.all([usersReq, articlesReq]).then(axios.spread((...responses) => {
            const usersRes = responses[0].data
            const articlesRes = responses[1].data
            setAppState({ 
                loading: false, 
                articles: articlesRes,
                users: usersRes,
            });
        }))
        if(!isLoggedIn){
            setUserState({isSigningUp:true})
        }
    }, [setAppState]);

    const classes = useStyles()
    return (
        <React.Fragment>
                <div 
                    className={classes.root}
                >
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
