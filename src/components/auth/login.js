import React, { useState, useEffect } from "react";
import {
	Button,
	TextField,
	Grid,
	Typography,
	Link,
	Box,
	Container,
	CssBaseline,
	makeStyles 
} from "@material-ui/core";
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
		// minHeight: "calc(100% - 221px)",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
	wrongCredentials: {
		border: "1px solid red",
		borderRadius: '10px',
		color: "red",
		padding: theme.spacing(1),
		marginBottom: '10px',
		marginTop: '15px',
	},
	visibility: {
        color: "gray",
        position: "absolute",
        margin: "auto",
        right: "20px",
        top: "25px",
    },
}));

export default function Login(props) {
	const {setUserState} = useUserContext()
	const [username_, setUsername_] = useState("")
	useEffect(() =>{
		setUsername_(localStorage.getItem("current_user"))
	}, [])
    const initialFormData = Object.freeze({
        username: "",
        password: "",
    });
    const [formData, updateFormData] = useState(initialFormData);
	const [wrongCred, setWrongCred] = useState(false)
	const [visibility, setVisibility] = useState(false)
	const redirectSignUp = () =>{
        setUserState({isSigningUp: true, isLoggingIn: false})
    }
    const handleChange = (e) => {
		if(e.target.name === "username"){
			updateFormData({
				...formData,
				// Trimming any whitespace
				username: e.target.value.trim().toLowerCase(),
			});
		}else{
			updateFormData({
				...formData,
				// Trimming any whitespace
				password: e.target.value.trim(),
			});
		}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`token/`, {
                user_name: formData.username,
                password: formData.password,
            })
            .then((res) => {
				localStorage.setItem("access_token", res.data.access);
				localStorage.setItem("refresh_token", res.data.refresh);
				localStorage.setItem("current_user", formData.username);
				axiosInstance.defaults.headers["Authorization"] =
					"JWT " + localStorage.getItem("access_token");
				setUserState({ 
					isLoggedIn: true,
				});
            }).catch((err) => {
				console.log(err);
				setWrongCred(true)
			});
    };

    const classes = useStyles();
	const visibilityIconStyle = { fontSize: 24 }
	if (username_ === null) return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Box 
					style={{display: !wrongCred && 'none'}}
					className={classes.wrongCredentials}
				>
					There seems to be an error with your username and/or password. Please
					verify your credentials.
				</Box>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
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
								error={wrongCred}
							/>
						</Grid>
						<Grid item xs={12}
							style={{
                                position: "relative",
                            }}
						>
							<TextField
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
						Login
					</Button>
					<Grid container justifyContent="space-between">
                        <Grid item xs={12} sm={6}>
                            <Link
								variant="body2"
                                onClick={redirectSignUp}
                                >
                                Not registered yet? Sign up
                            </Link>
                        </Grid>
						<Grid item>
                            <Link
								variant="body2"
								href="user/password_reset"
                                >
                                Forgot your password?
                            </Link>
                        </Grid>
                    </Grid>
				</form>
			</div>
		</Container>
	)
	else return <div></div>
	
}
