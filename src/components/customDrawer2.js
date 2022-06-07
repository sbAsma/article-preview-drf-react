import React, { useState } from 'react'
import {
    Link,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    makeStyles,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ReorderIcon from '@material-ui/icons/Reorder';

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
    drawerOpenClose:{
        display: 'none',
    },
    // secondDivider: {
    //     display: 'none'
    // },
    [theme.breakpoints.down('xs')]: {
        drawerOpenClose:{
            display: 'inline',
        },
        // secondDivider: {
        //     display: 'inline',
        // },
        // drawer: {
        //     width: smallDrawerWidth,
        // },
        // drawerPaper: {
        //     width: smallDrawerWidth,
        // },
        // text: {
        //     display: 'none',
        // },
        // icon: {
        //     display: 'none',
        // },
        // drawer: {
        //     width: mediumDrawerWidth,
        // },
        // drawerPaper: {
        //     width: mediumDrawerWidth,
        // },
        
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

export default function CustomDrawer2({drawerItems}){
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            role="presentation" // new
            onClick={() => console.log("drawer clicked")}
        >
            <div className={classes.toolbar} />
            <Divider />
            <IconButton
                className={classes.drawerOpenClose}
                onClick={() => setOpen(!open)}
            >
                {open===true? <ArrowLeftIcon/> : <ReorderIcon/>}
            </IconButton>
            
            <Divider 
                // className={classes.secondDivider}
                style={{
                    display: !open && "none",
                }}
            />
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
