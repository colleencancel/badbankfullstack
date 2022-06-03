
import { BrowserRouter as Router, Route, Routes, HashRouter} from "react-router-dom";
import React from 'react'
import UserContext from './UserContext'
import {useState, useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './firebase'
//import {AuthProvider} from './UserContext'
import './App.css';
import Login from './Login.js'
import Home from './Home.js'
import CreateAccount from './CreateAccount.js'
import Dashboard from './Dashboard.js'
import NavBar from './NavBar.js'
import Reset from "./Reset.js";
import Deposit from "./Deposit.js";
import Withdraw from "./Withdraw.js";
import Balance from "./Balance.js";
import AllData from "./AllData.js"


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

 
  return (
    <div className="container" style={{padding: "20px"}}>
      <HashRouter>
      <NavBar/>
      <UserContext.Provider value={{currentUser}}>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/CreateAccount/" element={<CreateAccount/>}/>
      <Route exact path="/login/" element={<Login/>}/>
      <Route exact path="/reset/" element={<Reset/>}/>
      <Route exact path="/Dashboard/" element={<Dashboard/>}/>
      <Route exact path="/deposit/" element={<Deposit/>}/>
      <Route exact path="/withdraw/" element={<Withdraw/>}/>
      <Route exact path="/balance/" element={<Balance/>}/>
      <Route exact path="/AllData/" element={<AllData/>}/>
    </Routes>
    </UserContext.Provider>
    </HashRouter>
    </div>
  );
}

export default App;
