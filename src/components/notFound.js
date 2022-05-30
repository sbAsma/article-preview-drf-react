import React from 'react'
import {
    Typography,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: "90px",
        textAlign: "center",
        margin: theme.spacing(1),
    },
    title:{
        marginBottom:"30px"
    }
}))
export default function NotFound() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography
                variant='h5'
                className={classes.title}
            >
                404 Not Found
            </Typography>
            <Typography
                variant='body'
                
            >
                the page you're trying to access doesn't exist
            </Typography>
        </div>
    )
}
