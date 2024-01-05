import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchData } from '../utils/redux/action';
import magnify from "../assets/magnifying-glass.png";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();

  // Get the saved data from Redux state
  const savedData = useSelector((state) => state.savedData);
  console.log("savedData", savedData);

  return (
    <div id='navbar'>
      {/* Link to navigate to Home */}
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <div id='kalvium-books' >
          {/* Image with a text for navigation */}
          <img src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="" />
          <span style={{ paddingTop: "0.2vw" }}>Books</span>
        </div>
      </Link>
      <div id='input-box'>
        <div id='svg'>
          {/* Image for search magnifying glass */}
          <img src={magnify} alt="" />
        </div>
        {/* Input field for searching books */}
        <input
          placeholder='Search Books'
          type="text"
          // Adding a class based on the condition whether savedData is present or not
          className={savedData != null ? 'search' : 'disabled-search'}
          // On change event to dispatch search action
          onChange={(e) => {
            dispatch(searchData(e.target.value))
          }}
        />
      </div>
      {/* Link to navigate to Register page */}
      <Link to={"register"} style={{ textDecoration: "none" }}>
        <button id='register'>Register</button>
      </Link>
    </div>
  )
}

export default Navbar;
