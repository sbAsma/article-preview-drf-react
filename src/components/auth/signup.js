import React, { useState }  from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
// import Avatar from '@material-ui/core/Avatar';
import ImageUploading from 'react-images-uploading'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    imageContainer: {
    marginBottom: theme.spacing(3),
    position: 'relative',
    display: 'flex', 
  },
  imageIcon:{
    marginRight: 'auto',
    marginLeft: 'auto',
      color: 'white',
      opacity: 1,
      transition: theme.transitions.create('opacity'),
      color: 'black',
    '&:hover': {
      opacity: 0.5,
      color: 'black',
      transition: 'none',

    },
    width: '160px',
    height: '160px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '80px',
    border: '2px solid gray',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
	const history = useHistory()
	const initialFormData = Object.freeze({
		firstName: '',
		lastName: '',
    avatarUrl: 'http://127.0.0.1:8000/media/media/users/defaut_avatar.png', // hardcoded
		email: '',
		username: '',
		password: '',
	})
	const [formData, updateFormData] = useState(initialFormData);
  const [formAvatar, updateFormAvatar] = useState(null);

  const handleUploadImage = (data) =>{
      // console.log(data)
      updateFormAvatar({
        avatarFile: data[0].file,
      });
      updateFormData({
        ...formData,
        avatarUrl: data[0].data_url,
      });

  }
	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit= (e) => {
		e.preventDefault()
    let postFormData = new FormData();
    postFormData.append('first_name', formData.firstName);
    postFormData.append('last_name', formData.lastName); 
    postFormData.append('user_name', formData.username);
    postFormData.append('email', formData.email); 
    postFormData.append('password', formData.password);
    postFormData.append('picture', formAvatar.avatarFile, formAvatar.avatarFile.name)
    axiosInstance.post(`user/create/`, postFormData)
		.then((res)=> {
      console.log(res)
      props.handleSignup()
			// history.push('/login');

		})
	}
  	const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
        {/*   <LockOutlinedIcon /> */}
        {/* </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}  alignItems= 'center'>
                <div 
                    className = {classes.imageContainer}
                  >
                    <ImageUploading 
                          multiple = {false}
                          onChange={handleUploadImage}
                          acceptType={['jpg', 'png', 'jpeg']}
                          dataURLKey="data_url"
                          >
                          {({
                              onImageUpload,
                              }) => (
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
                                          <PhotoCameraIcon style={{ fontSize: 40 }}/>
                                      </IconButton>
                                  )}
                              </ImageUploading>
                              </div>
                  </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}