import React, {useState, useEffect} from 'react'
import {
    Button,
    Typography,
    TextField,
    Grid,
    Box,
    makeStyles
} from '@material-ui/core'
import { useAdminContext } from "../context/AdminContexProvider";

import axiosInstance from '../../axios'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "calc(100vh - 221px)",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        margin: "10% auto auto auto",
        width: "70%",
    },
    container: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        alignContent: "center",
        margin: "auto",
        width: "80%",
        height: "100%",
    },
    resetButton: {
        marginTop: "15px",
        textTransform: "lowercase",
        width: "100%",
    },
    [theme.breakpoints.down('sm')]: {
        container: {
            width: "100%",
            marginTop: "30px",
            marginBottom: "30px",
        },
    },

}))

export default function PasswordReset() {
    const {setAdminState} = useAdminContext()
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [serverResponse, setServerResponse] = useState({
        responseStatus: "",
        responseMessage: "",
    })
    const classes = useStyles()
    useEffect(() =>{
        setAdminState({isSigningUp:true})
    }, [])
    const handleChange = (e) => {
        const email = e.target.value
        setEmail(email)
        // check if email is valid
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        setIsEmailValid(pattern.test(email))
    }
    const handleSentEmail = () => {
        axiosInstance.post('password_reset/', {
            "email": email,
        }).then((res) =>{
            setServerResponse({
                responseStatus: "200",
                responseMessage: "A reset password email has been successfully sent",
            })
        }).catch((err) =>{
            if(err.response.status === 400){
                setServerResponse({
                    responseStatus: "400",
                    responseMessage: "The email address you provided doesn't seem to be linked to any account",
                })
            }else if(err.response.status === 500){
                setServerResponse({
                    responseStatus: "500",
                    responseMessage: "There seems to be a problem with the server",
                })
            }
        })
    }
    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.container}>
                    <Grid container
                        style={{
                            display: (serverResponse.responseStatus !== "")? "flex": "none",
                            marginBottom: "40px",
                        }}
                    >
                        <Box 
                            style={{
                                color: (serverResponse.responseStatus === "200")? "green": "red"
                            }}
                        >
                            {serverResponse.responseMessage}
                        </Box>
                    </Grid>
                    <Typography
                        variant="body1"
                        gutterBottom
                        style={{marginTop: "10px"}}
                    >
                        Please enter your email address
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSentEmail}
                        className={classes.resetButton}
                        type="submit"
                        color="primary"
                        disabled={!isEmailValid}
                    >
                        Send reset password email
                    </Button>
                </div>
            </main>
        </div>
    )
}
