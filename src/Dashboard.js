import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from"./Card"
import bank from './images/bank.png';


function Dashboard() {
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
    }, [user, loading]);
  
      
    return(
      <>
      <div className="card text-center">
      <div className="card-header">
        <a>Success! Logged in as <strong>{name}</strong> </a> 
           <button className="dashboard__btn" onClick={logout}>Logout</button>
      </div>
        
      </div> 
           
        <Card
        bgcolor="secondary"
        txtcolor="white"
        header="BadBank"
        title= {<a> Welcome, {name} to your Account Home Page </a>} 
        text="please choose an action below"
        body={(<nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              <li className="nav-item">
              <a className="nav-link" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item">
               <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item">
               <a className="nav-link" href="#/balance/">Balance</a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#/transaction/">Transactions</a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#/updateprofile/">Update Profile</a>
             </li>
             
            </ul>
            </div>
            </nav>)}
          card-footer={(<img src={bank} className="img-fluid" alt=""/>)}
        />
      </>
    );
  }
  
export default Dashboard;