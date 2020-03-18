import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id:1,
        name:'Jackie',
        email: 'J@gmail.com',
        phone: '91238329',
        type: 'professional'
      },
      {
        id:2,
        name:'Jillie',
        email: 'Jill@gmail.com',
        phone: '81938329',
        type: 'personal'
      },
      {
        id:3,
        name:'Nashie',
        email: 'Nashie@gmail.com',
        phone: '81728283',
        type: 'personal'
      },
      {
        id:4,
        name:'Blackie',
        email: 'blakie@gmail.com',
        phone: '91238322',
        type: 'professional'
      }
    ]
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact })
  };
  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact
  
  // Filter Contacts

  // Clear Filter
  
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}



export default ContactState;