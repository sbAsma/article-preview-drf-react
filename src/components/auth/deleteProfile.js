import React from 'react'
import {
    Link,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    makeStyles,
} from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';

import {useAdminContext} from '../context/AdminContexProvider'
import axiosInstance from "../../axios";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
}))

const CustomDrawer = (props) => {
    return (
        <Drawer
            className={props.classes.drawer}
            variant="permanent"
            classes={{
                paper: props.classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={props.classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={Link} href={"articles"}>
                    <ListItemIcon>
                        <BallotIcon />
                    </ListItemIcon>
                    <ListItemText primary={"articles"} />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary={"change password"} />
                </ListItem>
            </List>
        </Drawer>
    );
}
export default function DeleteProfile() {
    const {adminState: {user,}} = useAdminContext()
    const classes = useStyles()
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
                window.location.href = '/admin/';
            })
        });
    }
    return (
        <div className={classes.root}>
            <CustomDrawer classes={classes} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.container}>
                    <div>Do you really want to delete your profile?</div>
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
