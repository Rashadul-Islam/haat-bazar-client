//imported file list
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword, storeAuthToken } from './LoginManager';

import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import firebase from "firebase/app";
import "firebase/auth";




function Login() {
    //setting default user object
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    //defining redirect location for private route
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    //handling google sign in
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    //handle response for redirecting
    const handleResponse = (res, redirect) => {
        setUser(res);
        if (res.error === '') {
            if (res.displayName === null) {
                setLoggedInUser(user)
            }
            else {
                setLoggedInUser(res);
            }

            if (redirect) {
                storeAuthToken();

            }
        }
    }
    //handling create account and login for existing user
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        event.preventDefault();
    }

    //handling form validation
    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordvalid = event.target.value.length > 6;
            const isPassowrdHasNum = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordvalid && isPassowrdHasNum;

        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }

    //handling toggler for different user type
    const handleUserType = () => {
        setNewUser(!newUser);
        const newUserInfo = { ...user };
        newUserInfo.error = '';
        setUser(newUserInfo);
        document.getElementById('myForm').reset();
    }

    return (
        <div>

            <div className="d-flex justify-content-center">
                <div id="login-card" className="card" style={{ width: '20rem' }}>
                    {
                        newUser ?
                            <div>
                                <form id="myForm" onSubmit={handleSubmit}>
                                    <h5 >Create an account</h5>
                                    <br />
                                    <input className="user-input" type="text" onBlur={handleBlur} name="name" placeholder="Name" required />
                                    <br />
                                    <input className="user-input" type="email" onBlur={handleBlur} name="email" placeholder="Email" required />
                                    <br />
                                    <input className="user-input" type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                                    <br />
                                    <button id="user-submit" type="submit">Create an account</button>
                                </form>
                            </div>

                            : <div>
                                <form id="myForm" onSubmit={handleSubmit}>
                                    <h5 >Login</h5>
                                    <br />
                                    <input className="user-input" type="email" onBlur={handleBlur} name="email" placeholder="Email" required />
                                    <br />
                                    <input className="user-input" type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                                    <br />
                                    <button id="user-submit" type="submit">Login</button>
                                </form>
                            </div>
                    }
                    <br />
                    {/* togllet for handling user type */}
                    <p>{newUser ? "Already have an account?" : "Don't have an account?"} <span><input type="submit" onClick={handleUserType} name="newUser" value={newUser ? "Login" : "Create an account"} id="user-manage-btn" /></span> </p>
                    {/* shwoing error message */}
                    <p style={{ color: 'red' }}>{user.error}</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <p id="optional-line">Or</p>
            </div>
            <div className="d-flex justify-content-center">
                <button className="optional-login" onClick={googleSignIn} type="submit"><FontAwesomeIcon icon={faGoogle} /> Continue with google</button>
            </div>
        </div>
    );
}

export default Login;