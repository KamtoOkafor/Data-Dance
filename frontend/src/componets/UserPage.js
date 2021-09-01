import React, {useState} from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import vinyl_background from "../images/vinyl_background.png"
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {Button, TextField, Dialog, DialogActions, 
        DialogContent, DialogTitle, FormControlLabel, Switch} from '@material-ui/core'

import {
    Fab,
    Grid,
    Card,
    CardMedia,
    Typography,
    CardHeader,
    CardContent,
    CardActionArea,
} from '@material-ui/core/'
import { useEffect } from 'react';

const useStyles = makeStyles(style => ({
    cardRoot: {
        maxWidth: 340,
        maxHeight: 230,
        transition: "transform 0.15s ease-in-out"
    },
    divBody: {
        flexGrow: 1,
        padding: style.spacing(2)
    } ,
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    },
    textPos: {
        marginBottom: "10em"
    }
}))

// theme for typography 
const theme = createMuiTheme({
    typography: {
      h2: {
       fontFamily: '"Montserrat", Open Sans',
      }
    }
})

function UserPage(props) {
    const classes = useStyles()
    const [editSong, setEditSong] = useState(false)
    const [deleteSong, setDeleteSong] = useState(false)

    const handleDelSongs = () => {
        setDeleteSong(true)
    };

    const handleDelSongClose = () => {
        setDeleteSong(false)
    };

    const handleEditSongs = () => {
        setEditSong(true)
    };

    const handleEditSongClose = () => {
        setEditSong(false)
    };

    const editSongData = (e, data) => {
        e.preventDefault()
        let options ={
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }

        fetch('http://localhost:3001/datadance/postinfo/updatelib/', options)
        .then(res => res.json())
        .then(info => {
           console.log(info)
        });
    }

    const deleteSongData = (e, data) => {
        e.preventDefault()
        let options ={
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }
        fetch('http://localhost:3001/datadance/postinfo/deleteFromlib/', options)
        .then(res=> res.json())
        .then(info=> {
            console.log(info)
        })
        // .catch(err => console.log(err))
    }

    return (
        <div className={{paddingTop: "5em"}}>   
            <br /><br /><br />
            <ThemeProvider theme={theme}>
                <div>
                    <Typography
                            variant="h2"
                            color="inherit"
                            style={{ fontWeight: "500", 
                                    fontSsize:"6em", 
                                    textAlign: "center" , 
                                    color: "#006C87"}}
                        >
                        Add to Your Library
                    </Typography>

                    <div style={{marginLeft: "1em"}}>
                        <Fab size="small" color="primary" aria-label="add" >
                            <AddIcon onClick={props.handleAddSongs}/>
                        </Fab>
                        
                        <Fab size="small" color="secondary" aria-label="add" style={{marginLeft: "1em"}}>
                            {/* <EditIcon onClick={()=>{handleEditSongs()}}/> */}
                            <EditIcon onClick={handleEditSongs}/>
                        </Fab>

                        <Fab size="small" aria-label="Delete" style={{marginLeft: "1em"}}>
                            <DeleteIcon onClick={handleDelSongs}/>
                        </Fab>
                    </div>
                    <div className={classes.divBody}>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            {props.data.map(elem => (
                                <Grid item xs={12} sm={6} md={3} key={props.data.indexOf(elem)}>
                                    <NewCard elem={elem} data={elem} />  
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div>
                        <AddSongInfo 
                            open={props.open} 
                            handleClose={props.handleClose}
                            addData={props.addSongData}
                            data={props.data}
                        />

                        <EditSongInfo 
                            popOpen={editSong} 
                            handleClose={handleEditSongClose}
                            editData={editSongData}
                        />
                         <DeleteSongInfo 
                            popOpen={deleteSong} 
                            handleClose={handleDelSongClose}
                            deleteData={deleteSongData}
                        />
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

function DeleteSongInfo(props) {
    const data = {infoType: "addedByUser"}
    const addToData = (e, info) => {
        e.preventDefault()
        data[info] = e.target.value
    }

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'}}>

            <Dialog open={props.popOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Song You Want to Delete</DialogTitle>
                <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Song to Delete"
                            type="text"
                            onChange={(event) => {addToData(event, "song")}}
                            fullWidth
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Artist"
                            type="text"
                            onChange={(event) => {addToData(event, "artist")}}
                            fullWidth
                        />
                 </DialogContent>
                 <DialogActions>
                        {/* <Button onClick={() => {props.handleClose()}} color="primary"> */}
                        <Button onClick={props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={e => {props.deleteData(e, data); props.handleClose()}} color="primary">
                            Delete
                        </Button>
                </DialogActions>
            </Dialog>
        
        </div>
    )
    
}

/* EDIT SONG */
function EditSongInfo(props) {
    const data = {infoType: "addedByUser"}

    const addToData = (e, info) => {
        e.preventDefault()
        data[info] = e.target.value
    }

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'}}>

            {/* <Dialog open={props.popOpen} onClose={()=>{props.handleClose()}} aria-labelledby="form-dialog-title"> */}
            <Dialog open={props.popOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit a Song Info</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Song to Change"
                            type="text"
                            onChange={(event) => {addToData(event, "songToChange")}}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Song name"
                            type="text"
                            onChange={(event) => {addToData(event, "song")}}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Artist"
                            type="text"
                            onChange={(event) => {addToData(event, "artist")}}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Producer"
                            type="text"
                            onChange={(event) => {addToData(event, "producer")}}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Album"
                            type="text"
                            onChange={(event) => {addToData(event, "album")}}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Link"
                            type="text"
                            onChange={(event) => {addToData(event, "link")}}
                            fullWidth
                        />
                    </DialogContent>
                    
                    <DialogActions>
                        {/* <Button onClick={() => {props.handleClose()}} color="primary"> */}
                        <Button onClick={props.handleClose} color="primary">
                            Cancel
                        </Button>
                        
                        <Button onClick={e => {props.editData(e, data); props.handleClose()}} color="primary">
                            Edit
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

/* ADD SONG */
function AddSongInfo(props) {
    const data = {infoType: "addedByUser"}

    const addToData = (e, info) => {
        e.preventDefault()
        data[info] = e.target.value
    }

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Dialog open={props.open} onClose={() => {props.handleClose()}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Song</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Song"
                        type="text"
                        onChange={(event) => {addToData(event, "song")}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Artist"
                        type="text"
                        onChange={(event) => {addToData(event, "artist")}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Producer"
                        type="text"
                        onChange={(event) => {addToData(event, "producer")}}
                        fullWidth
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Album"
                        type="text"
                        onChange={(event) => {addToData(event, "album")}}
                        fullWidth
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Link"
                        type="text"
                        onChange={(event) => {addToData(event, "link")}}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* here is the button that logs the information in the navigation bar */}
                    <Button onClick={e => {props.addData(e, data); props.handleClose()}} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


function NewCard(props) {
    const classes = useStyles()
    const [state, setState] = useState({
        raised:false,
        shadow:1,
    })

    let alertSum = (e, link) => {
        e.preventDefault()
        alert(link)
        // window.open("https://open.spotify.com/playlist/37i9dQZF1E4oZRZKqqsFf2", "_blank")
        // "https://open.spotify.com/playlist/37i9dQZF1E4oZRZKqqsFf2
    }

    return (
        <Card
            className={classes.cardRoot}
            classes={{root: state.raised ? classes.cardHovered : ""}}
            onMouseOver={()=>setState({ raised: true, shadow:3})} 
            onMouseOut={()=>setState({ raised:false, shadow:1 })} 
            raised={state.raised} zdepth={state.shadow}
            onClick={ e => alertSum(e, props.elem.link)}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="100"
                    image={vinyl_background}  
                    title="Music Cover"
                />
                <Box width={1} display="inline">
                    <CardContent >
                    <div>
                        <Typography  variant="h6" >  {props.elem.song} </Typography>
                        <Typography variant="h7" color="textSecondary" component="p" >
                            {props.elem.artist}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" >
                            Producer by {props.elem.producer}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" >
                            Album <h9>{props.elem.album} </h9>
                        </Typography> 
                    </div>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    )          
}


export default UserPage
