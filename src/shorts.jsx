import React from 'react';
import Home from "./home.svg";
import shorts from "./shorts.svg";
import "./shorts.css"
function Shorts() {
  return (
    <div>
         <div className="sidenavigationitems">
        <div className='sidenavitem'>
         <a className="sidenavasa"href="/"><img width="30px" height="30px" src={Home} alt="" /></a> 
          <p>Home</p>
        </div>
        <div className='sidenavitem'>
         <a className='sidenavasa' href="/shorts"><img width="30px" height="30px" src={shorts} alt="" />
          <p>Shorts </p></a> 
        </div>
      </div>

<div className="maincontenet">
        <h2>PAGE IS UNDER CONSTRUCTION</h2>

</div>

    </div>
  )
}

export default Shorts;
