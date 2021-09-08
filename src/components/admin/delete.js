import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

// const DeleteContent = () => {
// 	if()
// }
export default function Delete(props) {
	const handleSubmit = () => {
		props.onDeleteConfirm(props.article.id, "isDelete")
	};
	const handleCancel = () =>{
		props.onDeleteCancel("isDelete")
	}
	const txt = (props.article === undefined)? "article is undefined": props.article.title
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
				Do you really want to delete article {txt}
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button 
				variant="contained"
				onClick={handleSubmit} 
				type="submit"
				color="primary">
				Confirm delete
			</Button>
			<Button 
				variant="contained"
				onClick={handleCancel} 
				color="secondary" 
				autoFocus>
				cancel
			</Button>
			</DialogActions>
		</Dialog>
	);
}
