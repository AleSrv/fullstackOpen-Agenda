import { useState } from 'react';
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

  //funcion primera letra mayúscula
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  //mostrar notificaciion
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  //AGREGAR CONTACTO
  const addContact = (name: string, number: string) => {
    const formattedName = capitalizeFirstLetter(name.trim());

    //buscar NOMBRE en BBDD
    const existingContactByName = contacts.find(c =>
      c.name.localeCompare(formattedName, undefined, { sensitivity: 'base' }) === 0
    );

    // buscar TELEFONO en BBDD
    const existingContactByNumber = contacts.find(c =>
      c.number === number
    );

    //SI NOMBRE en BBDD
    if (existingContactByName) {
      if (window.confirm(`${formattedName} ya existe. ¿Quiere actualizar el número?`)) {
        const updatedContacts = contacts.map(c =>
          c.id === existingContactByName.id ? { ...c, number } : c
        );
        setContacts(updatedContacts);
        showNotification(`Actualizando teléfono de ${formattedName}'s`, 'success');
      }
      return;
    }

    //SI TELEFONO en BBDD
    if (existingContactByNumber) {
      if (window.confirm(`El número existe con nombre ${existingContactByNumber.name}. ¿Quiere crear un nuevo contacto?`)) {
        const newContact = {
          id: crypto.randomUUID(),
          name: formattedName,
          number,
          isFavorite: false
        };
        setContacts([...contacts, newContact]);
        showNotification(`Contacto ${formattedName} agregado`, 'success');
      }
      return;
    }

    const newContact = {
      id: crypto.randomUUID(),
      name: formattedName,
      number,
      isFavorite: false
    };

    setContacts([...contacts, newContact]);
    showNotification(`Contacto ${formattedName} agregado`, 'success');
  };


  const deleteContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    if (window.confirm(`Borrar ${contact.name}?`)) {
      setContacts(contacts.filter(c => c.id !== id));
      showNotification(`Borrando ${contact.name}`, 'success');
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
        <h2>Contactos</h2>
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