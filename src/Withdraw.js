
import { auth, db, logout } from "./firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { query, collection, getDocs, where } from "firebase/firestore";

import UserContext from './UserContext';
import Card from './Card';

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [withdraw, setWithdraw] = React.useState(0);
  //const ctx = React.useContext(UserContext); 
  //const users = ctx.users;;  
  
   //let balance = users[users.length-1].balance;

   //function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
    }, [user, loading])

  function validate(field, label){
    if ( (Number(field) ===0)) {
        setStatus('Error:  Please Enter Amount');
        setTimeout(() => setStatus(''),3000);
        return false;
    }
    return true;
    }  

  function validateNumber(field) {
    if (isNaN(parseFloat(field))) {
      setStatus('Error: Please enter a dollar amount');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
    }

    function validatePositiveNumber(field) {
      if (Number(field) <0) {
            setStatus('Error: Please enter a positive dollar amount');
            setTimeout(() => setStatus(''),3000);
            return false;
          }
            return true;
          }

    function validateOverdraft(num) {
      if (num > 0) {
            setStatus('Error: Withdraw amount must be less than Balance');
            setTimeout(() => setStatus(''),3000);
            return false;
          }
            return true;
          }
    
function handleWithdraw(){
    if (!validate(withdraw, 'withdraw')){
    alert('Withdraw amount required');
    return;
  }

  if(!validateNumber(withdraw)) {
    alert('Withdraw amount must be a number');
    return;
  }

  if(!validatePositiveNumber(withdraw)) {
    alert('Withdraw amount must be positive');
    return;
  }

  if(!validateOverdraft(withdraw)) {
    alert('Withdraw amount must be less than Balance');
    return;
  }
  
  //let newBalance = balance - Number(withdraw);

 // users[users.length-1].balance = newBalance;

  setShow(false);
 // return newBalance;
 } 
  

function clearForm(){
  setWithdraw(0);
  setShow(true);
};

return (
  <>
      <div className="card text-center">
      <div className="card-header">
        <a>Success! Logged in as <strong>{name}</strong> </a> 
           <button className="dashboard__btn" onClick={logout}>Logout</button>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
             <a className="nav-link" href="#/dashboard/">Profile</a>
            </li>
            <li className="nav-item">
             <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
             <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/balance/">Balance</a>
            </li>
          </ul>
        </div>
        </nav>
      </div> 
  <Card
    bgcolor="secondary"
    header="BadBank Withdraw Page"
    status={status}
    body={show ? (  
          <>
          Your Current Balance is: 
          <br/>
          Withdraw Amount<br/>
          <input type="input" className="form-control" id="WithdrawAmount" placeholder="Withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
          <button type="submit" className="btn btn-light" disabled={withdraw ==="" || withdraw === 0} onClick={handleWithdraw}>Make Withdraw</button><br/>
          </>
        ):(
          <>
          <h5>Success, you made a ${withdraw} withdraw!</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Make Another Withdraw</button>
        </>
     )}
    />

    </>

  )
}


export default Withdraw;