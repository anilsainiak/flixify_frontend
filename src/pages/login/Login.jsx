import React, { useContext, useRef, useState } from 'react'
import './login.scss';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login, logoutStart } from '../../context/authContext/apiCalls';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {dispatch} = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const handleLogin=async (e)=>{
        e.preventDefault();
        console.log(process.env.REACT_APP_LINK);
        const user =(await axios.post( process.env.REACT_APP_LINK +'auth/login',{email,password})).data;
        if(user.newUser){
            login({email,password},dispatch);
        }else{
        if(user.pid!==0){
            const pid = user.pid;
            const packages = (await axios.get(`${process.env.REACT_APP_LINK}package/${pid}`)).data.result;
            if(user.screens>=packages.screens){
                handleOpen();
            }else{
                await axios.put(process.env.REACT_APP_LINK +'users/'+(user._id),{
                    screens:user.screens+1
                  },{
                    headers:{
                        token:'Bearer ' + user.accessToken
                    }
                  });
                  login({email,password},dispatch);
            }
        }}
        
    }

    return (
        <div className='login'>
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Log Out from Other Devices
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Account is Logged in Max number of devices
                    </Typography>
                    </Box>
                </Modal>
            </div>
            <div className="top">
            <div className="wrapper">
                    <p className="logo">Flixify</p>
                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder='Email or phone number' onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleLogin}>Log In</button>
                    <div className="wrapper">
                        <div className="rememberMe">
                            <input type="checkbox" name='rememberMe'/>
                            <span>Remember me</span>
                        </div>
                        <a className='forgotPassword' href='/forgotPassword'>Need help?</a>
                    </div>

                    <span className='signupLink'>New to Netflix? <b><a href="/register">Sign up now.</a></b></span>
                    <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <b><a href="#">Learn more.</a></b>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login;