import React, { useState } from "react";
import axiosInstance from "../../axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useAdminContext } from "../context/AdminContexProvider";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
}));

export default function Login(props) {
	const {setAdminState} = useAdminContext()

    const initialFormData = Object.freeze({
        username: "",
        password: "",
    });
    const [formData, updateFormData] = useState(initialFormData);
	const [wrongCred, setWrongCred] = useState(false)
	const redirectSignUp = () =>{
        setAdminState({isSigningUp: true, isLoggingIn: false})
    }
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`token/`, {
                user_name: formData.username,
                password: formData.password,
            })
            .then((res) => {
				console.log(res)
				localStorage.setItem("access_token", res.data.access);
				localStorage.setItem("refresh_token", res.data.refresh);
				localStorage.setItem("current_user", formData.username);
				axiosInstance.defaults.headers["Authorization"] =
					"JWT " + localStorage.getItem("access_token");
				setAdminState({ 
					isLoggedIn: true,
				});
            }).catch((err) => {
				console.log(err);
				setWrongCred(true)
			});
    };

    const classes = useStyles();

	return (
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
								onChange={handleChange}
								error={wrongCred}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
								
							/>
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
					<Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
								variant="body2"
                                onClick={redirectSignUp}
                                >
                                Not registered yet? Sign up
                            </Link>
                        </Grid>
                    </Grid>
				</form>
			</div>
		</Container>
	);
}
