import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import UserPage from "./UserPage"
import '../css/navbar.css'
import {Helmet} from "react-helmet";
import logo from '../images/logo.png';
import {Navbar, Nav} from 'react-bootstrap/'
import HomeComponent from './HomeComponent'
import HotSongsOut from './HotSongsOut'
import {Switch, Route} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'

function NavigationBar(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSignUp, setOpenSignUp] = useState(false);
    const [removeLogIn, setRemoveLogIn] = useState(true);
    const [open, setOpen] = useState(false);
    const [stayLogedIn, setStayLogedIn] = useState(false);
    const [addSong, setAddSong] = useState(false)
    const [songData, setSongData] = useState([])
    

    const handleAddSong = () => { setAddSong(true) }
    const handleAddSongClose = () => { setAddSong(false) }
    const handleStaySignedIn= (event) => { setStayLogedIn(event.target.checked) }
    const handleClickOpen = () => { setOpen(true) }
    const handleSignUpClickOpen = () => { setOpenSignUp(true) } 
    const handleClose = () => { setOpen(false) }
    const handleSignUpClose = () => { setOpenSignUp(false) }
    const openLoginDialog = () => { setOpen(true) }
    const openSignUpDialog = () => { setOpenSignUp(true) }

   
   useEffect(() => {
       postData(songData)
   }, [songData]);

   useEffect(() => {
    //    getData()
        getAddData()
   }, [])

    const getAddData = () => {
        fetch('http://localhost:3001/datadance/postinfo/getfromlib/')
        .then(res => res.json())
        .then(info => {
            setSongData(info.data)
        });
    }

   const postData = (data) => {
        let options ={
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        }

        return fetch('http://localhost:3001/datadance/postinfo/addtolib/', options)
        .then(res=> res.json())
        .then(info=> {
            console.log(info)
        })
        // .catch(err => console.log(err))
    }
    
    const checkInputs = (e, type) => {
        e.preventDefault()
        let goodToGo = false

        if(username === '') {
            alert("need non empty username")
        } 
        
        if(email === '') {
            alert("need non empty email")
        } else if (!isEmail(email)) {
            alert("please input a valid email: " + "")
        } else {
            goodToGo = true
        }

        if(password === '' && confirmPassword === '') {
            alert("need non empty password and make sure they're the same")
            goodToGo = false
        } else {
            goodToGo = true
        }

        if (type === "signup"){
            if (password !== confirmPassword) {
                alert("please make sure the passwords match")
                goodToGo = false
            } else {
                goodToGo = true
            }
            
            if(password === '' && confirmPassword === '') {
                alert("need non empty password and make sure they're the same")
                goodToGo = false
            } else {
                goodToGo = true
            }
        }
        return goodToGo
    }

    const addDataToObj = (e, data) => {
        e.preventDefault()
        let newArr = [...songData]
        newArr.push(data)
        setSongData(newArr)
    }

    const tracking = (e) => {
        // e.preventDefault()
        if (checkInputs(e)) {
            setRemoveLogIn(false)
            handleClose()
            handleSignUpClose()
        } else {
            setRemoveLogIn(true)
        }

       if (stayLogedIn) {
           alert("will stay signed in")
        } else {
            alert("will NOT stay signed in")
       }
    }

    // open new tabs 
    const alertSum = (e, alertVal) => {
        e.preventDefault()
        // alert(alertVal)
        // window.open("https://open.spotify.com/playlist/37i9dQZF1E4oZRZKqqsFf2", "_blank")
        // "https://open.spotify.com/playlist/37i9dQZF1E4oZRZKqqsFf2

        window.open(alertVal)
    }

    const handleSetFields = (e, fieldToSet) => {
        switch(fieldToSet) {
            case "userName":
                setUsername(e.target.value)
              break;
            case "email":
                setEmail(e.target.value)
              break;
            case "password":
                setPassword(e.target.value)
              break;
            case "confirmPassword":
                setConfirmPassword(e.target.value)
                break;
            default:
                return ""
        }
    }

    return (
        <div>
            <Helmet bodyAttributes={{style: 'background-color: #24252a', paddingTop:"5em"}}/>
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        /><span style={{ marginLeft: '1rem' }}></span>
                        Data Dance
                    </Navbar.Brand>
                </LinkContainer> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/">
                            <Nav.Link className="nav-links">Home</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/HotSongsOut">
                            <Nav.Link className="nav-links">Hot Songs Out now</Nav.Link>
                        </LinkContainer>

                       { removeLogIn === false ?<LinkContainer to="/UserPage">
                            <Nav.Link className="nav-links">Add To Library</Nav.Link>
                        </LinkContainer> : ""}

                        { removeLogIn ? <Nav.Link className="nav-links" onClick={()=>{openLoginDialog()}}>Login</Nav.Link> : ""}
                        { removeLogIn ? <Nav.Link className="nav-links" onClick={()=>{openSignUpDialog()}}>Sign Up</Nav.Link> : ""}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    {/* need to update teh alertSum function to do something meaningful */}
                    <Route path="/hotsongsout" component={() => <HotSongsOut func={alertSum} />} />
                    <Route path="/userpage" render={(sendProps) => <UserPage {...sendProps} 
                            handleAddSongs={handleAddSong} 
                            open={addSong} 
                            handleClose={handleAddSongClose} 
                            data={songData} 
                            addSongData={addDataToObj}
                        />}      
                     />
                </Switch>
            </div>
        
            {/* signup login components */}
            <div>
               {<LoginPage 
                    setFields={handleSetFields} 
                    tracking={tracking}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleStaySignedIn={handleStaySignedIn}
                    open={open}
                    checked={stayLogedIn} 
                /> }
                {<SignupPage 
                    setFields={handleSetFields} 
                    tracking={tracking}
                    handleClickOpen={handleSignUpClickOpen}
                    handleClose={handleSignUpClose}
                    handleStaySignedIn={handleStaySignedIn}
                    open={openSignUp}
                    checked={stayLogedIn}
                />}
            </div>
        </div>
    )
}

function isEmail(mail) {
	return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail));
}

export default NavigationBar
