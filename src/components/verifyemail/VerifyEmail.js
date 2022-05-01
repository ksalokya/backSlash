import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from './styles';

import Avatar from "@material-ui/core/Avatar";
import Mail from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";

class VerifyEmail extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchData(id);
    }

    fetchData = id => {
        let url = "https://backslash-1ebbc.firebaseapp.com/__/auth/action?" + id;
        axios.post(url)
    };

    render() {
        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Mail/>
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.text}>
                        Your email is verified, you can login to enjoy the features of backSlash.
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        href="https://backslash.netlify.app/login"
                    >
                        Login In
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(VerifyEmail);
