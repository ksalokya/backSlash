import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import styles from "./styles";
import firebase from "firebase";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";

import dp from "../../icons/dp.jpg"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Appbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            photo: null,
            user: null,
            anchorEl: null,
            openProfile: false,
            openSignOut: false
        }
    }

    componentDidMount() {
        const currUser = this.props.user;
        if (currUser) {
            this.setState({
                user: currUser,
                name: currUser.displayName,
                photo: currUser.photoURL
            })
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>

                {/*Profile Dialog*/}
                <Dialog
                    open={this.state.openProfile}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleProfileClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent className={classes.profileDialogue}>
                        {
                            this.state.user ?
                                <div>
                                    <img className={classes.profileImage} alt={this.state.user.displayName}
                                         src={this.state.user.photoURL || dp}/>
                                    <div className={classes.profileDetails}>
                                        <h4 className={classes.profileDetailsText}>{this.state.name}</h4>
                                        <h5 className={classes.profileDetailsText}>{this.state.user.email}</h5>
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </DialogContent>
                </Dialog>


                {/*Sign Out Dialog*/}
                <Dialog
                    open={this.state.openSignOut}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleSignoutClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Are you sure you want to Sign Out?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleSignoutClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleSignOut} color="secondary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>


                <AppBar className={this.state.user ? classes.header2 : classes.header1} position="static">
                    <Toolbar>
                        <Typography className={classes.title} data-aos="fade-right" data-aos-delay="200"
                                    data-aos-duration="800">
                            &lt;\&gt; backSlash
                        </Typography>
                        {this.state.user && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(event) => this.handleMenuOpen(event)}
                                    color="inherit"
                                    className={classes.iconBtn}
                                    data-aos="zoom-in" data-aos-delay="800"
                                    data-aos-duration="800"
                                >
                                    <Avatar alt={this.state.user.displayName} src={this.state.user.photoURL}
                                            className={classes.large}/>

                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                                    keepMounted
                                    transformOrigin={{vertical: 'top', horizontal: 'right',}}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={this.handleProfileOpen}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleSignoutOpen}>Sign Out</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>);
    }

    // avatar menu
    handleMenuOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: false
        });
    };

    // profile dialogue box
    handleProfileOpen = () => {
        this.setState({
            openProfile: true,
            anchorEl: false
        })
    }

    handleProfileClose = () => {
        this.setState({
            openProfile: false
        })
    }

    // signout dialogue box
    handleSignoutOpen = () => {
        this.setState({
            openSignOut: true,
            anchorEl: false
        })
    };

    handleSignoutClose = () => {
        this.setState({
            openSignOut: false,
        })
    };

    handleSignOut = () => {
        firebase.auth().signOut();
    }
}

export default withStyles(styles)(Appbar);
