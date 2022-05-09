import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import firebase from "firebase";

import AOS from 'aos';
import 'aos/dist/aos.css';

class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            resetBtnText : "Reset",
            isResetBtnEnable : true,
            resetError: "",
        };
    }

    componentDidMount() {
        AOS.init({
            duration: 500,
            once : true
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        AOS.init({
            duration: 500,
            once : true
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} data-aos="zoom-in"
                            data-aos-delay="100">
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" data-aos="zoom-in"
                                data-aos-delay="300">
                        Reset Password
                    </Typography>
                    <form onSubmit={e => this.submitForm(e)} className={classes.form}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    data-aos="zoom-in"
                                    data-aos-delay="300"
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    onChange={e => this.userTyping(e)}
                                />
                            </Grid>
                            {this.state.resetError ? (
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Typography
                                            className={classes.errorText}
                                            component="h5"
                                            variant="body2"
                                        >
                                            There is no user record corresponding to the email.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : null}
                        </Grid>
                        <Button
                            data-aos="zoom-in"
                            data-aos-delay="500"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.state.isResetBtnEnable}
                        >
                            {this.state.resetBtnText}
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }

    userTyping = (e) => {
        this.setState({email: e.target.value});
    };

    submitForm = e => {
        e.preventDefault();

        this.setState({
            resetBtnText : "Please Wait...",
            isResetBtnEnable : false,
        })

        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.props.history.push("/confirm");
            })
            .catch((error) => {
                this.setState({
                    resetBtnText : "Reset",
                    isResetBtnEnable : true,
                    resetError : true
                })
            });
    };
}

export default withStyles(styles)(ResetPassword);
