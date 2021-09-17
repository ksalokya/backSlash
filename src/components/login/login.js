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

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            loginError: "",
        };
    }


    render() {
        const { classes } = this.props;

        const buttonStyle = {
            backgroundColor: "#00C170"
        };

        return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <form onSubmit={e => this.submitLogin(e)} className={classes.form}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required={true}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoFocus
                                        onChange={e => this.userTyping("email", e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required={true}
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={e => this.userTyping("password", e)}
                                    />
                                </Grid>
                            {this.state.loginError ? (
                                <Grid container justify="center">
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
                                style={buttonStyle}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container justify="center">
                                <Grid item className={classes.linkContainer}>
                                    <Typography className={classes.link} variant="body2">
                                        Don't have an account?{" "}
                                        <Link to="/signup" className={classes.signUp}>Sign Up</Link>
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
                this.setState({ email: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            default:
                break;
        }
    };

    submitLogin = e => {
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                () => {
                    this.props.history.push("/app");
                },
                err => {
                    this.setState({ loginError: "server error" });
                    console.log(err);
                }
            );
    };
}

export default withStyles(styles)(SignIn);
