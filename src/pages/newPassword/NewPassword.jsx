import React, { useContext, useRef, useState } from 'react'
import './newPassword.scss';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login, logoutStart } from '../../context/authContext/apiCalls';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

const NewPassword = () => {
    const {resetToken} = useParams();
    const [confirmPassword,setConfirmPassword]=useState('');
    const [password,setPassword]=useState('');
    const {dispatch} = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const handleChangePassword=async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            handleOpen();
        }else{
            await axios.post(process.env.REACT_APP_LINK +'auth/newPassword',{
                password:password,
                token:resetToken
            })
            navigate('/register');
        }
        
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
                        Passwords Not Matching
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
                    <input type="password" placeholder='Enter Password' onChange={e=>setPassword(e.target.value)}/>
                    <input type="password" placeholder='Confirm Password' onChange={e=>setConfirmPassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleChangePassword}>Change Password</button>
                    
                    <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <b><a href="#">Learn more.</a></b>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default NewPassword;