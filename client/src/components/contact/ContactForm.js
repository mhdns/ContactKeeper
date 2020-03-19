import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import { CLEAR_CURRENT } from '../../context/types';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if(current !== null) {
      setContact(current);
    }
  }, [contactContext, current])

  const [contact, setContact] = useState({
    name:'',
    phone:'',
    email:'',
    type:'personal'
  });

  const { name, phone, email, type } = contact;

  const onChamge = e => setContact({...contact, [e.target.name]: e.target.value});

  const clearAll = () => {
    clearCurrent();
    setContact({
      name:'',
      phone:'',
      email:'',
      type:'personal'
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    if(current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
    setContact({
        name:'',
        phone:'',
        email:'',
        type:'personal'
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Update Contact' : 'Add Contact'}</h2>
      <input type='text' placeholder='Name' name='name' value={name} onChange={onChamge}/>
      <input type='email' placeholder='Email' name='email' value={email} onChange={onChamge}/>
      <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChamge}/>
      <h5> Contact Type:</h5>
      <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChamge}/>
      {' '}{'Personal'}{' '}
      <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChamge}/>
      {' '}{'Professional'}{' '}

      <div>
        <input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block'/>
      </div>
      {current && 
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>}
    </form>
  )
}

export default ContactForm
