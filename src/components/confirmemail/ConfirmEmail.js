import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from './styles';

import Avatar from "@material-ui/core/Avatar";
import Mail from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import firebase from "firebase";

class ConfirmEmail extends React.Component {
    render() {
        const { classes } = this.props;

        return(
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Mail/>
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.text}>
                        Please check your email and verify it to enjoy the features of backSlash.
                    </Typography>
                </div>
            </Container>
        )
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                this.props.history.push("/login");
            }
        })
    }
}

export default withStyles(styles)(ConfirmEmail);
