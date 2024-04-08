import axios from 'axios';
import { loginFailure, loginStart, loginSuccess,logout } from './AuthActions';

export const login=async (user,dispatch)=>{
    dispatch(loginStart());
    try{
        const res=await axios.post(process.env.REACT_APP_LINK +'auth/login',user);
        dispatch(loginSuccess(res.data));
        return res.data
    }catch(err){
        dispatch(loginFailure());
    }
}

export const logoutStart=async (dispatch)=>{
    await axios.put(process.env.REACT_APP_LINK +'users/'+(JSON.parse(localStorage.getItem('user'))._id),{
        screens:(JSON.parse(localStorage.getItem('user'))).screens - 1
      },{
        headers:{
            token:'Bearer '+ (JSON.parse(localStorage.getItem('user')).accessToken)
        }
      });
    dispatch(logout());
}