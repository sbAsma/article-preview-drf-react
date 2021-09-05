import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//upload image interface
import ImageUploading from 'react-images-uploading'
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
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
		'&:hover': {
			opacity: 0.5,
			color: 'black',
			transition: 'none',
		},
		width: '250px',
		height: '250px',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: '16px',
	},
	actions: {
		textAlign: 'right',
		alignItems: 'right',
		justifyContent: 'right',
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function Edit(){
	const history = useHistory()
	const {id} = useParams()
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		pictureUrl: '',
		content: '',
		author: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [putImage, setPutImage] = useState(null);

	useEffect(() => {
		axiosInstance.get('admin/article/' + id + '/').then((res) => {
			updateFormData({
				...formData,
				['title']: res.data.title,
				['pictureUrl']: res.data.picture,
				['content']: res.data.content,
				['author']: res.data.author,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleUploadImage = (data) =>{
			// console.log(data)
			setPutImage({
				pictureFile: data[0].file,
			});
			updateFormData({
				...formData,
				pictureUrl: data[0].data_url,
			});

	}
	const handleChange = (e) =>{
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
		let putFormData = new FormData();
		putFormData.append('title', formData.title);
		putFormData.append('author', formData.author); 
		putFormData.append('content', formData.content);
		if(putImage != null) putFormData.append('picture', 
			putImage.pictureFile, putImage.pictureFile.name)
		axiosInstance.put(`admin/article/` + id + '/', putFormData)
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};
	const cancelEditClick = () =>{
		history.push({
			pathname: '/admin/',
		});
	}

	const classes = useStyles();
	
	return(
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Article
				</Typography>
				<form className={classes.form} noValidate>
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
										backgroundImage: `url(${formData.pictureUrl})`,
									}}
									onClick={onImageUpload}
	                            >
	                                <ImageIcon style={{ fontSize: 40 }}/>
	                            </IconButton>
	                                                

	                        )}
	                    </ImageUploading>
	                    </div>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField 
								id="article-name"
								className={classes.title}
								name="title"
								value={formData.title}
								onChange={handleChange}
								label="Title" 
								variant="outlined" 
								fullWidth
								rows={2}
								multiline
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField 
								id="article-content"
								className={classes.content}
								name="content"
								value={formData.content}
								onChange={handleChange}
								label="Content" 
								variant="outlined" 
								fullWidth
								rows={8}
								multiline
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} display="flex" >
						<div className={classes.actions}>
							<IconButton 
								aria-label="submit"
								style={{ color: 'green'}}
								onClick={handleSubmit}
							>
								<CheckIcon></CheckIcon>
							</IconButton>
							<IconButton 
								aria-label="cancel"
								style={{ marginLeft: 10, color: 'red'}}
								onClick={() => cancelEditClick()}
							>
								<ClearIcon></ClearIcon>
							</IconButton>
						</div>
					</Grid>
				</form>
			</div>
		</Container>
	)
}