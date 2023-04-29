import React from 'react';
import './css/Festival.css';
import { Link } from 'react-router-dom';


function Festival() {
  return (
      <div className='fbody'>
        <div className="fcontainer">
        <Link to="/Peak" className="image1">  
          <div className="festival1"></div>
            <div className="festival1-effect"></div>
            <ul className="ftext">
              <li>Pe</li>
              <li>ak</li>
              <li>&nbsp;fe</li>
              <li>st</li>
              <li>iv</li>
              <li>al</li>
            </ul>
          </Link>
          <Link to="/Firework" className="image2" >

            <div className="festival2"></div>
            <div className="festival2-effect"></div>
            <ul className="ftext">
              <li>fi</li>
              <li>re</li>
              <li>&nbsp;fe</li>
              <li>st</li>
              <li>iv</li>
              <li>al</li>
            </ul>
          </Link>
          <Link to="/Dron" className="image3" >
      
            <div className="festival3"></div>
            <div className="festival3-effect"></div>
            <ul className="ftext">
              <li>dr</li>
              <li>one</li>
              <li>&nbsp;fe</li>
              <li>st</li>
              <li>iv</li>
              <li>al</li>
            </ul>
         </Link>
          <Link to="/Nightmarket"  className="image4">
      
            <div className="festival4"></div>
            <div className="festival4-effect"></div>
            <ul className="ftext">
              <li>ni</li>
              <li>ght</li>
              <li>&nbsp;m</li>
              <li>ar</li>
              <li>k</li>
              <li>et</li>
            </ul>
        </Link>
        </div>
        </div>
  );
}


export default Festival;