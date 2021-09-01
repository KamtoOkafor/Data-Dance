import React, {useState, useEffect} from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import vinyl_background from "../images/vinyl_background.png"
import "../css/hotSongsOut.css"
import Box from '@material-ui/core/Box';

import {
    Grid,
    Card,
    Typography,
    CardContent,
    CardMedia,
    CardActionArea,
} from '@material-ui/core/'

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
    },
})

function HotSongsOut(props) {
    const classes = useStyles()
    const [songToPost, setSongToPost] = useState([]);

    useEffect(()=> { 
        getData()
        console.log(songToPost)
    }, []);

    const getData = () => {
        fetch('http://localhost:3001/datadance/getinfo/')
          .then(res => res.json())
          .then(info => {
            console.log(info.data)
            setSongToPost(info.data)
          });
      }
      
    return (
        <div className={{paddingTop: "5em"}}>   
          <br /><br /><br />
            <ThemeProvider theme={theme} >
                <div >
                    <Typography
                        variant="h2"
                        color="inherit"
                        style={{ fontWeight: "500", 
                                fontSsize:"6em", 
                                textAlign: "center" , 
                                color: "#006C87"}}
                    >
                    Top Songs Right Now
                    </Typography>
                </div>

                <div className={classes.divBody}>
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {/* {data.map(elem => (
                            <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                                <NewCard elem={elem} data={elem} func={props.func}/>  
                            </Grid>
                        ))} */}
                        {songToPost.map(elem => (
                            <Grid item xs={12} sm={6} md={3} key={songToPost.indexOf(elem)}>
                                <NewCard elem={elem} data={elem} func={props.func}/>  
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </ThemeProvider>
        </div>
    )
}

function NewCard(props) {
    const classes = useStyles()
    const [state, setState] = useState({
        raised:false,
        shadow:1,
    })

    let alertSum = (e) => {
        e.preventDefault()
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
            onClick={ e => props.func(e, props.elem.link)}
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
                                Producer by: {props.elem.producer}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" >
                                Album: <h9>{props.elem.album} </h9>
                            </Typography> 
                        </div>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    )          
}

export default HotSongsOut
