import React from 'react';
import {Button, TextField, Dialog, DialogActions, 
        DialogContent, DialogTitle, FormControlLabel, 
        makeStyles, Switch} from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
}));

function SignupPage(props) {
   
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
        {/* this has the handleClick open thing that we are going to get rid off */}
            {/* <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
                Open form dialog
            </Button> */}

            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="email"
                        onChange={(event) => {props.setFields(event, "userName")}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        onChange={(event) => {props.setFields(event, "email")}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        onChange={(event) => {props.setFields(event, "password")}}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Confirm Password"
                        type="password"
                        onChange={(event) => {props.setFields(event, "confirmPassword")}}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* here is the button that logs the information in the navigation bar */}
                    <Button onClick={e => {props.tracking(e, "signup")}} color="primary">
                        Sign Up
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignupPage
