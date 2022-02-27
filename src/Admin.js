import React from 'react';
import {Redirect} from 'react-router-dom'
import './App.css';
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import {useAdminContext} from './components/context/AdminContexProvider'

function AdminContent() {
    const {adminState: {
            isLoggedIn,
            isSigningUp,}} = useAdminContext()

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
    else return(
        <Redirect to="/admin/articles" />
    )
}

export default function Admin() {
    return(
        <AdminContent/>
    )
}