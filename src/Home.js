import React from 'react';
//import UserContext from './UserContext';
import Card from './Card';
import bank from './images/bank.png';

function Home(){
    //const ctx = React.useContext(UserContext);  
    return (
        <Card
        bgcolor="secondary"
        txtcolor="white"
        header="BadBank"
        title="Welcome to BadBank"
        text="Thank you for choosing BadBank!"
        body={(<img src={bank} className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
  }
  export default Home;