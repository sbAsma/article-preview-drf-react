import React, {useState, useEffect} from 'react'
import {
        Grid,
        TextField,
        Typography,
        Box,
        Button,
        makeStyles,
} from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {useUserContext} from '../context/UserContexProvider'
import axiosInstance from "../../axios";
import CustomDrawer from '../customDrawer';
import NoAccess from './noAccess';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minWidth: "280px",
        minHeight: "calc(100vh - 221px)",
    },
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
    messageBox: {
		borderRadius: '10px',
		padding: theme.spacing(1),
		marginBottom: '10px',
		marginTop: '15px',
        width: '40%',
        textAlign: "center",
	},
    visibility: {
        color: "gray",
        position: "absolute",
        margin: "auto",
        right: "15px",
        top: "27px",
    },
    passwordChangedSuccess: {
        border: "1px solid green",
		color: "green",
	},
    passwordChangedFail: {
        border: "1px solid red",
		color: "red",
	},
    typography:{
        marginTop: "10px",
    },
    saveButton:{
        marginTop: "20px"
    },
    [theme.breakpoints.down('sm')]: {
        form: {
            width: "90%",
            // margin: "auto",
        },
        messageBox: {
            width: "auto",
        },
    },
    [theme.breakpoints.down('xs')]: {
        saveButton:{
            width: "100%",
        },
    },
    ['@media (max-width:324px)']: {
        form: {
            width: "100%",
        },
        typography:{
            textAlign: "center",
        },
        saveButtonText:{
            display: "none",
        },
    },
}))

const drawerItems = [
    {
        id: 1,
        href: "articles",
        icon: <BallotIcon/>,
        text: "articles",
    },
    {
        id: 2,
        href: "profile",
        icon: <PersonIcon/>,
        text: "profile",
    },
    {
        id: 2,
        href: "delete_account",
        icon: <DeleteIcon/>,
        text: "delete account",
    },
]

export default function ChangePassword() {
    const {userState: {user, isLoggedIn}, setUserState} = useUserContext()
    var locStr = localStorage.getItem('current_user')
    useEffect(() => {
        if(isLoggedIn === false && localStorage.getItem('current_user') === null){
            setUserState({isSigningUp: true, isLoggedIn: false,isLoggingIn: false,})
        }
    }, [])
    const [passwordState, setPasswordState] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [visibility, setVisibility] = useState({
        password: false,
        newPassword: false,
        confirmPassword: false,
    })
    const [formErrors, setFormErrors] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [serverResponse, setServerResponse] = useState({
        responseStatus: "",
        responseError: "",
        errorField: "",
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
            password: "",
            newPassword: "",
            confirmPassword: "",
        };
        if(passwordState["password"] === ""){
            isValid = false
            errors["password"] = "this field is required"
        }
        if(passwordState["newPassword"] === ""){
            isValid = false
            errors["newPassword"] = "this field is required"
        }
        if(passwordState["confirmPassword"] === ""){
            isValid = false
            errors["confirmPassword"] = "this field is required"
        }
        setFormErrors(errors)
        
        return isValid
    }
    const handleSubmit = () => {
        if(formValidation(passwordState)){
            let putFormData = new FormData();
            putFormData.append("password", passwordState.newPassword)
            putFormData.append("password2", passwordState.confirmPassword)
            putFormData.append("old_password", passwordState.password)
            
            axiosInstance.put('user/change_password/'+ user.id + '/', putFormData)
            .then((res) => {
                setServerResponse({
                    responseStatus: "200",
                    responseError: "",
                    errorField: "",
                    responseErrorMessage: "",
                })
                setPasswordState({
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                })
                setVisibility({
                    password: false,
                    newPassword: false,
                    confirmPassword: false,
                })
                setFormErrors({
                    password: "",
                    newPassword: "",
                    confirmPassword: "",
                })
            })
            .catch((err)=> {
                var message
                var field
                if(err.response.data.new_password !== undefined){
                    message = err.response.data.new_password["new_password"]
                    field = "new_password"
                }else if(err.response.data.old_password !== undefined){
                    message = err.response.data.old_password["old_password"]
                    field = "old_password"
                }else if(err.response.data.password !== undefined){
                    message = err.response.data.password[0]
                    field = "new_password"
                }
                setServerResponse({
                    responseStatus: "400",
                    errorField: field,
                    responseErrorMessage: message,
                })
            })
        }
    }
    const visibilityIconStyle = { fontSize: 30 }
    if(isLoggedIn === false && locStr === null) {
		return <NoAccess/>
	}
    else return (
        <div className={classes.root}>
            <CustomDrawer drawerItems={drawerItems} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={1} display="flex" 
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box 
                        style={{display: !(serverResponse.responseStatus === "200") && 'none'}}
                        className={[classes.messageBox, classes.passwordChangedSuccess]}
                    >
                        your password had been successfully updated
                    </Box>
                    <Box 
                        style={{display: !(serverResponse.responseStatus === "400") && 'none'}}
                        className={[classes.messageBox, classes.passwordChangedFail]}
                    >
                        {serverResponse.responseErrorMessage}
                    </Box>
                </Grid>
                <form className={classes.form} noValidate>
                    <Grid container spacing={1} display="flex">
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                className={classes.typography}
                                // style={{marginTop: "10px"}}
                            >
                                Please enter your current password
                            </Typography>
                        </Grid>
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
                            id="password"
                            name="password"
                            type={!(visibility.password)? "password": null}
                            autoComplete="password"
                            value={passwordState["password"]}
                            onChange={handleChange}
                            error = {(
                                (formErrors["password"]!=="" && passwordState["password"]==="")||
                                serverResponse.errorField === "old_password"
                            )}
                            helperText={passwordState["password"]==="" ? formErrors["password"]: null}
                        />
                        <div
                            className={classes.visibility}
                            onClick={() => handleVisibility("password")}
                        >
                            {
                                (visibility.password)? 
                                    <VisibilityOffIcon style={visibilityIconStyle}/> : 
                                    <VisibilityIcon style={visibilityIconStyle}/>
                            }
                            
                        </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                className={classes.typography}
                                // style={{marginTop: "10px"}}
                            >
                                Please enter your new password
                            </Typography>
                        </Grid>
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
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                className={classes.typography}
                                // style={{marginTop: "10px"}}
                            >
                                Confirm your new password
                            </Typography>
                        </Grid>
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
                        <Grid item container xs={12} justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.saveButton}
                                onClick={handleSubmit}
                                startIcon={<SaveIcon />}
                            >
                                <span className={classes.saveButtonText}>Save changes</span>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </main>
        </div>
    )
}
