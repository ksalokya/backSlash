import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import firebase from "firebase";

import AOS from 'aos';
import 'aos/dist/aos.css';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            loginBtnText : "Sign In",
            isLoginBtnEnable : true,
            loginError: "",
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
                        Sign In
                    </Typography>
                    <form onSubmit={e => this.submitLogin(e)} className={classes.form}>
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
                                    onChange={e => this.userTyping("email", e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    data-aos="zoom-in"
                                    data-aos-delay="500"
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    autoComplete="off"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={e => this.userTyping("password", e)}
                                />
                            </Grid>
                            {this.state.loginError ? (
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Typography
                                            className={classes.errorText}
                                            component="h5"
                                            variant="body2"
                                        >
                                            The email address or password entered is incorrect
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
                            disabled={!this.state.isLoginBtnEnable}
                        >
                            {this.state.loginBtnText}
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item className={classes.linkContainer}>
                                <Typography className={classes.link} variant="body2" data-aos="zoom-in"
                                            data-aos-delay="600">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className={classes.signUp}>Sign Up</Link>
                                </Typography>

                                <Typography className={classes.link} variant="body2" data-aos="zoom-in"
                                            data-aos-delay="600">
                                    Forgot Password?{" "}
                                    <Link to="/reset" className={classes.signUp}>Reset</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }

    userTyping = (type, e) => {
        switch (type) {
            case "email":
                this.setState({email: e.target.value});
                break;
            case "password":
                this.setState({password: e.target.value});
                break;
            default:
                break;
        }
    };

    submitLogin = e => {
        e.preventDefault();

        this.setState({
            loginBtnText : "Please Wait...",
            isLoginBtnEnable : false,
        })

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                (authUser) => {
                    if (authUser.user.emailVerified === true) {
                        this.props.history.push("/app");
                    } else {
                        this.props.history.push("/confirm");
                    }
                },
                err => {
                    this.setState({
                        loginBtnText : "Sign In",
                        isLoginBtnEnable : true,
                    })
                    this.setState({loginError: "Server Error"});
                }
            );
    };
}

export default withStyles(styles)(SignIn);
