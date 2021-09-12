import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import {useAdminContext} from '../context/AdminContexProvider'


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
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
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

const CustomDrawer = (props) => {
    return (
        //   {/* <CssBaseline /> */}
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
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={"articles"} />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default function AdminProfile(){
    const {adminState: {
        user,
    }, setAdminState} = useAdminContext()
    console.log("user", user)
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CustomDrawer classes={classes} />
            <Grid className={classes.content}>
                <div className={classes.toolbar} />
                {/* <div>Hello {user.user_name}</div> */}
                <Avatar
                    alt={user.user_name}
                    src={user.avatar}
                    className={classes.avatar}
                />
                <Typography variant="h6" gutterBottom fontWeight="fontWeightBold">
                    <Box fontWeight="fontWeightBold" >
                        Basic Details
                    </Box>
                </Typography>
                <Typography variant="body2" gutterBottom>
                    fullname: {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="h6" gutterBottom fontWeight="fontWeightBold">
                    <Box fontWeight="fontWeightBold" >
                        Contact Details
                    </Box>
                </Typography>
                <Typography variant="body2" gutterBottom>
                    email: {user.email}
                </Typography>
            </Grid>
        </div>
    )
}