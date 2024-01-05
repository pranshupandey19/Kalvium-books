import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchData } from '../utils/redux/action'
import magnify from "../assets/magnifying-glass.png"
import { useSelector } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()
  const savedData = useSelector((state) => state.savedData);
    console.log("savedData",savedData);

  return (
    <div id='navbar'>
      <Link to={"/"} style={{textDecoration:"none"}}>
        <div id='kalvium-books' ><img src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="" /><span style={{paddingTop:"0.2vw"}}>Books</span></div>
      </Link>
      <div id='input-box'>
        <div id='svg'><img src={magnify} alt="" /></div>
      <input placeholder='Search Books' type="text" className={savedData != null ? 'search' : 'disabled-search'} onChange={(e)=>{
        dispatch(searchData(e.target.value))
      }} />
      </div>
    <Link to={"register"} style={{textDecoration:"none"}}>
      <button id='register'>Register</button>
    </Link>
    </div>
  )
}

export default Navbar