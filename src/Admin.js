import React from 'react';
import './App.css';
import Header from './components/admin/header'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import ManageArticles from './components/admin/manageArticles';
import {AdminProvider, useAdminContext} from './components/context/AdminContexProvider'

function AdminContent() {
    const {adminState: {
            isLoggedIn,
            isSigningUp,
            username,
            user}} = useAdminContext()

    if(!isLoggedIn && !isSigningUp) {
        return (
            <div className="App">
                <h1>Admin Page</h1>
                <Login/>
            </div>
        )}
    else if(!isLoggedIn && isSigningUp) return (
        <div className="App">
            <h1>Admin Page</h1>
            <Signup/>
        </div>
    )
    else return (
        <ManageArticles 
            username={username}
            user={user}
        />
    )
}

export default function Admin() {
    return(
        <AdminProvider>
            <Header/>
            {/* <Login/>
            <Signup/>
            <ManageArticles/> */}
            <AdminContent/>
        </AdminProvider>
    )
}