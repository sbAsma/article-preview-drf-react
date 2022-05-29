import React, {useState, useEffect} from 'react';
import {
        Button,
        Typography,
        Box,
        Grid,
        TextField,
        IconButton,
        makeStyles 
} from '@material-ui/core';
import ImageUploading from "react-images-uploading";
import BallotIcon from '@material-ui/icons/Ballot';
import SaveIcon from '@material-ui/icons/Save';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {useAdminContext} from '../context/AdminContexProvider'
import axiosInstance from "../../axios";
import CustomDrawer from '../customDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
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
        margin: "auto",
        width: "60%", // Fix IE 11 issue.
    },
    avatarContainer: {
        margin: 'auto',
        position: "relative",
        display: "flex",
        width: "130px",
        height: "130px",
        
    },
    divAvatar: {
        // color: "white",
        width: "100%" ,//"120px",
        height: "100%" ,//"120px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "50%", // "60px",
        border: "6px solid gray",
    },
    imageIconContainer: {
        position: "absolute",
        right: 6,
        bottom: 6,
        width: "25%",
        height: "25%",
        backgroundColor: "gray",
        borderRadius: "30px",
    },
    imageIcon: {
        color: "white",
        width: "100%",
        height: "100%",
    },
    textFields: {
        display: "flex",
        flexDirection: "row",
        margin: theme.spacing(3),
        width: "100%",
        alignContent: "space-between",
    },
    button: {
        marginTop: '15px',
    },
}));

const drawerItems = [
    {
        id: 1,
        href: "articles",
        icon: <BallotIcon/>,
        text: "articles",
    },
    {
        id: 2,
        href: "change_password",
        icon: <LockIcon/>,
        text: "change password",
    },
    {
        id: 3,
        href: "delete_account",
        icon: <DeleteIcon/>,
        text: "delete account",
    },
]

export default function AdminProfile(){
    const classes = useStyles();
    const {adminState: {
        user,
    }, setAdminState} = useAdminContext()
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avatarFile: null,
        avatarUrl: '',
    })
    // console.log("user", user)
    useEffect(()=>{
        if(Object.keys(user).length !== 0){
            setUserProfile({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatarUrl: user.avatar
            })
        }
    }, [user])

    const handleUploadImage = (data) => {
        setUserProfile({
            ...userProfile,
            avatarFile: data[0].file,
            avatarUrl: data[0].data_url,
        });
    };
    const handleChange = (e) => {
        setUserProfile({
            ...userProfile,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userProfile)
        let putFormData = new FormData();
        putFormData.append("first_name", userProfile.firstName);
        putFormData.append("last_name", userProfile.lastName);
        putFormData.append("email", userProfile.email);
        if(userProfile.avatarFile != null){
            putFormData.append(
                                "avatar", 
                                userProfile.avatarFile,
                                userProfile.avatarFile.name
                                );
        }
        axiosInstance.patch('user/profile/'+ user.id + '/', putFormData).then((res) => {
            console.log(res);
			setAdminState({user: res.data})
        });
    }
    return (
        <div className={classes.root}>
            <CustomDrawer drawerItems={drawerItems} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display="flex" alignItems="center" container>
                            <div className={classes.avatarContainer}>
                                <div
                                    src={userProfile.avatarUrl}
                                    className={classes.divAvatar}
                                    style={{
                                        backgroundImage: `url(${userProfile.avatarUrl})`,
                                    }}
                                >
                                    <ImageUploading
                                        multiple={false}
                                        onChange={handleUploadImage}
                                        acceptType={["jpg", "png", "jpeg"]}
                                        dataURLKey="data_url"
                                    >
                                        {({ onImageUpload }) => (
                                            <div
                                                className={
                                                    classes.imageIconContainer
                                                }
                                            >
                                                <IconButton
                                                    color="default"
                                                    className={classes.imageIcon}
                                                    onClick={onImageUpload}
                                                >
                                                    <PhotoCameraIcon style={{ fontSize: 22 }}/>
                                                </IconButton>
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" container>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="fontWeightBold"
                                style={{
                                    margin: 'auto',
                                }}
                            >
                                <Box fontWeight="fontWeightBold">
                                    Basic Details
                                </Box>
                            </Typography>
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
                                value={userProfile.firstName}
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
                                value={userProfile.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" alignContent="center" container>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="fontWeightBold"
                                style={{
                                    margin: 'auto',
                                }}
                            >
                                <Box fontWeight="fontWeightBold">
                                    Contact Details
                                </Box>
                            </Typography>
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
                                value={userProfile.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                onClick={handleSubmit}
                                startIcon={<SaveIcon />}
                            >
                                Save changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </main>
        </div>
    );
}