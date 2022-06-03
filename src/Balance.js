import { auth, db, logout } from "./firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from './Card';
import UserContext from './UserContext';

function Balance(){
    
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
    
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
        header="Balance"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus}/> :
          <BalanceMsg setShow={setShow}/>}
      />
      </>
    )  
  }
   
  function BalanceMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}
        >
          Check balance again
      </button>
    </>);
  }
  
  function BalanceForm(props){
    const [email, setEmail]   = React.useState('');
    const [balance, setBalance] = React.useState('');  
    const ctx = React.useContext(UserContext);  
      
    function handle(){
      const user = ctx.users.find((user) => user.email == email);
      if (!user) {
        props.setStatus('fail!')      
        return;      
      }
  
      setBalance(user.balance);
      console.log(user);
      props.setStatus('Your balance is: ' + user.balance);      
      props.setShow(false);
    }
  
    return (<>
    
        
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Check Balance
      </button>
  
    </>);
  }
  export default Balance;