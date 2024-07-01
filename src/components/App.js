import React, {useState, useEffect} from 'react';
import {v4 as uuid} from "uuid";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';
import api from '../api/contacts';
import EditContact from './EditContact';

function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);
    
    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    }

    const addContactHandler = async (contact) => {
        const request = {
            id: uuid(),
            ...contact
        }

        const response = await api.post("/contacts", request)
        setContacts([...contacts, response.data]);
    };

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`)
        const newContactList = contacts.filter((contact) => {
            return contact.id !== id;
        });
        setContacts(newContactList);
    };

    const updateContactHandler = async (contact) => {        
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const {id, name, email} = response.data;
        setContacts(
            contacts.map((contact) => {
            return contact.id === id ? {...response.data} : contact;
        })
    );
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

    const EditContactWrapper = ({props}) => {
        const navigate = useNavigate();

        return(
            <EditContact
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
                updateContactHandler={(contact) => {
                    updateContactHandler(contact);
                    navigate('/');
                }}

            />
        )
    }

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if(allContacts) setContacts(allContacts);
        };

        getAllContacts();
    }, []);

    useEffect(() => {
        //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
                    <Route
                        path='/edit/:id'
                        element={
                            <EditContactWrapper/>
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
