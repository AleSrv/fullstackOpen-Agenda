//src\App.jsx
import { useState, useEffect } from "react";
import contactsService from "./services/contacts";
import { v4 as uuidv4 } from "uuid";
import FormPhone from "./components/FormPhone";
import DisplayedPersons from "./components/DisplayedPersons";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(false);
  const [favorites, setFavorites] = useState(false)

  //Carga inicial contactos
  useEffect(() => {
    contactsService
      .getAll()
      .then((initialContacts) => {
        setContacts(initialContacts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCheckboxChange = (e) => {
    setOrder(e.target.checked);  // Según checked guardo en state order
  };

  const handleCheckboxFavorite = (e) => {
    setFavorites(e.target.checked)
  }

  // Crear contacto
  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Nombre y Teléfono son obligatorios");
      return;
    }



    //Preparo el contacto
    const newContact = {
      id: uuidv4(),
      name,
      phone,
      favorite: false
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

  // Borrar contacto
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

  //Update contact favorite
  const toggleFavorite = (id) => {
    const contactToUpdate = contacts.find(contact => contact.id === id);
    if (!contactToUpdate) return;

    const updatedContact = { ...contactToUpdate, favorite: !contactToUpdate.favorite };

    contactsService
      .update(id, updatedContact)
      .then((returnedContact) => {
        setContacts(contacts.map(contact =>
          contact.id === id ? returnedContact : contact
        ));
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  };


  // Filtrar contactos por nombre y por favoritos
  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())) // Filtro por nombre
    .filter(contact => (favorites ? contact.favorite : true)); // Filtro por favoritos


  // Ordenar contactos si el checkbox está activo
  const displayedContacts = order
    ? [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name))
    : filteredContacts;


  return (
    <div>
      <h1>Agenda Telefónica</h1>

      <h2>Buscar Nombre:</h2>
      <input
        type="text"
        placeholder="Ingrese nombre para buscar..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <h2>Agregar Nombre:</h2>
      <FormPhone
        handleSubmit={(e) => {
          e.preventDefault();
          addContact();
        }}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
      />

      <h2>Listado de Contactos:</h2>
      <label>
        Orden alfabético
        <input
          type="checkbox"
          name="order"
          id="order"
          checked={order}
          onChange={handleCheckboxChange}
        />
      </label>

      <label>
        Mostrar favoritos
        <input
          type="checkbox"
          name="favorites"
          id="favorites"
          checked={favorites}
          onChange={handleCheckboxFavorite}
        />
      </label>


      <DisplayedPersons
        handleDelete={handleDelete}
        filteredContacts={displayedContacts}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;
