import React from "react";
import {
        Button,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText
} from "@material-ui/core";

export default function Delete(props) {
    const handleSubmit = () => {
        props.onDeleteConfirm(props.article.id, "isDelete", null);
    };
    const handleCancel = () => {
        props.onDeleteCancel("isDelete");
    };
    const title =
        props.article === undefined
            ? "article title is undefined"
            : props.article.title;
    return (
        <Dialog
            open={props.isDelete}
            onClose={handleCancel}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText
                // id="alert-dialog-description"
                >
                    Do you really want to delete article:
					<p style={{fontWeight : 'bold'}}>"{title}"</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    type="submit"
                    color="primary"
                >
                    Confirm delete
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCancel}
                    color="secondary"
                    autoFocus
                >
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
