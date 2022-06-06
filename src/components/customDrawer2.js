import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

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
    menuButton: {
        // marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    //   toolbar: {
    //     ...theme.mixins.toolbar,
    //     [theme.breakpoints.down("sm")]: {
    //       display: "none"
    //     }
    //   },
}));

export default function CustomDrawer2({drawerItems}) {
    const classes = useStyles()
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = React.useState(false);

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
                    edge="start"
                    onClick={toggleDrawer}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Drawer>
        )
    }else return (
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
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
