import React, { useContext, useEffect } from 'react'
import './paymentCancel.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logoutStart } from '../../context/authContext/apiCalls';
import axios from 'axios';

const PaymentCancel = () => {
    const {dispatch} = useContext(AuthContext)

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    useEffect(()=>{
        const func=async ()=>{
            await axios.put(process.env.REACT_APP_LINK +'users/'+(JSON.parse(localStorage.getItem('user'))._id),{
                pid:0
              },{
                headers:{
                    token:'Bearer '+ (JSON.parse(localStorage.getItem('user')).accessToken)
                }
              });
            await new Promise(resolve=>setTimeout(resolve,5000));
            logoutStart(dispatch);
        }
    },[])

    return (
        <div id="loader"></div>
    )
}

export default PaymentCancel