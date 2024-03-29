import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from '@mui/material/Alert';
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { ClimbingBoxLoader } from 'react-spinners'

import Lottie from 'react-lottie';
import * as animationData from './animation.json'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Row, Col } from 'react-bootstrap';

import firebase from "firebase";
import AppBar from "../appbar/appbar"

require('firebase/auth')

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            email: null,
            password: null,
            passwordConfirmation: null,
            signupBtnText: "Sign Up",
            isSignupBtnEnable: true,
            signupError: "",
            loading: false
        };
    }

    componentDidMount() {
        AOS.init({
            duration: 1000,
            once: true
        });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 2500)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    render() {
        const { classes } = this.props;

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div>
                {this.state.loading ?
                    <div>
                        <h3 className={classes.loader1}> &lt;\&gt; backSlash &nbsp;</h3>
                        <ClimbingBoxLoader
                            color={"#fff"}
                            speedMultiplier="1.2"
                            size={30}
                            loading={this.state.loading}
                        />
                        <p className={classes.loader2}>Gather your thoughts and make them even better!</p>
                    </div>
                    :
                    <div>
                        <AppBar />
                        <Row className="row-container">
                            <Col lg={6} data-aos="fade-up" data-aos-delay="300" className={classes.lottieAnimation}>
                                <Lottie
                                    height={550}
                                    width={650}
                                    options={defaultOptions}
                                    isClickToPauseDisabled={true}
                                />
                            </Col>
                            <Col lg={6}>
                                <Container component="main" maxWidth="sm">
                                    <CssBaseline />
                                    <div className={classes.paper}>
                                        <Link className={classes.link} to="/landing">
                                        </Link>
                                        <Avatar className={classes.avatar} data-aos="zoom-in"
                                            data-aos-delay="100">
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5" data-aos="zoom-in"
                                            data-aos-delay="100">
                                            Sign up
                                        </Typography>
                                        <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        data-aos="zoom-in"
                                                        data-aos-delay="200"
                                                        style={{ color: "#ffffff" }}
                                                        variant="outlined"
                                                        required={true}
                                                        fullWidth
                                                        id="username"
                                                        label="Username"
                                                        name="username"
                                                        autoComplete="off"
                                                        onChange={e => this.userTyping("username", e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        data-aos="zoom-in"
                                                        data-aos-delay="300"
                                                        style={{ color: "#ffffff" }}
                                                        variant="outlined"
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
                                                        data-aos-delay="400"
                                                        variant="outlined"
                                                        required={true}
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="off"
                                                        onChange={e => this.userTyping("password", e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        data-aos="zoom-in"
                                                        data-aos-delay="500"
                                                        variant="outlined"
                                                        required={true}
                                                        fullWidth
                                                        name="passwordConfirmation"
                                                        label="Password Confirmation"
                                                        type="password"
                                                        id="password-confirmation"
                                                        autoComplete="off"
                                                        onChange={e => this.userTyping("passwordConfirmation", e)}
                                                    />
                                                </Grid>
                                                {this.state.signupError ? (
                                                    <Grid container justifyContent="center">
                                                        <Grid item>
                                                            <Alert severity="error">
                                                                <span
                                                                    className={classes.errorText}>{this.state.signupError}
                                                                </span>
                                                            </Alert>
                                                        </Grid>
                                                    </Grid>
                                                ) : null}
                                            </Grid>
                                            <Button
                                                data-aos="zoom-in"
                                                data-aos-delay="600"
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                disabled={!this.state.isSignupBtnEnable}
                                            >
                                                {this.state.signupBtnText}
                                            </Button>

                                            <Row className="row-container">
                                                <Col xs={6} md={6} lg={6} data-aos="fade-right" data-aos-delay="800">
                                                    <p onClick={this.signInWithFacebook} href="/#"
                                                        className="social-button"
                                                        id="facebook-connect">
                                                        <span>Facebook</span>
                                                    </p>
                                                </Col>
                                                <Col xs={6} md={6} lg={6} data-aos="fade-left" data-aos-delay="1000">
                                                    <p onClick={this.signUpWithGoogle} href="/#"
                                                        className="social-button"
                                                        id="google-connect">
                                                        <span>Google</span>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Grid container justifyContent="center">
                                                <Grid item>
                                                    <Typography
                                                        className={classes.link}
                                                        variant="body2"
                                                        data-aos="zoom-in"
                                                        data-aos-delay="1400"
                                                    >
                                                        Already have an account?{" "}
                                                        <Link to="/signin" className={classes.signIn}>Sign in</Link>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </div>
                                </Container>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        );
    }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    userTyping = (type, e) => {
        switch (type) {
            case "username":
                this.setState({ username: e.target.value });
                break;
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            case "passwordConfirmation":
                this.setState({ passwordConfirmation: e.target.value });
                break;
            default:
                break;
        }
    };

    addEmailAfterAuth = (res) => {
        const userObj = {
            email: res.user.email
        };
        firebase
            .firestore()
            .collection("users")
            .doc(res.user.email)
            .set(userObj)
            .then(() => {
                this.props.history.push("/app");
            },
                dbError => {
                    this.setState({ signupError: "Failed to Sign Up. Try again." });
                }
            );
    }

    handleAuthError = (authError) => {
        this.setState({
            signupBtnText: "Sign Up",
            isSignupBtnEnable: true,
        })
        this.setState({ signupError: authError.message });
    }

    signUpWithGoogle = () => {
        let google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
            .then((res) => {
                this.addEmailAfterAuth(res)
            },
                authError => {
                    this.handleAuthError(authError)
                }
            )
    }

    signInWithFacebook = () => {
        let facebook_provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebook_provider)
            .then((res) => {
                this.addEmailAfterAuth(res)
            },
                authError => {
                    this.handleAuthError(authError)
                }
            )
    }

    submitSignup = e => {
        e.preventDefault();

        if (!this.formIsValid()) {
            this.setState({ signupError: "Passwords do not match!" });
            return;
        }

        this.setState({
            signupBtnText: "Please Wait...",
            isSignupBtnEnable: false,
        })

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authRes => {
                const userObj = {
                    email: authRes.user.email
                };
                authRes.user.sendEmailVerification();
                firebase
                    .firestore()
                    .collection("users")
                    .doc(this.state.email)
                    .set(userObj)
                    .then(() => {
                        authRes.user.updateProfile({
                            displayName: this.state.username,
                        }).then(() => {
                            this.props.history.push("/confirm");
                        })
                    },
                        dbError => {
                            this.setState({ signupError: "Failed to Sign Up. Try again." });
                        }
                    );
            },
                authError => {
                    this.setState({
                        signupBtnText: "Sign Up",
                        isSignupBtnEnable: true,
                    })
                    this.setState({ signupError: authError.message });
                }
            );
    };
}

export default withStyles(styles)(SignUp);