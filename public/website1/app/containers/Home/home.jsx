/* Dependencies being included*/
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import firebase from 'firebase';

/* Firebase credentials*/
const app = firebase.initializeApp({
    apiKey: '****************',
    authDomain: '**********************',
    databaseURL: '***************************',
    storageBucket: '*******************************',
    messagingSenderId: '*****************************'
});

/* Extension of React.Js component class
// Methods set here
// State set here
// Props inheritied here
*/
export default class Home extends Component {
    constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.credits = this.credits.bind(this);
    this.login = this.login.bind(this);
    this.check = this.check.bind(this);
    this.state = {userName: '', password: ''};
  }
  
  /* Creates new user with login (email) and custom password.
  // Error given if fails, via callback promises
  */
  click() {
    console.log('user verified');  
    console.log(this.state.userName); 
    console.log(this.state.password); 
    const email = this.state.userName;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch( function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;  
    console.log(errorCode); 
    });
  }
  
  /* Logs user in if their email and password matches what's in the Firebase DB
  // Error given if fails, via callback promises
  */
  login() {
   const email = this.state.userName;
   const password = this.state.password;
   firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      browserHistory.push('/Login');
   })
    .catch(function(error) {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorCode, errorMessage);
  if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
      } else {
          alert(errorMessage);
        }
      console.log(error);
    });
  }
  
  /* Sets the State for the username and password for auth.
  // Gets ran once the user begins typing
  // Switch statement: case 1 - username, case 2 - password, default - user not typing, so break
  */ 
  credits(event, val) {
    switch (val) {
     case 1:
       this.setState({ userName: event.target.value });
     break;
   
     case 2:
     this.setState({ password: event.target.value });
     break;
   
     default:
     break; 
     }
   }
   
   /* Checks to see if the user is in the firebase DB or not, based off their email.
   // If user is not in firebase DB, the user will be alerted.
   // If user is in firebase DB, the user will then be allowed to enter their pw
   */
   check() {
     const email = this.state.userName;
     const password = '1';
     const ref = this.refs.email.style;
     firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log('valid email');
     })
     .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/user-not-found') {
         ref.color = 'red';
         console.log(errorMessage);
       }
      });  
   }
 
   /* React.render method and JSX*/
   render() {
     return (
      <div>
        <Helmet title="Home"/>
        <h1>Hello World</h1>
        &nbsp; &nbsp; <label ref = "email" >User Name: <input value = {this.state.userName} onChange = { (event) => this.credits(event, 1)} type = "text" /></label><br />
        &nbsp; &nbsp; <label>Password <input value = {this.state.password} onFocus = {this.check} onChange = { (event) => this.credits(event, 2)} type = "text" /></label><br />
        &nbsp; &nbsp; <button onClick = {this.click} className = "btn btn-success">Register</button><br />
        &nbsp; &nbsp; <button onClick = {this.login} className = "btn btn-success">Login</button><br />
      </div>
    );
  }
}// React's Component class ends here.