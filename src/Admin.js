import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import Header from './components/admin/header'
import ManageArticles from './components/admin/manageArticles';
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import axiosInstance from './axios';

function Admin() {
    const history = useHistory()
    const initialState = Object.freeze({
        isLoggedIn: false,
        isSigningUp: false,
    })

    const [appState, setAppState] = useState(initialState);
    useEffect(() =>{
        const current_user = localStorage.getItem('current_user')
        if(current_user != null){
            setAppState({...appState, isLoggedIn: true,})
        }
    }, [setAppState])
    // console.log(appState)
    const handleSignup = () =>{
        setAppState({...appState, isSigningUp: false, })
        // console.log(appState)
    }
    const redirectLogin = () =>{
        setAppState({...appState, isSigningUp: false, isLoggedIn: false,})
    }
    const redirectSignUp = () =>{
        setAppState({...appState, isSigningUp: true, })
    }
    const handleLogin = (username) =>{
        setAppState({...appState, isLoggedIn: true,})
        // history.push('/admin/manage');
    }
    const handleLogout = () => {
        const response = axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token')
        }).then((res) => {
            // test the response !!!
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('current_user')
            axiosInstance.defaults.headers['Authorization'] = null
            setAppState(initialState)
            
        })
    }
    if(!appState.isLoggedIn && !appState.isSigningUp) {
        return (
            <React.Fragment>
                <Header 
                    isLoggedIn={appState.isLoggedIn} 
                    isLoggingIn={true}
                    username={appState.username} 
                    redirectSignUp={redirectSignUp}
                    redirectLogin={redirectLogin}
                />
                <div className="App">
                    <h1>Admin Page</h1>
                    <Login isLoggedIn={appState.isLoggedIn} handleLogin={handleLogin} />
                </div>
            </React.Fragment>
        )}
    else if(!appState.isLoggedIn && appState.isSigningUp) return (
        <React.Fragment>
            <Header 
                isLoggedIn={appState.isLoggedIn} 
                isSigningUp={appState.isSigningUp}
                username={appState.username}
                redirectLogin={redirectLogin}
            />
            <div className="App">
                <h1>Admin Page</h1>
                <Signup handleSignup={handleSignup}/>
            </div>
        </React.Fragment>
    )
  // else 
    else return (
        <React.Fragment>
            {/* <a href='/admin/manage'> */}
                <ManageArticles 
                    // href='/admin/manage'
                    // isLoggedIn={appState.isLoggedIn} 
                    handleLogout={handleLogout}
                />
            {/* </a> */}
        </React.Fragment>
    )
}
export default Admin;


// function Admin() {
//   const ArticleLoading = ArticleLoadingComponent(Articles);
//   const [appState, setAppState] = useState({
//     loading: true,
//     articles: null,
//   });
// 
//   useEffect(() => {
//     axiosInstance.get('articles/').then((res) => {
//       const allArticles = res.data;
//       console.log(res.data);
//       setAppState({ loading: false, articles: allArticles });
//       console.log(res.data);
//     });
//   }, [setAppState]);
//   if(localStorage.getItem('refresh_token') == null) return (
//     <div className="App">
//       <h1>Admin Page</h1>
//       <Login/>
//     </div>
//     )
//   else return (
//     <div className="App">
//       <h1>Latest Articles</h1>
//       <ArticleLoading isLoading={appState.loading} articles={appState.articles} />
//     </div>
//   );
// }
// export default Admin;
