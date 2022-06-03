import React from 'react';
import bank from './images/bank.png';


function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{maxWidth: "30rem"}}>
        <div className="card-header text-center"><img src={bank} width="50" height="50" alt=""></img> 
        {props.header && (<h3 className="card-header">{props.header}</h3>)}
        </div>
        <div className="card-body text-center">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
        <div className="card-footer text-center"><img ></img> 
        {props.footer && (<h3 className="card-footer">{props.footer}</h3>)}
        </div>
      </div>      
    );    
  }
  export default Card;