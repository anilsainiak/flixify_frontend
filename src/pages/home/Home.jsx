import React, { useEffect, useState } from 'react'
import "./home.scss";
import Navbar from '../../components/navbar/Navbar.jsx';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from "axios";
import env from "react-dotenv";

const Home = ({type}) => {
  const [lists,setLists]= useState([]);
  const [genre,setGenre]= useState(null);

  const handleGenreChange=(selectedGenre)=>{
    setGenre(selectedGenre);
  }

  useEffect(()=>{
    const getRandomLists=async ()=>{
      try{
        const res=await axios.get(`${process.env.REACT_APP_LINK}lists${type && genre ? "?type="+type+"&genre="+genre : type ? "?type="+type : genre?"?genre="+genre : ""}`,
        {
          headers:{
            token: 'Bearer ' + (JSON.parse(localStorage.getItem('user'))).accessToken
          }
        });
        // console.log(res);
        setLists(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  },[type,genre]);
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} onGenreChange={handleGenreChange}/>
      {lists.map((list)=>(
        <List key={list._id} list={list}/> 
      ))}
    </div>
  )
}

export default Home