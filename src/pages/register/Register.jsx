import React, { useRef, useState } from 'react'
import './register.scss';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    const emailRef=useRef();
    const passwordRef=useRef();

    const handleStart = ()=>{
        setEmail(emailRef.current.value);
    };
    

    const handleFinish=async(e)=>{
        e.preventDefault();
        setPassword(prevPassword => passwordRef.current.value);
        await axios.post(process.env.REACT_APP_LINK +'auth/register',{
            username:email.split('@')[0],
            email:email,
            password:passwordRef.current.value
        })
        navigate('/login')
    };

    const handleSignIn=(e)=>{
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className='register'>
            <div className="top">
                <div className="wrapper">
                    <p className="logo">Flixify</p>
                    <button className="loginButton" onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Enjoy big movies, hit series and more from ₹ 149.</h1>
                <h2>Join today. Cancel anytime.</h2>
                <p>
                Ready to watch? Enter your email to create or restart your membership.
                </p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder='Email address' className='emailInput' ref={emailRef} />
                        <button className="registerButton" onClick={handleStart} >
                            <span className='buttonInfo'>Get Started</span>
                            <ArrowForwardIos className='arrowIcon'/>
                        </button>
                    </div>

                ) :(
                    <form className="input">
                        <input type="password" placeholder='Password' className='emailInput' ref={passwordRef} />
                        <button className="registerButton" onClick={handleFinish} >
                            <span className='buttonInfo'>Start</span>
                        </button>
                    </form>
                    
                ) }
            </div>
        </div>
    )
}

export default Register