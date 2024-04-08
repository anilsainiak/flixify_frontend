import React, { useEffect,useState } from 'react'
import './featured.scss';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import axios from 'axios';

const Featured = ({type,onGenreChange}) => {
  const [content,setContent]=useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleSelectedGenre=(val)=>{
    const genre = val.target.value === 'null' ? null : val.target.value;
    setSelectedGenre(genre);
    onGenreChange(genre);
  }

  useEffect(()=>{
    const getRandomContent=async ()=>{
      try{
        const res=await axios.get(`${process.env.REACT_APP_LINK}movie/random?type=${type}`,
        {
          headers:{
            token:'Bearer '+(JSON.parse(localStorage.getItem('user'))).accessToken
          }
        });
        
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    }
    
    getRandomContent();
  },[type]);

  return (
    <div className='featured'>
      {type && (
        <div className="category">
          
          <span>{type === "movies" ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre" onChange={handleSelectedGenre} >
            <option value="null">Genre</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>
      )}
      
        <img
            width="100%"
            src={content.img}
            alt=""
          />
        <div className="info">
        {/* <img
          src={content.imgTitle}
          alt=""
        /> */}
        <span className='desc'>
        {content.desc}
        </span>
        <div className="buttons">
          <button className='play'>
            <PlayArrow/>
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined/>
            <span>Info</span>
          </button>
        </div>
        </div>
    </div>
  );
}

export default Featured