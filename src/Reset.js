import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";
import Card from './Card';


function Reset() {
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  
  return (
    <Card
          bgcolor="secondary"
          header="Badbank Reset Password"
          status={status}
          body={show ? ( 
          <>
          Email address<br/>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="  enter e-mail address"
        />
        <br/><br/>
          <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/CreateAccount">Create Account</Link> now.
        </div>
        </>
                ):(
                  <>
                  
                  </>
                )}
       
     />
  )
}

export default Reset;