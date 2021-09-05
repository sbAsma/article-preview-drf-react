import React, { useState }  from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
	const history = useHistory()
	const initialFormData = Object.freeze({
		username: '',
		password: '',
	})
	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit= (e) => {
		e.preventDefault()
		axiosInstance.post(`token/`,{
			user_name: formData.username,
			password: formData.password,			
		})
		.then((res)=> {
      // test successful response !!!!
			localStorage.setItem('access_token', res.data.access)
			localStorage.setItem('refresh_token', res.data.refresh)
      localStorage.setItem('current_user', formData.username)
			axiosInstance.defaults.headers['Authorization'] = 
				'JWT' + localStorage.getItem('access_token')
			// history.push('admin/');
      // window.location.reload();
        props.handleLogin(formData.username)
		})
	}
  	const classes = useStyles();
  if(!props.isLoggedIn) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
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
          </form>
        </div>
      </Container>
    )}
  else return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Button
            // href="#"
            color="primary"
            variant="contained"
            className={classes.submit}
            component={NavLink}
            to="/logout"
          >
            Logout
          </Button>
        </div>
      </Container>
    )
}