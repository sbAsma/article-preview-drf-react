import React, { useState } from "react";
import {
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        TextField,
        Grid,
        Container,
        IconButton,
        CssBaseline,
        makeStyles 
} from "@material-ui/core";
import ImageUploading from "react-images-uploading";
import ImageIcon from "@material-ui/icons/Image";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    titleDialog:{
        display: "flex",
        flexDirection: "column",
        margin: 'auto',
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    imageContainer: {
        marginBottom: theme.spacing(3),
        position: "relative",
        display: "flex",
    },
    imageIcon: {
        marginRight: "auto",
        marginLeft: "auto",
        color: "white",
        opacity: 1,
        transition: theme.transitions.create("opacity"),
        "&:hover": {
            opacity: 0.5,
            color: "black",
            transition: "none",
        },
        width: "250px",
        height: "250px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "16px",
    },
    actions: {
        textAlign: "right",
        alignItems: "right",
        justifyContent: "right",
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Create(props) {
    const initialFormData = Object.freeze({
        title: "",
        pictureUrl: "http://127.0.0.1:8000/media/articles/blank-img.jpg", // hardcoded
        content: "",
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [postImage, setPostImage] = useState(null);

    const handleUploadImage = (data) => {
        setPostImage({
            pictureFile: data[0].file,
        });
        updateFormData({
            ...formData,
            pictureUrl: data[0].data_url,
        });
    };
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let postFormData = new FormData();
        postFormData.append("title", formData.title);
        postFormData.append("author", props.userId);
        postFormData.append("content", formData.content);
        postFormData.append(
            "picture",
            postImage.pictureFile,
            postImage.pictureFile.name
        );
        props.handleOperation(null, "isAdd", postFormData);
		updateFormData(initialFormData);
    };
    const cancelCreateClick = () => {
        updateFormData(initialFormData);
        props.onCancleAdd("isAdd");
    };

    const classes = useStyles();

    return (
        <Dialog
            open={props.isAdd}
            onClose={cancelCreateClick}
            aria-labelledby="dialog-create-title"
            // aria-describedby="alert-dialog-description"
        >
            <DialogTitle 
                id="dialog-create-title"
                className={classes.titleDialog}
            >
                Create Article
            </DialogTitle>
            <DialogContent>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate>
                            <Grid item xs={12} alignItems="center" container justifyContent="center">
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
                                                    backgroundImage: `url(${formData.pictureUrl})`,
                                                }}
                                                onClick={onImageUpload}
                                                // waves='light'
                                                // disableRipple = {true}
                                            >
                                                <ImageIcon
                                                    style={{ fontSize: 40 }}
                                                />
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
                        </form>
                    </div>
                </Container>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} display="flex">
                    <div className={classes.actions}>
                        <IconButton
                            aria-label="submit"
                            style={{ color: "green" }}
                            onClick={handleSubmit}
                        >
                            <CheckIcon></CheckIcon>
                        </IconButton>
                        <IconButton
                            aria-label="cancel"
                            style={{ marginLeft: 10, color: "red" }}
                            onClick={cancelCreateClick}
                        >
                            <ClearIcon></ClearIcon>
                        </IconButton>
                    </div>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
