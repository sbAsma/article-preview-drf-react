import React from "react";
import {NavLink} from "react-router-dom"
import {
    Container,
    Link,
    makeStyles,
} from "@material-ui/core"
import { useUserContext } from "../context/UserContexProvider";

const useStyles = makeStyles((theme) => ({
    root: {
		marginTop: '100px',
        minHeight: "calc(100vh - 221px)",
	},
}))

export default function NoAccess() {
    const {setUserState} = useUserContext()
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="md" component="main">
                    403 You don't have permission to access this page
                    <br/>
                    <Link
                        component={NavLink}
                        to="/user"
                        onClick={() => setUserState({isSigningUp: false, isLoggedIn: false,isLoggingIn: true,})}
                    >
                        Go to login page
                    </Link>
                </Container>
            </div>
        </React.Fragment>
    );
}
