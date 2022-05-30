import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import {useAdminContext} from './components/context/AdminContexProvider'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}))

export default function Admin() {
    const {adminState: {
        isLoggedIn,
        isSigningUp,}, setAdminState} = useAdminContext()
    useEffect(() => {
        setAdminState({isSigningUp: false, isLoggedIn: false,isLoggingIn: true,})
    }, [])
    const classes = useStyles()
    if(!isLoggedIn && !isSigningUp) {
        return (
            <div>
                <div className={classes.toolbar} />
                <Login/>
            </div>
        )}
    else if(!isLoggedIn && isSigningUp) return (
        <div>
            <div className={classes.toolbar} />
            <Signup/>
        </div>
    )
    else return(
        <Redirect to="/admin/articles" />
    )
}