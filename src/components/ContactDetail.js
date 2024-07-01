import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import user from "../resources/user.png";


const ContactDetail = (props) => {
    const location = useLocation();
    const {contact} = location.state || {};
    return(        
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt="user"/>                    
                </div>
                <div className='content'>
                    <div className='header'>Name: {contact.name}</div>
                    <div className='description'>Email: {contact.email}</div>
                </div>
                
            </div>
            <div className='center-div'>
                <Link to='/'>
                    <button className='ui button blue center'>Home</button>
                </Link>
            </div>
        </div>
    );  
};

export default ContactDetail;