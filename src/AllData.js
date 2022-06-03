import React, { useState, useEffect } from 'react';
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

//import UserContext from './UserContext';
//import Card from './Card';

function AllData(){
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    //fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

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

  //const ctx = React.useContext(UserContext);
  //const users = ctx.users;
  return (
    <>
      <div className="card text-center">
      <div className="card-header">
        <a>Welcome, {name} to your BadBank Account</a> 
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
            <li className="nav-item">
              <a className="nav-link" href="#/home/" onClick={logout}>Log Out</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">AllData</a>
            </li> 
          </ul>
        </div>
        </nav>
      </div> 
  
  <>
    <h5>All Data in Store:</h5>
    {data}
</>
</>
);
}


 // return (
      //<Card
         // bgcolor="secondary"
         // txtcolor="white"
         // header="BadBank All Data Page"
         // title="Bad Bank"
         // text= "All Data in Store"
         // body=
         // { <table className="table">
           // <thead>
           // <tr>
            //  <th scope="col">Email</th>
            //  <th scope="col">Name</th>
           //   <th scope="col">Password</th>
             //<th scope="col">Balance</th>
            //</tr>
           // </thead>
           // <tbody>
              //{user.map(element=> {
                //return <tr>
                 // <td>{element.email}</td>
                 // <td>{element.name}</td>
                 // <td>{element.password}</td>
                //  <td>{element.balance}</td>
            //</tr>
             // })}
            //</tbody>
         // </table>}
          
     // />
          
  ////)
//} 

export default AllData;