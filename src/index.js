import React from "react";
import ReactDOM from "react-dom";
import firebase from 'firebase';
import App from "./App"
import {Route, BrowserRouter as Router,Redirect } from 'react-router-dom';
import LoginComponent from "./components/login/login";
import SignupComponent from "./components/signup/signup";
import Instruction from "./components/instruction/Instruction";
import VerifyEmail from "./components/verifyemail/VerifyEmail";
import ResetPassword from "./components/resetpassword/ResetPassword";

// firebase.initializeApp({
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID
// });

firebase.initializeApp({
    apiKey: "AIzaSyCrwtzO7_lqasLgRAJrkpZYBJ9IIXsE1ps",
    authDomain: "backslash-1ebbc.firebaseapp.com",
    projectId: "backslash-1ebbc",
    storageBucket: "backslash-1ebbc.appspot.com",
    messagingSenderId: "983579998637",
    appId: "1:983579998637:web:e6f39b3be6ecf7a7b7c924",
    measurementId: "G-KBL6QNZ3S2"
});

firebase.analytics();

const routing = (
    <Router>
        <div id='routing-container'>
            <Route exact path="/"> <Redirect to="/signup"></Redirect></Route>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/signup' component={SignupComponent}></Route>
            <Route exact path='/app' component={App}></Route>
            <Route path='/confirm' component={Instruction}></Route>
            <Route path='/verify/:id/:action/:email' component={VerifyEmail}></Route>
            <Route path='/reset' component={ResetPassword}></Route>
        </div>
    </Router>
)

ReactDOM.render(
    routing,
    document.getElementById("root")
)