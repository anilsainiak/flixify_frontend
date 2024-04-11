import React, { useContext, useState } from 'react'
import './navbar.scss';
import { ArrowDropDown, ArrowDropDownCircleOutlined, Notifications, Search } from '@mui/icons-material';
import {Link} from "react-router-dom";
import { logoutStart } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { useEffect } from 'react';
const Navbar = () => {
  const [isScrolled,setIsScrolled]=useState(false);
  const {dispatch} = useContext(AuthContext);
  const [profilePic,setProfilePic]=useState(null);

  useEffect(()=>{
    setProfilePic((JSON.parse(localStorage.getItem('user'))).profilePic);
  },[])
  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0?false:true);
    return ()=>(window.onscroll=null);
  }
  const handleLogout=(e)=>{
    e.preventDefault();
    logoutStart(dispatch);
};
  return (
    <div className={isScrolled?"navbar scrolled":"navbar"}>
        <div className="container">
            <div className="left">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
                  alt="" 
                />
                <Link to="/" className='link'>
                  <span>HomePage</span>
                </Link>
                <Link to="/series" className='link'>
                  <span>Series</span>
                </Link>
                <Link to="/movies" className='link'>
                  <span>Movies</span>
                </Link>
                <span>New and Popular</span>
                <span>My List </span>
            </div>
            <div className="right">
              <Search className='icon'/>
              <span>KID</span>
              <Notifications className='icon' />
              <Link to="/editProfile" state={{user:JSON.parse(localStorage.getItem('user'))}}>
              <img 
            src={profilePic!=="" ? profilePic : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"}
            alt=""
          />
              </Link>
              <div className="profile">
                    <ArrowDropDown className='icon'/>
                    <div className="options">
                      <span>Settings</span>
                      <span onClick={handleLogout}>Logout</span>
                    </div>
              </div>
                
            </div>
      </div>
    </div>
  )
}

export default Navbar