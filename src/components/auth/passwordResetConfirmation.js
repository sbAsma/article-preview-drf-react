import React, {useState} from 'react'
import {
        Grid,
        TextField,
        Typography,
        Box,
        Button,
        makeStyles,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import axiosInstance from "../../axios";

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "5% auto auto auto",
        width: "40%", // Fix IE 11 issue.
    },
    visibility: {
        color: "gray",
        position: "absolute",
        margin: "auto",
        right: "15px",
        top: "27px",
    },
    returnButton: {
        marginTop: "15px",
        textTransform: "lowercase",
        width: "100%",
    },
}))

export default function PasswordResetConfirmation(props) {
    const [passwordState, setPasswordState] = useState({
        newPassword: '',
        confirmPassword: '',
    })
    const [visibility, setVisibility] = useState({
        newPassword: false,
        confirmPassword: false,
    })
    const [formErrors, setFormErrors] = useState({
        newPassword: "",
        confirmPassword: "",
    })
    const [serverResponse, setServerResponse] = useState({
        responseStatus: "",
        responseErrorMessage: "",
    })
    const classes = useStyles()
    const handleChange = (e) =>{
        setPasswordState({
            ...passwordState,
            [e.target.name]: e.target.value,
        })
    }
    const handleVisibility = (arg) =>{
        setVisibility({
            ...visibility,
            [arg]: !visibility[arg],
        })
    }
    const formValidation = (passwordState) =>{
        let isValid = true
        let errors = {
            newPassword: "",
            confirmPassword: "",
        };
        if(passwordState["newPassword"] === ""){
            isValid = false
            errors["newPassword"] = "this field is required"
        }
        if(passwordState["confirmPassword"] === ""){
            isValid = false
            errors["confirmPassword"] = "this field is required"
        }
        if(passwordState["confirmPassword"] !== passwordState["newPassword"]){
            isValid = false
        }
        setFormErrors(errors)
        
        return isValid
    }
    const handleSubmit = () => {
        if(formValidation(passwordState)){
            const token = props.match.params.token
            let postFormData = new FormData();
            postFormData.append("password", passwordState.newPassword)
            postFormData.append("token", token)
            
            axiosInstance.post('password_reset/confirm/', postFormData)
            .then((res) => {
                setServerResponse({
                    responseStatus: "200",
                    responseErrorMessage: "",
                })
                setPasswordState({
                    newPassword: '',
                    confirmPassword: '',
                })
                setVisibility({
                    newPassword: false,
                    confirmPassword: false,
                })
                setFormErrors({
                    newPassword: "",
                    confirmPassword: "",
                })
            })
            .catch((err)=> {
                setServerResponse({
                    responseStatus: "404",
                    responseErrorMessage: "The email token has expired",
                })
            })
        }else if(passwordState["confirmPassword"] !== passwordState["newPassword"]){
            setServerResponse({
                responseStatus: "400",
                responseErrorMessage: "Password confirmation missmatch",
            })
        }
    }
    const visibilityIconStyle = { fontSize: 30 }
    if(serverResponse.responseStatus === "200"){
        return(
            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={1} display="flex" 
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                marginTop: "40px",
                            }}
                        >
                            <Box 
                                style={{
                                    color: "green",
                                }}
                            >
                                your password had been successfully updated
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => window.location.href = '/user/'}
                                className={classes.returnButton}
                                type="submit"
                                color="primary"
                            >
                                
                                return to login page
                            </Button>
                        </div>
                    </Grid>
                </main>
            </div>
        )
    }
    else return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <form className={classes.form} noValidate>
                    <Grid container spacing={1} display="flex">
                        <Box 
                            style={{
                                display: !(serverResponse.responseStatus !== "") && 'none',
                                color: "red",
                                width: "100%",
                                marginBottom: '20px',
                            }}
                            
                        >
                            {serverResponse.responseErrorMessage}
                        </Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{marginTop: "10px"}}
                        >
                            Please enter your new password
                        </Typography>
                        <Grid item xs={12}
                            style={{
                                position: "relative",
                            }}
                        >
                        <TextField
                            style={{marginTop: "10px"}}
                            variant="outlined"
                            required
                            fullWidth
                            id="newPassword"
                            name="newPassword"
                            type={!(visibility.newPassword)? "password": null}
                            autoComplete="newPassword"
                            value={passwordState["newPassword"]}
                            onChange={handleChange}
                            error = {(
                                (formErrors["newPassword"]!=="" && passwordState["newPassword"]==="") ||
                                serverResponse.errorField === "new_password"
                            )}
                            helperText={passwordState["newPassword"]==="" ? formErrors["newPassword"]: null}
                        />
                        <div
                            className={classes.visibility}
                            onClick={() => handleVisibility("newPassword")}
                        >
                            {
                                (visibility.newPassword)? 
                                    <VisibilityOffIcon style={visibilityIconStyle}/> : 
                                    <VisibilityIcon style={visibilityIconStyle}/>
                            }
                            
                        </div>
                        </Grid>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{marginTop: "10px"}}
                        >
                            Confirm your new password
                        </Typography>
                        <Grid item xs={12}
                            style={{
                                position: "relative",
                            }}
                        >
                        <TextField
                            style={{marginTop: "10px"}}
                            variant="outlined"
                            required
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            type={!(visibility.confirmPassword)? "password": null}
                            autoComplete="confirmPassword"
                            value={passwordState["confirmPassword"]}
                            onChange={handleChange}
                            error = {(
                                (formErrors["confirmPassword"]!=="" && passwordState["confirmPassword"]==="")||
                                serverResponse.errorField === "new_password"
                            )}
                            helperText={passwordState["confirmPassword"]==="" ? formErrors["confirmPassword"]: null}
                        />
                        <div
                            className={classes.visibility}
                            onClick={() => handleVisibility("confirmPassword")}
                        >
                            {
                                (visibility.confirmPassword)? 
                                    <VisibilityOffIcon style={visibilityIconStyle}/> : 
                                    <VisibilityIcon style={visibilityIconStyle}/>
                            }
                            
                        </div>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{marginTop: "20px"}}
                                onClick={handleSubmit}
                            >
                                reset password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </main>
        </div>
    )
}
