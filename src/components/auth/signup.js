import React, { useState } from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    IconButton,
    CssBaseline,
    makeStyles 
} from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { useUserContext } from "../context/UserContexProvider";
import axiosInstance from "../../axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 221px)",
    },
    imageContainer: {
        marginBottom: theme.spacing(3),
        position: "relative",
        display: "flex",
        margin: "auto",
    },
    imageIcon: {
        marginRight: "auto",
        marginLeft: "auto",
        opacity: 1,
        transition: theme.transitions.create("opacity"),
        color: "black",
        "&:hover": {
            opacity: 0.5,
            transition: "none",
        },
        width: "160px",
        height: "160px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "80px",
        border: "2px solid gray",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    visibility: {
        color: "gray",
        position: "absolute",
        margin: "auto",
        right: "15px",
        top: "22px",
    },
}));

var avatarUrl_

if (window.location.origin === "http://localhost:3000") {
    avatarUrl_ = "http://127.0.0.1:8000/media/users/defaut_avatar.png"; // development address
} else {
    avatarUrl_ = "https://article-preview-drf-react.herokuapp.com/media/users/defaut_avatar.png"; // production address
}

export default function SignUp(props) {
	const {setUserState} = useUserContext()

    const initialFormData = Object.freeze({
        firstName: "",
        lastName: "",
        avatarUrl: avatarUrl_, // hardcoded
        email: "",
        username: "",
        password: "",
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [formAvatar, updateFormAvatar] = useState(null);
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        avatar: "", 
        email: "",
        isEmailValid: "",
        username: "",
        password: "",
    })
    const [visibility, setVisibility] = useState(false)
    const redirectLogin = () =>{
        setUserState({isSigningUp: false, isLoggedIn: false,isLoggingIn: true,})
    }
    const handleUploadImage = (data) => {
        updateFormAvatar({
            avatarFile: data[0].file,
        });
        updateFormData({
            ...formData,
            avatarUrl: data[0].data_url,
        });
    };
    const handleChange = (e) => {
        if(e.target.name === "email" || e.target.name === "username"){
            const value = e.target.value
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: value.trim().toLowerCase(),
            });
        }else if(e.target.name === "password"){
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }else{
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value,
            });
        }
    };
    var emailError
    var emailErrorMsg
    const formValidation = (formData) => {
        let isValid = true
        let errors = {
            firstName: false,
            lastName: false,
            avatar: false, 
            email: false,
            username: false,
            password: false,
        };
        if(formData["firstName"] === ""){
            errors["firstName"] = "This field is required"
            isValid = false
        }
        if(formData["lastName"] === ""){
            errors["lastName"] = "This field is required"
            isValid = false
        }
        if(formData["username"] === ""){
            errors["username"] = "This field is required"
            isValid = false
        }
        if (formData["email"] !== "") {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(formData["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address";
            }
        }else{
            errors["email"] = "This field is required"
            isValid = false
        }
        if(formData["password"] === ""){
            errors["password"] = "This field is required"
            isValid = false
        }
        setFormErrors(errors)
        
        return isValid
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation(formData)
        if(isValid){
            let postFormData = new FormData();
            postFormData.append("first_name", formData.firstName);
            postFormData.append("last_name", formData.lastName);
            postFormData.append("user_name", formData.username);
            postFormData.append("email", formData.email);
            postFormData.append("password", formData.password);
            if(formAvatar!=null){
                postFormData.append(
                    "avatar",
                    formAvatar.avatarFile,
                    formAvatar.avatarFile.name
                );
            }
            axiosInstance.post(`user/create/`, postFormData)
            .then((res) => {
                setUserState({isSigningUp: false})
            }).catch((err) => {
                console.log(err)
            })
        }
    };
    const classes = useStyles();
    const visibilityIconStyle = { fontSize: 28 }
    var emailValidationIcon
    var emailValidationIconColor

    if(formData["email"] === ""){
        emailValidationIcon = <CheckCircleIcon style={{ fontSize: 28 }}/> 
        if(formErrors["email"]===""){
            emailValidationIconColor = '#6c6c6c'   
            emailError = false
            emailErrorMsg = null
        }else{
            emailValidationIconColor = '#FF0000'
            emailError = true 
            emailErrorMsg = "This field is required"
        }
    }else{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(formData["email"])) {
            emailValidationIcon = <CheckCircleIcon style={{ fontSize: 28 }}/>
            emailValidationIconColor = '#008000'
            emailError = false
            emailErrorMsg = null
        }else{
            emailValidationIcon = <CancelIcon style={{ fontSize: 28 }}/> 
            emailValidationIconColor = '#FF0000'    
            if(formErrors["email"]!==""){
                emailError = true 
                emailErrorMsg = "Please enter valid email address" 
            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} alignItems="center" container>
                            <div className={classes.imageContainer}>
                                <ImageUploading
                                    multiple={false}
                                    onChange={handleUploadImage}
                                    acceptType={["jpg", "png", "jpeg"]}
                                    dataURLKey="data_url"
                                >
                                    {({ onImageUpload }) => (
                                        <IconButton
                                            color="primary"
                                            className={classes.imageIcon}
                                            style={{
                                                backgroundImage: `url(${formData.avatarUrl})`,
                                            }}
                                            onClick={onImageUpload}
                                            // waves='light'
                                            // disableRipple = {true}
                                        >
                                            <PhotoCameraIcon
                                                style={{ fontSize: 40 }}
                                            />
                                        </IconButton>
                                    )}
                                </ImageUploading>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error = {formErrors["firstName"]!=="" && formData["firstName"]===""}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                // value={formData["firstName"]}
                                onChange={handleChange}
                                autoFocus
                                helperText={formData["firstName"]==="" ? formErrors["firstName"]: null}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error = {formErrors["lastName"]!=="" && formData["lastName"]===""}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                                helperText={formData["lastName"]==="" ? formErrors["lastName"]: null}
                            />
                        </Grid>
                        <Grid item xs={12}
                            style={{
                                position: "relative",
                            }}
                        >
                            <TextField
                                error = {emailError}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                helperText={emailErrorMsg}
                            />
                            <div 
                                style={{
                                    color: emailValidationIconColor,
                                    position: "absolute",
                                    margin: "auto",
                                    right: "15px",
                                    top: "22px",
                                }}
                            >
                                {emailValidationIcon}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error = {formErrors["username"]!=="" && formData["username"]===""}
                                variant="outlined"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="username"
                                id="username"
                                autoComplete="current-username"
                                value={formData.username}
                                onChange={handleChange}
                                helperText={formData["username"]==="" ? formErrors["username"]: null}
                            />
                        </Grid>
                        <Grid item xs={12}
                            style={{
                                position: "relative",
                            }}
                        >
                            <TextField
                                error = {formErrors["password"]!=="" && formData["password"]===""}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={!(visibility)? "password": null}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                helperText={formData["password"]==="" ? formErrors["password"]: null}
                            />
                            <div
								className={classes.visibility}
								onClick={() => setVisibility(!visibility)}
							>
								{
									(visibility)? 
										<VisibilityOffIcon style={visibilityIconStyle}/> : 
										<VisibilityIcon style={visibilityIconStyle}/>
								}
								
							</div>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
								variant="body2"
                                onClick={redirectLogin}
                                >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
