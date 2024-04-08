import React from 'react'
import './watch.scss';
import { ArrowBackOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  let location=useLocation();
  // console.log(location)
  const movie=location.state.movie;
  return (
    <div className="watch">
      <Link to="/">

        <div className="back">
            <ArrowBackOutlined className='arrowIcon' />
            Home
        </div>
      </Link>
        <video src={movie.video} className="video" autoPlay progress controls></video>
    </div>
  )
}

export default Watch