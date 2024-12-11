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
  const [order, setOrder] = useState(false); // Cambiado a booleano para mayor claridad

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
    setOrder(e.target.checked); // Actualiza `order` según el estado del checkbox
  };

  // Crear contacto
  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Nombre y Teléfono son obligatorios");
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      phone,
      "favorite": false
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

  // Filtrar contactos por nombre
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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
        Ordenar listado
        <input
          type="checkbox"
          name="order"
          id="order"
          checked={order}
          onChange={handleCheckboxChange} // Conectar manejador
        />
      </label>

      <DisplayedPersons
        handleDelete={handleDelete}
        filteredContacts={displayedContacts} // Usar contactos ordenados si corresponde
      />
    </div>
  );
};

export default App;
