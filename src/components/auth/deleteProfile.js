import React, {useEffect} from 'react'
import {
    Button,
    makeStyles,
    Typography,
} from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';

import {useUserContext} from '../context/UserContexProvider'
import axiosInstance from "../../axios";
import CustomDrawer from '../customDrawer';
import NoAccess from './noAccess';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "calc(100vh - 221px)",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    container: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
    },
    content: {
        margin: "10% auto auto auto",
    },
    deleteButtonContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "30px auto auto auto", 
    },
    [theme.breakpoints.down('xs')]:{
        typography:{
            textAlign: "center"
        }
    },
}))

const drawerItems = [
    {
        id: 1,
        href: "articles",
        icon: <BallotIcon/>,
        text: "articles",
    },
    {
        id: 2,
        href: "profile",
        icon: <PersonIcon/>,
        text: "profile",
    },
    {
        id: 3,
        href: "change_password",
        icon: <LockIcon/>,
        text: "change password",
    },
]

export default function DeleteProfile() {
    const {userState: {user, isLoggedIn}, setUserState} = useUserContext()
    var locStr = localStorage.getItem('current_user')
    const classes = useStyles()
    useEffect(() => {
        if(isLoggedIn === false && localStorage.getItem('current_user') === null){
            setUserState({isSigningUp: true, isLoggedIn: false,isLoggingIn: false,})
        }
    }, [])
    const handleDeleteProfile = () => {
        // const token = localStorage.getItem('refresh_token')
        axiosInstance.delete('user/profile/'+ user.id + '/').then((res) => {
            axiosInstance.post('user/logout/blacklist/', {
                refresh_token: localStorage.getItem('refresh_token')
            }).then((res2)=>{
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('current_user')
                axiosInstance.defaults.headers['Authorization'] = null
                window.location.href = '/user/';
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    if(isLoggedIn === false && locStr === null) {
		return <NoAccess/>
	}
    else return (
        <div className={classes.root}>
            <CustomDrawer drawerItems={drawerItems} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.container}>
                    <Typography
                        variant="body1"
                        gutterBottom
                        className={classes.typography}
                    >
                        Do you really want to delete your profile?
                    </Typography>
                    <div 
                        className={classes.deleteButtonContainer}
                    >
                        <Button
                            variant="contained"
                            onClick={handleDeleteProfile}
                            type="submit"
                            color="secondary"
                        >
                            <DeleteIcon />
                            Confirm delete
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
