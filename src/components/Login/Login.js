import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './Firebase.config';
import { Button } from '@material-ui/core';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {

    const [logedInuser, setLogedInUser] = useContext(userContext)

    
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const {displayName, email} = result.user
                const signedInUser = {name: displayName, email: email}
                setLogedInUser(signedInUser)
                history.replace(from);
                
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    return (
        <div>
            <Button color="primary" onClick={googleSignIn}>Google sign in</Button>
        </div>
    );
};

export default Login;