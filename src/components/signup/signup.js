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
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import firebase from "firebase";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: ""
        };
    }

    render() {
        const { classes } = this.props;

        const buttonStyle = {
            backgroundColor: "#00C170"
        };

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Link className={classes.link} to="/landing">
                    </Link>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    style={{ color: "#ffffff" }}
                                    autoFocus
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
                                    variant="outlined"
                                    required={true}
                                    fullWidth
                                    name="passwordConfirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    id="password-confirmation"
                                    onChange={e => this.userTyping("passwordConfirmation", e)}
                                />
                            </Grid>
                            {this.state.signupError ? (
                                <Grid container justify="center">
                                    <Grid item>
                                        <Typography className={classes.errorText} variant="body2">
                                            {this.state.signupError}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : null}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            style={buttonStyle}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Link
                                    className={classes.link}
                                    href="#"
                                    variant="body2"
                                    to="/login"
                                >
                                    Already have an account?{" "}
                                    <span className={classes.signIn}>Sign in</span>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    userTyping = (type, e) => {
        switch (type) {
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

    submitSignup = e => {
        e.preventDefault();

        if (!this.formIsValid()) {
            this.setState({ signupError: "passwords do not match!" });
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                authRes => {
                    const userObj = {
                        email: authRes.user.email
                    };
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(this.state.email)
                        .set(userObj)
                        .then(
                            () => {
                                this.props.history.push("/app");
                            },
                            dbError => {
                                console.log(dbError);
                                this.setState({ signupError: "Failed to add user" });
                            }
                        );
                },
                autherror => {
                    this.setState({ signupError: autherror.message });
                }
            );
    };
}

export default withStyles(styles)(SignUp);
