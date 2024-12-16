import React, { useState } from 'react';
import { Contact, Notification as NotificationType, FilterType } from './types';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { Notification } from './components/Notification';
import './styles/global.css';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [notification, setNotification] = useState<NotificationType | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const addContact = (name: string, number: string) => {
    const existingContactByName = contacts.find(c => 
      c.name.toLowerCase() === name.toLowerCase()
    );
    
    const existingContactByNumber = contacts.find(c => 
      c.number === number
    );

    if (existingContactByName) {
      if (window.confirm(`${name} already exists. Do you want to update their number?`)) {
        const updatedContacts = contacts.map(c =>
          c.id === existingContactByName.id ? { ...c, number } : c
        );
        setContacts(updatedContacts);
        showNotification(`Updated ${name}'s number`, 'success');
      }
      return;
    }

    if (existingContactByNumber) {
      if (window.confirm(`This number already exists for ${existingContactByNumber.name}. Do you want to create a new contact with this number?`)) {
        const newContact: Contact = {
          id: crypto.randomUUID(),
          name,
          number,
          isFavorite: false
        };
        setContacts([...contacts, newContact]);
        showNotification(`Added ${name}`, 'success');
      }
      return;
    }

    const newContact: Contact = {
      id: crypto.randomUUID(),
      name,
      number,
      isFavorite: false
    };

    setContacts([...contacts, newContact]);
    showNotification(`Added ${name}`, 'success');
  };

  const deleteContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    if (window.confirm(`Delete ${contact.name}?`)) {
      setContacts(contacts.filter(c => c.id !== id));
      showNotification(`Deleted ${contact.name}`, 'success');
    }
  };

  const toggleFavorite = (id: string) => {
    setContacts(contacts.map(contact =>
      contact.id === id
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    ));
  };

  const filteredContacts = contacts
    .filter(contact => {
      if (filterType === 'favorites') {
        return contact.isFavorite;
      }
      return true;
    })
    .filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number.includes(searchTerm)
    );

  return (
    <div className="container">
      <Notification notification={notification} />
      <Header />
      <ContactForm addContact={addContact} />
      <div className="contacts-container">
        <h2>Contacts</h2>
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;