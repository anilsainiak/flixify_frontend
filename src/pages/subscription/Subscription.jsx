import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './subscription.scss';
import { ArrowRightAlt,ArrowCircleRight } from '@mui/icons-material';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logoutStart } from '../../context/authContext/apiCalls';
const stripePromise = loadStripe('pk_test_51OzCkBSBx2YpACrtgzYwGI1NAblVgJAHtfrldI0cIx4KOb3adkikHuONZJ4XPZrduGTRROlHxh2jD7Vx8iLoWPE8004GiDFB0u');

const Subscription = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);

    const handleLogout=()=>{
        logoutStart(dispatch);
    };

    const handleSubscription= async (pid)=>{
        const res = await axios.post(process.env.REACT_APP_LINK +'package/checkout',{
            pid:pid,
            email:(JSON.parse(localStorage.getItem('user')).email)
        });
        const sessionId = res.data.id;
        const stripe = await stripePromise;
        await axios.put(process.env.REACT_APP_LINK +'users/'+(JSON.parse(localStorage.getItem('user'))._id),{
            pid:pid
          },{
            headers:{
                token:'Bearer '+ (JSON.parse(localStorage.getItem('user')).accessToken)
            }
          });
        await stripe.redirectToCheckout({
            sessionId: sessionId,
        });
    }

    return (
        <div className='subscription'>
            <div className="top">
                <h1>Flixify</h1>
                <p>Monthly Subscription</p>
            </div>
            <div className="subscribe">
                <Row xs={3} md={3} className="g-4 row">
                    <Col onClick={()=>handleSubscription(1)}>
                        <Card>
                            <Card.Body>
                            <Card.Title className='title'>STANDARD</Card.Title>
                            <Card.Text>
                                <p className='muted small'>Watch on 1 Screen at a time in Standard Definition</p>
                                <h4 className="price">
                                &#8377; 200
                                <span> / month</span>
                            </h4>
                            <ul className="features">
                                <li>Unlimited Streaming</li>
                                <li>No Ads</li>
                                <li>Upto 720p Resolution</li>
                                <li>Some cool features</li>
                            </ul>
                            </Card.Text>
                            </Card.Body>
                            <ArrowCircleRight className='rightArrow'/>
                        </Card>
                    </Col>

                    <Col onClick={()=>handleSubscription(2)}>
                        <Card>
                            <Card.Body>
                                <Card.Title className='title'>HD</Card.Title>
                                <Card.Text>
                                    <p>Watch on 2 Screen at a time in HD Definition</p>
                                    <h4 className="price">
                                        &#8377; 350
                                        <span> / month</span>
                                    </h4>
                                    <ul className="features">
                                        <li>Unlimited Streaming</li>
                                        <li>No Ads</li>
                                        <li>HD Available</li>
                                        <li>Some cool features</li>
                                    </ul>
                                </Card.Text>
                                </Card.Body>
                                    <ArrowCircleRight className='rightArrow'/>
                        </Card>
                    </Col>

                    <Col onClick={()=>handleSubscription(3)}>
                        <Card>
                            <Card.Body>
                            <Card.Title className='title'>ULTRA HD</Card.Title>
                            <Card.Text>
                            <p>Watch on 4 Screen at a time in Ultra HD & HD Definition</p>
                            <h4 className="price">
                                &#8377; 500
                                <span> / month</span>
                            </h4>
                            <ul className="features">
                                <li>Unlimited Streaming</li>
                                <li>No Ads</li>
                                <li>Ultra HD & HD Available</li>
                                <li>Some cool features</li>
                            </ul>
                            </Card.Text>
                            </Card.Body>
                            <ArrowCircleRight className='rightArrow'/>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Subscription