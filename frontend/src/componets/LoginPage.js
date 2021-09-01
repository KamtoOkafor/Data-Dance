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

function LoginPage(props) {
    const classes = useStyles();

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
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

                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Switch color="primary" checked={props.checked} onChange={props.handleStaySignedIn} />}
                        label="Stay Logged In?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* here is the button that logs the information in the navigation bar */}
                    <Button onClick={e => {props.tracking(e, "login")}} color="primary">
                        Login
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginPage
