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
import {ClimbingBoxLoader} from 'react-spinners'

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            loginError: "",
            loading:true
        };
    }

    componentDidMount() {
        this.timeHanlerv=  setTimeout(() => {
            this.setState({ loading: false });
        }, 3000)
    }

    componentWillMount() {
        if(this.timeHanlerv){
            clearTimeout(this.timeHanlerv);
            this.timeHanlerv=0;
        }
    }

    render() {
        const { classes } = this.props;

        const buttonStyle = {
            backgroundColor: "#00C170"
        };

        return (
            <div>
                {this.state.loading ?
                    <div>
                        <h3 className={classes.loader1}> &lt; backSlash &gt;</h3>
                        <ClimbingBoxLoader
                            color={"#fff"}
                            speedMultiplier="1.2"
                            size={30}
                            loading={this.state.loading}
                        />
                        <p className={classes.loader2}>An online Text Editor + Notes App.</p>
                        <p className={classes.loader2}>Designed and Developed with ❤️by <a style={{color:'blue'}} href="https://www.linkedin.com/in/salokya-kumar/">Salokya Kumar.</a></p>
                    </div>
                    :
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} onSubmit={e => this.submitLogin(e)}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    onChange={e => this.userTyping("email", e)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    onChange={e => this.userTyping("password", e)}
                                />
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
                                {this.state.loginError ? (
                                    <Typography
                                        className={classes.errorText}
                                        component="h5"
                                        variant="body2"
                                    >
                                        The email address or password entered is incorrect
                                    </Typography>
                                ) : null}
                                <Grid container justify="center">
                                    <Grid className={classes.linkContainer}>
                                        <Typography className={classes.link} variant="body2">
                                            Don't have an account?{" "}
                                            <Link to="/signup" className={classes.signUp}>Sign Up</Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>}
            </div>
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
