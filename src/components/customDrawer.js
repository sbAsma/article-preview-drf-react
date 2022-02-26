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
    toolbar: theme.mixins.toolbar,
    text:{
        color: "gray",
        fontWeight : "bold",
    }
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
                            <ListItemIcon>
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
