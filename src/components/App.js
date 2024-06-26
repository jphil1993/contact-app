import React, {useState, useEffect} from 'react';
import {v4 as uuid} from "uuid";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';

function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
    const addContactHandler = (contact) => {
        console.log(contact);
        setContacts([...contacts, {id: uuid(), ...contact}]);
    };

    const removeContactHandler = (id) => {
        const newContactList = contacts.filter((contact) => {
            return contact.id !== id;
        });
        setContacts(newContactList);
    };

    const ContactListWrapper = ({props}) => {
        

        return(
            <ContactList
                {...props} 
                contacts={contacts} 
                getContactId={removeContactHandler}
            />
        )
    }

    const ContactDetailWrapper = ({props}) => {
        

        return(
            <ContactDetail
                {...props} 
                contacts={contacts} 
                getContactId={removeContactHandler}
            />
        )
    }

    const AddContactWrapper = ({props}) => {
        const navigate = useNavigate();

        return(
            <AddContact
                {...props} 
                addContactHandler={(contact) => {
                    addContactHandler(contact);
                    navigate('/');
                }}
            />
        )
    }


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    return(
        <div className='ui container'>
            <Router>
                <Header />
                <Routes>
                    <Route 
                        path="/add" 
                        element={
                        <AddContactWrapper/>
                        }
                    />
                    <Route 
                        path="/" 
                        exact 
                        element={
                            <ContactListWrapper/>
                        }
                    />
                    <Route
                        path='/contact/:id'
                        element={
                            <ContactDetailWrapper/>
                        }
                    />
                    
                </Routes>
                {/* <AddContact addContactHandler ={addContactHandler}/> */}
                {/* <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
            </Router>
            
        </div>
    );  
}

export default App;
