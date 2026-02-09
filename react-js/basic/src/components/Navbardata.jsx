import React from 'react'
import { Link } from 'react-router-dom'
const Navbardata = () => {

  return <>
  <ul>
    <li>
        <Link to="/home">Home</Link>
    </li>
     <li>
        <Link to="/about">About</Link>
    </li>
     <li>
        <Link to="/contact">Contact</Link>
    </li>
     <li>
        <Link to="/service">Service</Link>
    </li>
  </ul>
  
  
  </>
}

export default Navbardata