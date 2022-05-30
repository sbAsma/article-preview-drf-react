import React from 'react'
import {
    Link,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    makeStyles,
} from '@material-ui/core';

const largeDrawerWidth = 180;
const mediumDrawerWidth = 110;
const smallDrawerWidth = 60;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: largeDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: largeDrawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    text:{
        color: "gray",
        fontWeight : "bold",
    },
    [theme.breakpoints.down('xs')]: {
        icon: {
            display: 'none',
        },
        drawer: {
            width: mediumDrawerWidth,
        },
        drawerPaper: {
            width: mediumDrawerWidth,
        },
    },
    ['@media (max-width:350px)']:{
		icon: {
            display: 'inline',
        },
        drawer: {
            width: smallDrawerWidth,
        },
        drawerPaper: {
            width: smallDrawerWidth,
        },
        text: {
            display: 'none',
        },
	},
}))

export default function CustomDrawer({drawerItems}){
    const classes = useStyles()

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {drawerItems.map((item) => {
                    return(
                        <ListItem key={item.id} button component={Link} href={item.href}>
                            <ListItemIcon className={classes.icon}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={
                                    <Typography 
                                        variant="body1" 
                                        className={classes.text}
                                    >
                                      {item.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    );
}
