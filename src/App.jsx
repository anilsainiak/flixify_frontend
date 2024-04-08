import React, { useContext } from 'react';
import "./app.scss";
import Home from './pages/home/Home.jsx';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Subscription from './pages/subscription/Subscription.jsx';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {AuthContext} from './context/authContext/AuthContext.js';
import PaymentSuccess from './pages/paymentSuccess/PaymentSuccess.jsx';
import PaymentCancel from './pages/paymentCancel/PaymentCancel.jsx';
import ForgotPassword from './pages/forgotPassword/ForgotPassword.jsx';
import NewPassword from './pages/newPassword/NewPassword.jsx';
import EditProfile from './pages/editProfile/EditProfile.jsx';

const App = () => {
  const {user} = useContext(AuthContext);
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={user ?<Home/> : <Navigate to="/register"/>}/>
        <Route path='/register' element={!user ?<Register/> : <Navigate to="/"/>}/>
        <Route path='/subscription' element={user ? <Subscription/>  : <Navigate to="/login"/> }/>
        <Route path='/paymentCancel' element={user?<PaymentCancel/>:<Navigate to="/register"/> }/>
        <Route path='/paymentSuccess' element={user?<PaymentSuccess/>:<Navigate to="/register"/> }/>
        <Route path='/login' element={!user ? <Login/> : (user.newUser ? <Subscription/> : <Navigate to="/"/>  )}/>
        <Route path='/movies' element={user ? <Home type="movies" />: <Navigate to="/register"/> }/>
        <Route path='/series' element={user?<Home type="series"/> : <Navigate to="/register"/>}/>
        <Route path='/watch' element={user?<Watch/>:<Navigate to="/register"/> }/>
        <Route path='/forgotPassword' element={!user ? <ForgotPassword/> :<Navigate to="/"/>} />
        <Route path='/newPassword/:resetToken' element={!user ? <NewPassword/> :<Navigate to="/"/>} />
        <Route path='/editProfile' element={!user ? <Register/> :<EditProfile/>} />
      </Routes>

    </Router>
    
    
  )
};

export default App;
