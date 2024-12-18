import { useState, useEffect } from 'react';
import axios from 'axios';
import { Contact, Notification as NotificationType, FilterType } from './types';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { Notification } from './components/Notification';
import './styles/global.css';

const URL = 'http://localhost:5000/contacts';

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type NotificationTypeKey = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [notification, setNotification] = useState<NotificationType | null>(null);

  // Leer (GET) - useEffect
  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setContacts(response.data);
      })
      .catch(() => {
        showNotification('Error al cargar contactos', NOTIFICATION_TYPES.ERROR);
      });
  }, []);

  // Función primera letra mayúscula
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Mostrar notificación
  const showNotification = (message: string, type: NotificationTypeKey) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Crear (POST) - addContact
  const addContact = (name: string, number: string) => {
    const formattedName = capitalizeFirstLetter(name.trim());

    // Buscar NOMBRE en BBDD
    const existingContactByName = contacts.find(c =>
      c.name.localeCompare(formattedName, undefined, { sensitivity: 'base' }) === 0
    );

    // Buscar TELÉFONO en BBDD
    const existingContactByNumber = contacts.find(c => c.number === number);

    // Si NOMBRE en BBDD
    if (existingContactByName) {
      if (window.confirm(`${formattedName} ya existe. ¿Quiere actualizar el número?`)) {
        axios
          .put(`${URL}/${existingContactByName.id}`, {
            ...existingContactByName,
            number,
          })
          .then(response => {
            setContacts(contacts.map(contact =>
              contact.id === existingContactByName.id ? response.data : contact
            ));
            showNotification('Contacto actualizado', NOTIFICATION_TYPES.SUCCESS);
          })
          .catch(() => {
            showNotification('Error al actualizar contacto', NOTIFICATION_TYPES.ERROR);
          });
      }
      return;
    }

    // Si TELÉFONO en BBDD
    if (existingContactByNumber) {
      if (window.confirm(`El número ya existe con nombre ${existingContactByNumber.name}. ¿Quiere reemplazarlo con un nuevo contacto?`)) {
        axios
          .delete(`${URL}/${existingContactByNumber.id}`) // Eliminar contacto con el mismo número
          .then(() => {
            const newContact = {
              id: crypto.randomUUID(),
              name: formattedName,
              number,
              isFavorite: false,
            };

            axios
              .post(URL, newContact)
              .then(response => {
                setContacts([...contacts.filter(c => c.id !== existingContactByNumber.id), response.data]);
                showNotification(`Contacto ${formattedName} agregado`, NOTIFICATION_TYPES.SUCCESS);
              })
              .catch(() => {
                showNotification('Error al agregar contacto', NOTIFICATION_TYPES.ERROR);
              });
          })
          .catch(() => {
            showNotification('Error al eliminar contacto duplicado', NOTIFICATION_TYPES.ERROR);
          });
      }
      return;
    }

    const newContact = {
      id: crypto.randomUUID(),
      name: formattedName,
      number,
      isFavorite: false,
    };

    axios
      .post(URL, newContact)
      .then(response => {
        setContacts([...contacts, response.data]);
        showNotification(`Contacto ${formattedName} agregado`, NOTIFICATION_TYPES.SUCCESS);
      })
      .catch(() => {
        showNotification('Error al agregar contacto', NOTIFICATION_TYPES.ERROR);
      });
  };


  // Eliminar (DELETE) - deleteContact
  const deleteContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    if (window.confirm(`Borrar ${contact.name}?`)) {
      axios
        .delete(`${URL}/${id}`)
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id));
          showNotification(`Contacto eliminado`, NOTIFICATION_TYPES.SUCCESS);
        })
        .catch(() => {
          showNotification('Error al eliminar contacto', NOTIFICATION_TYPES.ERROR);
        });
    }
  };

  // Actualizar (PATCH) - toggleFavorite
  const toggleFavorite = (id: string) => {
    const contactToUpdate = contacts.find(c => c.id === id);
    if (!contactToUpdate) return;

    axios
      .patch(`${URL}/${id}`, { isFavorite: !contactToUpdate.isFavorite })
      .then(response => {
        setContacts(contacts.map(contact =>
          contact.id === id ? response.data : contact
        ));
        showNotification(
          `${contactToUpdate.isFavorite ? `${contactToUpdate.name} eliminado de` : `${contactToUpdate.name} agregado a`} favoritos`,
          NOTIFICATION_TYPES.SUCCESS
        );
      })
      .catch(() => {
        showNotification('Error al actualizar favorito', NOTIFICATION_TYPES.ERROR);
      });
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
