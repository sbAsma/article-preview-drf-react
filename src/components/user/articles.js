import React, {useState, useEffect} from "react";
import {
    Card,
    CardContent,
    CardActions,
    Box,
    Typography,
    IconButton,
    makeStyles
} from '@material-ui/core'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        display: "flex",
    },
    cardDetails:{
        display: 'flex',
        flexDirection: 'row',
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
    },
    articleTitle: {
        fontSize: "16px",
        textAlign: "left",
        fontWeight: "bold",
    },
    articleText: {
        display: "flex",
        justifyContent: "left",
        alignItems: "baseline",
        fontSize: "12px",
        textAlign: "left",
        marginBottom: theme.spacing(2),
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
	[theme.breakpoints.down('xs')]: {
        addButton: {
			width: "90%",
		},
		cardRoot: {
			width: "90%",
			height: "100%",
			flexDirection: "column",
		},
        cardDetails:{
			display: 'flex',
			flexDirection: 'column',
		},
		cardMedia: {
			width: "100%",
			height: '150px',
		},
        articleText: {
            marginBottom: 0,
        },
        cardActions: {
            flexDirection: 'row',
        },
	},
	[theme.breakpoints.between('sm', 'md')]: {
		addButton: {
			width: "500px",
		},
        cardRoot: {
			width: "500px",
			height: "100%",
			flexDirection: 'column',
		},
        cardDetails: {
            height: '190px',
        },
        cardMedia: {
            marginTop: theme.spacing(3),
			width: "38%",
			height: '160px',
		},
		cardContent: {
			width: "62%",
		},
        cardActions: {
            flexDirection: 'row',
        },
	},
	[theme.breakpoints.up('md')]: {
        addButton: {
			width: "700px",
		},
		cardRoot: {
			width: "700px",
			height: "200px",
			flexDirection: 'row',
		},
        cardDetails: {
            height: '200px',
            width: '100%',
        },
		cardContent: {
			width: "55%",
            height: '100%',
		},
        cardMedia: {
            marginTop: 0,
			width: "45%",
			height: '100%',
		},
        cardActions: {
            flexDirection: 'column',
            alignItems: 'center',
        },
	},
}));

const Articles = (props) => {
    const onOperationClick = (id, operation) => {
        props.onOperationClick(id, operation);
    };
    const { articles, userId } = props;
    const [noArticles, setNoArticles] = useState(true)
    const [loadingPlop, setLoadingPlop] = useState(true)
    useEffect(()=>{
        for(const article of articles){
            if(article.author === userId){
                setNoArticles(false)
                break
            }
        }
        setLoadingPlop(false)
    }, [articles, userId])
    const classes = useStyles();
    if (!articles){
        return <div>Server Error</div>
    }
    else if (noArticles === true && loadingPlop === false){
        return (
            <Box
                m={2}
                display="flex"
                alignItems="center"
                flexDirection="column"
            >
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    color="textSecondary"
                >
                    You don't currently have any articles
                </Typography>
                
            </Box>
        );
    }
    else {
        return (
            <React.Fragment>
                {articles.map((article) => {
                    if(article.author===userId){
                        var articleTitle = article.title.substr(0, 60) + '...'
                        if(article.title.length < 60){
                            articleTitle = article.title
                        }
                        var articleContent = article.content.substr(0, 320) + '...'
                        if(article.content.length< 260){
                            articleContent = article.content
                        }
                        return (
                            <Box
                                m={2}
                                key={article.id}
                                display="flex"
                                alignItems="center"
                                flexDirection="column"
                            >
                                <Card className={classes.cardRoot}>
                                    <div className={classes.cardDetails}>
                                        <div 
                                            className={classes.cardMedia}
                                            style={{
                                                backgroundImage: `url(${article.picture} )`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                            }}
                                        />
                                        <CardContent
                                            className={classes.cardContent}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="h2"
                                                className={classes.articleTitle}
                                            >
                                                {articleTitle}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.articleText}
                                            >
                                                {articleContent}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <CardActions className={classes.cardActions}>
                                        <IconButton
                                            onClick={() =>
                                                onOperationClick(
                                                    article.id,
                                                    "isEdit"
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                onOperationClick(
                                                    article.id,
                                                    "isDelete"
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Box>
                        );
                    }else return <div key={article.id}></div>
                })}
            </React.Fragment>
        )
	}
};
export default Articles;
