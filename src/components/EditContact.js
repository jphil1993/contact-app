import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';



const EditContact = (props) => {    
    const location = useLocation();
    const {contact} = location.state || {};
    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);


    

    const update = (e) => {
        e.preventDefault();
        if(contact.name === "" && contact.email === ""){
            alert("All fields are mandatory!");
            return;
        }
        contact.name = document.getElementById("name").value;
        contact.email = document.getElementById("email").value;
        props.updateContactHandler(contact);
        
    }

    
    
    return(
        
        <div className='ui main'>
            <h2>Edit Contact</h2>
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <label>Name: 
                        <input 
                            type='text'
                            name='name' 
                            id='name'
                            placeholder='Name' 
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </label>
                </div>
                <div className='field'>
                    <label>Email: 
                        <input 
                            type='text' 
                            name='email'
                            id='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </label>
                </div>
                <button className='ui button blue'>Edit</button>
            </form>
        </div>
    );
    
}

export default EditContact;