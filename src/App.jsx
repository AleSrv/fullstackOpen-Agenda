//src\App.jsx
import { useState, useEffect } from 'react';
import contactsService from './services/contacts'
import { v4 as uuidv4 } from 'uuid';
import FormPhone from './components/FormPhone';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch initial data from db.json
  useEffect(() => {
    contactsService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //HACER UNA LISTA FAVORITOS ESTRELLA (TOOGLE)
  // Guardar Contacto
  const handleSubmit = (e) => {
    e.preventDefault()
    addContact()
  }

  //Crear contacto
  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Nombre y Teléfono son obligatorios");
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      phone,
    };

    contactsService
      .create(newContact)
      .then((response) => {
        setContacts([...contacts, response]);
        setName("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
  };

  //Eliminar contacto
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      contactsService
        .deleteContact(id)
        .then(() => {
          const contactsTemp = contacts.filter((contact) => contact.id !== id);
          setContacts(contactsTemp);
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    }
  };



  return (
    <div>
      <h1>Agenda Telefónica</h1>
      <FormPhone
        handleSubmit={handleSubmit}
        setName={setName}
        name={name}
        phone={phone}
        setPhone={setPhone}
      />


      <ul>
        {contacts.map((contact, index) => (
          <li key={contact.id}>
            {index + 1}. {contact.name} - {contact.phone}
            <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
