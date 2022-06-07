import React from "react";
import {
    Link,
    Avatar,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import {useUserContext} from './context/UserContexProvider'


const drawerWidth = 200;
const smallDrawerWidth = 60;

const useStyles = makeStyles((theme) => ({
    smallDrawer: {
        flexShrink: 0,
        width: smallDrawerWidth,
    },
    smallDrawerPaper: {
        width: smallDrawerWidth,
    },
    drawer: {
        flexShrink: 0,
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    menuButton:{
        display: 'inline',
    },
    menuButton: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    text:{
        color: "gray",
    },
    userFirstLastName: {
        fontWeight: "bold",
        color: "black",
    },
    userEmail: {
        color: "gray",
    },
}));

export default function CustomDrawer({drawerItems}) {
    const {userState: {user,}} = useUserContext()
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const toggleDrawer = (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpen(!open);
    };
    if(!open && !isSmUp) {
        return(
            <Drawer
                className={classes.smallDrawer}
                variant="permanent"
                classes={{
                    paper: classes.smallDrawerPaper,
                }}
                anchor="left"
                role="presentation" // new
            >
                <div className={classes.toolbar} />
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Drawer>
        )
    }else return (
        <React.Fragment>
            <Drawer
                className={classes.drawer}
                variant={isSmUp ? "permanent" : "temporary"}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
                open={open}
                onClose={toggleDrawer}
            >
                <div
                    style={{
                        display: isSmUp && "none",
                        margin: "15px auto 15px 15px",
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        style={{
                            marginBottom: "10px",
                        }}
                    />
                    <Typography 
                        variant="body1" 
                        className={classes.userFirstLastName}
                    >
                        {user.first_name}{' '}{user.last_name}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        className={classes.userEmail}
                    >
                        {user.email}
                    </Typography>
                </div>
                <div 
                    className={classes.toolbar} 
                    style={{
                        display: !isSmUp && "none",
                    }}
                />
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
            <Drawer
                // just a quick fix for main content shifting
                className={classes.smallDrawer}
                style={{
                    display: isSmUp && "none",
                }}
                variant="permanent"
                classes={{
                    paper: classes.smallDrawerPaper,
                }}
                anchor="left"
                role="presentation" // new
            />
        </React.Fragment>
    );
}
