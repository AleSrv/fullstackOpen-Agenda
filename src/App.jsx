import { useState, useEffect } from 'react';
import contactsService from './services/contacts'
import { v4 as uuidv4 } from 'uuid';

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

  //Agregar contacto
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


  return (
    <div>
      <h1>Agenda Telefónica</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Agregar Contacto</button>
      </form>

      <ul>
        {contacts.map((contact, index) => (
          <li key={contact.id}>
            {index + 1}. {contact.name} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
