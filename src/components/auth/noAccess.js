import React from "react";
import {NavLink} from "react-router-dom"
import {
    Container,
    Link,
    makeStyles,
} from "@material-ui/core"
import { useAdminContext } from "../context/AdminContexProvider";

const useStyles = makeStyles((theme) => ({
    root: {
		marginTop: '100px',
	},
}))

export default function NoAccess() {
    const {setAdminState} = useAdminContext()
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="md" component="main">
                    403 You don't have permission to access this page
                    <br/>
                    <Link
                        component={NavLink}
                        to="/admin"
                        onClick={() => setAdminState({isSigningUp: false, isLoggedIn: false,isLoggingIn: true,})}
                    >
                        Go to login page
                    </Link>
                </Container>
            </div>
        </React.Fragment>
    );
}