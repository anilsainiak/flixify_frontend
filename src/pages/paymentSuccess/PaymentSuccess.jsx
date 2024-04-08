import React, { useEffect } from 'react'
import './paymentSuccess.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const func= async ()=>{
      await axios.put(process.env.REACT_APP_LINK +'users/'+(JSON.parse(localStorage.getItem('user'))._id),{
        newUser:false,
        screens:1,
        active:true
      },{
        headers:{
            token:'Bearer '+ (JSON.parse(localStorage.getItem('user')).accessToken)
        }
      });
      const user = JSON.parse(localStorage.getItem('user'));
      user.newUser=false;
      user.screens=1;
      user.active=true;
      localStorage.setItem('user',JSON.stringify(user));
      await new Promise(resolve => setTimeout(resolve, 5000));
      navigate('/');
    }
    func();
  },[]);

  return (
    <div id="loader"></div>
  )
}

export default PaymentSuccess