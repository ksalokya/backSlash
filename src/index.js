import React from "react";
import ReactDOM from "react-dom";
import firebase from 'firebase';
import App from "./App"
import {Route, BrowserRouter as Router,Redirect } from 'react-router-dom';
import LoginComponent from "./components/login/login";
import SignupComponent from "./components/signup/signup";
import ConfirmEmail from "./components/confirmemail/ConfirmEmail";
import VerifyEmail from "./components/verifyemail/VerifyEmail";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

firebase.analytics();

const routing = (
    <Router>
        <div id='routing-container'>
            <Route exact path="/"> <Redirect to="/signup"></Redirect></Route>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/signup' component={SignupComponent}></Route>
            <Route exact path='/app' component={App}></Route>
            <Route exact path='/confirm' component={ConfirmEmail}></Route>
            <Route path='/verify' component={VerifyEmail}></Route>
        </div>
    </Router>
)

ReactDOM.render(
    routing,
    document.getElementById("root")
)