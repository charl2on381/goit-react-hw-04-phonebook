import React, { useState } from 'react';
import s from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import { useLocalStorage } from 'hooks/useLocalStorage';

const App = () => {
  const defContacts = [
    { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocalStorage('contacts', defContacts);

  const [filter, setFilter] = useState('');

  const handlerFormSubmit = ({ name, phone }) => {
    const searchName = name.toLowerCase();
    if (contacts.find(contact => contact.name.toLowerCase() === searchName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      phone,
    };
    setContacts(prev => [...prev, contact]);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleFilter = value => {
    setFilter(value);
  };

  const foundContacts = () => {
    const filterLowCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowCase)
    );
  };

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handlerFormSubmit} />

      {contacts.length > 0 ? (
        <>
          <Filter value={filter} onChange={handleFilter} />

          <ContactList contacts={foundContacts()} onDelete={deleteContact} />
        </>
      ) : (
        <Notification message="No contacts" />
      )}
    </div>
  );
};

export default App;
