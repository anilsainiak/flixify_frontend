import React, { useContext, useRef, useState } from 'react'
import './forgotPassword.scss';
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

const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const {dispatch} = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [clicked,setClicked] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword=async (e)=>{
        e.preventDefault();
        setClicked(true);
        await axios.post(process.env.REACT_APP_LINK +'auth/forgotPassword',{
            email:email
        })
        await new Promise(resolve => setTimeout(resolve, 5000));
        navigate('/register');
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
                        Email sent to user
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        if account exists in our Database
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
                    <h1>Forgot Password</h1>
                    <input type="email" placeholder='Email or phone number' onChange={e=>setEmail(e.target.value)}/>
                    <button className="loginButton" onClick={handleForgotPassword}>Reset Password</button>

                    <span className='signupLink'>New to Netflix? <b><a href="/register">Sign up now.</a></b></span>
                    <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <b><a href="#">Learn more.</a></b>
                    </small>
                </form>
                    <div className={clicked ? "loader show" : "loader"}>
                        <div id="loader"></div>
                    </div>
            </div>
        </div>
    )
}

export default ForgotPassword;