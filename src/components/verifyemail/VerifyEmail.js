import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import styles from './styles';

import {Tick} from 'react-crude-animated-tick';

import Avatar from "@material-ui/core/Avatar";
import Mail from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import firebase from "firebase";
import {Link} from "react-router-dom";
import axios from "axios";

import AOS from 'aos';
import 'aos/dist/aos.css';


class VerifyEmail extends React.Component {
    constructor() {
        super();
        this.state = {
            isVerified: false,
            email: "",
            password: null,
            passwordConfirmation: null,
            resetError: "",
            code: "",
            passwordChanged: false
        }
    }

    componentDidMount() {
        AOS.init({
            duration: 1000,
            once: true
        });

        const parsedEmail = this.props.match.params.email;
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        this.setState({
            email: parsedEmail,
            code: params.oobCode,
            isVerified: (params.mode === "resetPassword")
        },() =>{
            if(!this.state.isVerified){
                this.fetchData(this.state.code)
            }
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                {
                    !this.state.passwordChanged ?
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar} data-aos="zoom-in"
                                    data-aos-delay="100">
                                <Mail/>
                            </Avatar>
                            {
                                !this.state.isVerified ?
                                    <div>
                                        <Typography component="h1" variant="h5" className={classes.text}>
                                            Your email '{this.state.email}' is verified, you can login to enjoy the features of backSlash.
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
                                    :
                                    <div>
                                        <Typography
                                            className={classes.title}
                                            data-aos="zoom-in"
                                            data-aos-delay="200"
                                        >
                                            Enter new password for {this.state.email}
                                        </Typography>
                                        <form onSubmit={e => this.submitReset(e)} className={classes.form}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        data-aos="zoom-in"
                                                        data-aos-delay="300"
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
                                                        data-aos-delay="400"
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
                                                {this.state.resetError ? (
                                                    <Grid container justifyContent="center">
                                                        <Grid item>
                                                            <Typography className={classes.errorText} variant="body2">
                                                                {this.state.resetError}
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
                                            >
                                                Reset
                                            </Button>
                                        </form>

                                    </div>
                            }
                        </div>
                        :
                        <div className={classes.paper}>
                            <Tick size={200}></Tick>
                            <h3 style={{color:"#fff", textDecoration:"underline"}} >Success !</h3>
                        </div>
                }
            </Container>
        )
    }

    userTyping = (type, e) => {
        switch (type) {
            case "password":
                this.setState({password: e.target.value});
                break;
            case "passwordConfirmation":
                this.setState({passwordConfirmation: e.target.value});
                break;
            default:
                break;
        }
    };

    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    submitReset = e => {
        e.preventDefault();

        if (!this.formIsValid()) {
            this.setState({resetError: "Passwords do not match!"});
            return;
        }

        this.fetchData(this.state.code);
    }

    fetchData = (code) => {
        if(this.state.isVerified === true){
            let url = "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword";
            axios.post(url, {}, {
                params: {
                    key: process.env.REACT_APP_API_KEY,
                    oobCode: code,
                    newPassword: this.state.password
                }
            }).then((res) => {
                if (res.status === 200) {
                    this.setState({
                        passwordChanged: true
                    })
                    setTimeout(()=>{
                        this.props.history.push("/login");
                    },2000)
                }
            });
        }
        else{
            let url = "https://identitytoolkit.googleapis.com/v1/accounts:update";
            axios.post(url, {}, {
                params: {
                    key: process.env.REACT_APP_API_KEY,
                    oobCode: code,
                }
            });
        }
    };

}

export default withStyles(styles)(VerifyEmail);
