import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

const Navbar = () => {

  const  location = useLocation();

  return(
    <div className='d-flex justify-content-start pl-5 mt-1' style={{
        'position': 'sticky',
        'top': 0,
        'background-color': 'white'
      }}>
      <div className='d-flex text-uppercase' id="navbar" style={{
          'margin-left': '10%',
        }}>
        <Link className={`pr-3 pt-3 ${location.pathname == '/' || location.pathname == '/home' ? "font-weight-bolder" : "text-black-50"}`} to={'/react-parcel-starter/home'}>Home</Link>
        <Link className={`pr-3 pt-3 ${location.pathname == '/class' ? "font-weight-bolder" : "text-black-50"}`} to={'/react-parcel-starter/class'}>Class</Link>
        <Link className={`pr-3 pt-3 ${location.pathname == '/a1' ? "font-weight-bolder" : "text-black-50"}`} to={'/react-parcel-starter/a1'}>Assignment 1</Link>
        <Link className={`pr-3 pt-3 ${location.pathname == '/a2' ? "font-weight-bolder" : "text-black-50"}`} to={'/react-parcel-starter/a2'}>Assignment 2</Link>
      </div>
    </div>
  )
}

export default Navbar;
