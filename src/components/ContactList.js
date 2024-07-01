import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);
    const inputElement = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    useEffect(() => {
        inputElement.current.focus();
    });

    const renderContactList = props.contacts.map((contact) => {
        return(
            <ContactCard contact = {contact} clickHandler = { deleteContactHandler } key={contact.id}/>
        );
    });

    const getSearchTerm = () => {
        //console.log(inputElement.current.value);
        props.searchKeyword(inputElement.current.value);
    };

    return(
        <div className='main'>
            <h2>Contact List
                    
                    </h2> 
            <div className='ui celled list'>    
                <h2>Contact List
                    <Link to="/add">
                        <button className='ui button blue right'>Add Contact</button>
                    </Link>
                    
                </h2>
                <div className='ui search'>
                    <div className='ui icon input'>
                        <input 
                            ref={inputElement}
                            type='text' 
                            placeholder='Search Contacts' 
                            className='prompt'
                            value={ props.term }
                            onChange={getSearchTerm}
                        />
                        <i className='search icon'></i>
                    </div>
                </div>
                {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}
                
            </div>
        </div>
    );
}

export default ContactList;