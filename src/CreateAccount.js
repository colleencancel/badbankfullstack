import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

import UserContext from './UserContext';
import Card from './Card';

function CreateAccount(props){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext); 
    const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", {replace:true});
  }, [user, loading]); 
  
   
  function validate(field, label){
        if (!field) {
          setStatus('Error: please enter ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }
   
    function validatePassword(field){
      if (password.length < 8) {
          setStatus('Error: Password must be more than 8 characters');
          setTimeout(() => setStatus(''),3000);
          return false;
      }
      return true;
      }  
        
    function handleCreate(){
      if(!validatePassword(password)) {
        alert('Password must be more than 8 characters');
        return;
      }

      
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      ctx.users.push({name,email,password,balance:100});
      setShow(false);
    }    
    function handle() {
      console.log(name,email,password);
      const url=`/account/create/${name}/${email}/${password}`;
      (async () => {
        var res=await fetch(url);
        var data = await res.json();
        console.log(data);
      })();
      props.setShow(false)
    }
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="secondary"
        header="BadBank Create Account"
        status={status}
        body={show ? (  
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                
                <button className="btn btn-light" onClick={register}>Create Account</button>
        
              <button className="btn btn-light" onClick={signInWithGoogle}>Create Account with Google</button>

        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      
             </>
              ):(
                <>
                <h5>Success! You've created a new account.</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
      />
    )
  }

  export default CreateAccount;